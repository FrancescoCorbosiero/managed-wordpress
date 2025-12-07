#!/bin/bash
set -e

# Usage check
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: ./dock-website.sh <project-name> <domain>"
    echo "Example: ./dock-website.sh my-client example.com"
    exit 1
fi

PROJECT_NAME="$1"
DOMAIN="$2"
BASE_DIR="$(dirname "$0")"
SITES_DIR="$BASE_DIR/htdocs"
TEMPLATE_DIR="$SITES_DIR/template"
TARGET_DIR="$SITES_DIR/$PROJECT_NAME"

# Validate project name (lowercase, alphanumeric, hyphens only)
if [[ ! "$PROJECT_NAME" =~ ^[a-z0-9-]+$ ]]; then
    echo "ERROR: Project name must be lowercase alphanumeric with hyphens only"
    exit 1
fi

# Check template exists
if [ ! -d "$TEMPLATE_DIR" ]; then
    echo "ERROR: Template not found at $TEMPLATE_DIR"
    exit 1
fi

# Check site doesn't already exist
if [ -d "$TARGET_DIR" ]; then
    echo "ERROR: Site '$PROJECT_NAME' already exists at $TARGET_DIR"
    exit 1
fi

echo "=== Creating WordPress Site: $PROJECT_NAME ==="

# Copy template
cp -r "$TEMPLATE_DIR" "$TARGET_DIR"
cd "$TARGET_DIR"

# Generate secure passwords
DB_PASS=$(openssl rand -base64 24 | tr -dc 'a-zA-Z0-9' | head -c 32)
DB_ROOT_PASS=$(openssl rand -base64 24 | tr -dc 'a-zA-Z0-9' | head -c 32)

# Create .env from template with substitutions
sed -e "s/^PROJECT_NAME=.*/PROJECT_NAME=$PROJECT_NAME/" \
    -e "s/^DOMAIN=.*/DOMAIN=$DOMAIN/" \
    -e "s/^DB_PASSWORD=.*/DB_PASSWORD=$DB_PASS/" \
    -e "s/^DB_ROOT_PASSWORD=.*/DB_ROOT_PASSWORD=$DB_ROOT_PASS/" \
    .env.template > .env

echo ""
echo "Site created at: $TARGET_DIR"
echo ""
echo "=== Generated Credentials ==="
echo "DB_PASSWORD: $DB_PASS"
echo "DB_ROOT_PASSWORD: $DB_ROOT_PASS"
echo ""
echo "Credentials saved in: $TARGET_DIR/.env"
echo ""
echo "=== Next Steps ==="
echo "1. Review/adjust size preset in .env (default: XS)"
echo "   nano $TARGET_DIR/.env"
echo ""
echo "2. Start the site:"
echo "   cd $TARGET_DIR && docker compose up -d"
echo ""
echo "3. Access: https://$DOMAIN (SSL auto-configured)"
```