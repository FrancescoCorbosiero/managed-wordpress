#!/usr/bin/env bash
#
# woo-assign-category.sh
#
# Assigns a WooCommerce product category to products identified by SKU.
#
# Usage:
#   ./woo-assign-category.sh -s "SKU1,SKU2,SKU3" -c "sneakers"
#   ./woo-assign-category.sh -f skus.txt -c "sneakers" -a   # append mode
#   ./woo-assign-category.sh -s "SKU1" -c "sneakers" --dry-run
#
# Environment variables (or .env file in same directory):
#   WOO_URL          - Store URL (e.g. https://example.com)
#   WOO_CONSUMER_KEY - WooCommerce REST API consumer key
#   WOO_CONSUMER_SECRET - WooCommerce REST API consumer secret
#

set -euo pipefail

# ── Defaults ──────────────────────────────────────────────────────────────────

DRY_RUN=false
APPEND=false
SKUS=""
SKU_FILE=""
CATEGORY=""
PER_PAGE=100

# ── Load .env if present ─────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [[ -f "$SCRIPT_DIR/.env" ]]; then
  # shellcheck disable=SC1091
  source "$SCRIPT_DIR/.env"
fi

# ── Usage ─────────────────────────────────────────────────────────────────────

usage() {
  cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Assign a WooCommerce category to products by SKU.

Options:
  -s, --skus LIST        Comma-separated SKU list (e.g. "SKU1,SKU2,SKU3")
  -f, --file FILE        File with one SKU per line
  -c, --category SLUG    Category name or slug to assign
  -a, --append           Append category (keep existing). Default: replace.
      --dry-run          Show what would happen without making changes
  -h, --help             Show this help

Environment (or .env file in script directory):
  WOO_URL                Store URL         (e.g. https://store.example.com)
  WOO_CONSUMER_KEY       API consumer key  (ck_...)
  WOO_CONSUMER_SECRET    API consumer secret (cs_...)

Examples:
  # Replace all categories with "sneakers" for these SKUs
  $(basename "$0") -s "ABC123,DEF456" -c "sneakers"

  # Append "on-sale" category, keeping existing categories
  $(basename "$0") -f skus.txt -c "on-sale" -a

  # Preview changes without applying
  $(basename "$0") -s "ABC123" -c "sneakers" --dry-run
EOF
  exit 0
}

# ── Parse arguments ──────────────────────────────────────────────────────────

while [[ $# -gt 0 ]]; do
  case "$1" in
    -s|--skus)     SKUS="$2"; shift 2 ;;
    -f|--file)     SKU_FILE="$2"; shift 2 ;;
    -c|--category) CATEGORY="$2"; shift 2 ;;
    -a|--append)   APPEND=true; shift ;;
    --dry-run)     DRY_RUN=true; shift ;;
    -h|--help)     usage ;;
    *) echo "Unknown option: $1"; usage ;;
  esac
done

# ── Validate inputs ──────────────────────────────────────────────────────────

missing=()
[[ -z "${WOO_URL:-}" ]]             && missing+=("WOO_URL")
[[ -z "${WOO_CONSUMER_KEY:-}" ]]    && missing+=("WOO_CONSUMER_KEY")
[[ -z "${WOO_CONSUMER_SECRET:-}" ]] && missing+=("WOO_CONSUMER_SECRET")

if [[ ${#missing[@]} -gt 0 ]]; then
  echo "Error: Missing required env vars: ${missing[*]}"
  echo "Set them in the environment or in $SCRIPT_DIR/.env"
  exit 1
fi

if [[ -z "$SKUS" && -z "$SKU_FILE" ]]; then
  echo "Error: Provide SKUs via -s or -f"
  exit 1
fi

if [[ -z "$CATEGORY" ]]; then
  echo "Error: Provide a category via -c"
  exit 1
fi

# Strip trailing slash from URL
WOO_URL="${WOO_URL%/}"
API_BASE="$WOO_URL/wp-json/wc/v3"

# ── Helpers ──────────────────────────────────────────────────────────────────

woo_get() {
  local endpoint="$1"
  shift
  curl -sS -G "$API_BASE/$endpoint" \
    -u "$WOO_CONSUMER_KEY:$WOO_CONSUMER_SECRET" \
    "$@"
}

woo_put() {
  local endpoint="$1"
  local data="$2"
  curl -sS -X PUT "$API_BASE/$endpoint" \
    -u "$WOO_CONSUMER_KEY:$WOO_CONSUMER_SECRET" \
    -H "Content-Type: application/json" \
    -d "$data"
}

# ── Build SKU array ──────────────────────────────────────────────────────────

sku_list=()

if [[ -n "$SKUS" ]]; then
  IFS=',' read -ra sku_list <<< "$SKUS"
fi

if [[ -n "$SKU_FILE" ]]; then
  if [[ ! -f "$SKU_FILE" ]]; then
    echo "Error: File not found: $SKU_FILE"
    exit 1
  fi
  while IFS= read -r line; do
    line="$(echo "$line" | xargs)"  # trim whitespace
    [[ -n "$line" && "$line" != \#* ]] && sku_list+=("$line")
  done < "$SKU_FILE"
fi

if [[ ${#sku_list[@]} -eq 0 ]]; then
  echo "Error: No SKUs provided"
  exit 1
fi

echo "SKUs to process: ${#sku_list[@]}"
echo "Category: $CATEGORY"
echo "Mode: $(if $APPEND; then echo 'append'; else echo 'replace'; fi)"
$DRY_RUN && echo "** DRY RUN — no changes will be made **"
echo "---"

# ── Resolve category ────────────────────────────────────────────────────────

echo "Resolving category '$CATEGORY'..."

# Try by slug first, then by name search
cat_response=$(woo_get "products/categories" \
  --data-urlencode "slug=$CATEGORY" \
  -d "per_page=1")

cat_id=$(echo "$cat_response" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if isinstance(data, list) and len(data) > 0:
    print(data[0]['id'])
else:
    print('')
" 2>/dev/null || echo "")

if [[ -z "$cat_id" ]]; then
  # Try search by name
  cat_response=$(woo_get "products/categories" \
    --data-urlencode "search=$CATEGORY" \
    -d "per_page=100")

  cat_id=$(echo "$cat_response" | python3 -c "
import sys, json
data = json.load(sys.stdin)
q = '${CATEGORY}'.lower()
for c in data:
    if c['name'].lower() == q or c['slug'].lower() == q:
        print(c['id'])
        break
" 2>/dev/null || echo "")
fi

if [[ -z "$cat_id" ]]; then
  echo "Error: Category '$CATEGORY' not found on the store."
  echo "Available categories:"
  woo_get "products/categories" -d "per_page=100" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for c in sorted(data, key=lambda x: x['name']):
    print(f\"  {c['slug']:30s} (id: {c['id']}, name: {c['name']})\")" 2>/dev/null
  exit 1
fi

echo "Resolved: '$CATEGORY' -> category id $cat_id"
echo ""

# ── Process each SKU ─────────────────────────────────────────────────────────

ok=0
skipped=0
failed=0

for sku in "${sku_list[@]}"; do
  sku="$(echo "$sku" | xargs)"  # trim
  [[ -z "$sku" ]] && continue

  printf "%-30s " "[$sku]"

  # Look up product by SKU
  product_json=$(woo_get "products" \
    --data-urlencode "sku=$sku" \
    -d "per_page=1")

  product_id=$(echo "$product_json" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if isinstance(data, list) and len(data) > 0:
    print(data[0]['id'])
else:
    print('')
" 2>/dev/null || echo "")

  if [[ -z "$product_id" ]]; then
    echo "NOT FOUND — skipped"
    ((skipped++))
    continue
  fi

  # Build category payload
  if $APPEND; then
    # Get existing categories and append the new one
    existing_cats=$(echo "$product_json" | python3 -c "
import sys, json
data = json.load(sys.stdin)
cats = data[0].get('categories', [])
ids = [c['id'] for c in cats]
if $cat_id not in ids:
    ids.append($cat_id)
print(json.dumps([{'id': i} for i in ids]))" 2>/dev/null)
  else
    existing_cats="[{\"id\": $cat_id}]"
  fi

  payload="{\"categories\": $existing_cats}"

  if $DRY_RUN; then
    echo "product #$product_id -> would set categories: $existing_cats"
    ((ok++))
    continue
  fi

  # Update the product
  result=$(woo_put "products/$product_id" "$payload")
  updated_id=$(echo "$result" | python3 -c "
import sys, json
data = json.load(sys.stdin)
print(data.get('id', ''))" 2>/dev/null || echo "")

  if [[ -n "$updated_id" ]]; then
    echo "product #$product_id -> OK"
    ((ok++))
  else
    error_msg=$(echo "$result" | python3 -c "
import sys, json
data = json.load(sys.stdin)
print(data.get('message', 'unknown error'))" 2>/dev/null || echo "unknown error")
    echo "product #$product_id -> FAILED ($error_msg)"
    ((failed++))
  fi
done

# ── Summary ──────────────────────────────────────────────────────────────────

echo ""
echo "=== Summary ==="
echo "Updated:  $ok"
echo "Skipped:  $skipped (SKU not found)"
echo "Failed:   $failed"
$DRY_RUN && echo "(dry run — nothing was actually changed)"

if [[ $failed -gt 0 ]]; then
  exit 1
fi
