#!/bin/bash
# ==============================================
# PRODUCTION WORDPRESS DOCKER BACKUP SCRIPT
# ==============================================
# Features:
# - Proper database export (mysqldump)
# - Error handling (exits on failure)
# - Backup verification
# - Backup rotation (keeps last N backups)
# - Logging
# - Pre-flight checks
# ==============================================

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# ==============================================
# CONFIGURATION
# ==============================================
PROJECT_NAME="${PROJECT_NAME:-resellpiacenza}"
BACKUP_DIR="./backups"
MAX_BACKUPS=7  # Keep last 7 backups
DATE=$(date +%Y%m%d-%H%M%S)
LOG_FILE="$BACKUP_DIR/backup.log"

# Container names (adjust if different)
WP_CONTAINER="${PROJECT_NAME}-wordpress"
DB_CONTAINER="${PROJECT_NAME}-mariadb"

# Database credentials (should match your .env)
DB_NAME="${DB_NAME:-wordpress}"
DB_USER="${DB_USER:-wordpress}"
DB_PASSWORD="${DB_PASSWORD:-wordpress}"

# ==============================================
# FUNCTIONS
# ==============================================

log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

error() {
    log "ERROR: $*"
    exit 1
}

check_container() {
    local container=$1
    if ! docker ps --format '{{.Names}}' | grep -q "^${container}$"; then
        error "Container $container is not running"
    fi
}

cleanup_temp() {
    if [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
    fi
}

# ==============================================
# MAIN SCRIPT
# ==============================================

log "=========================================="
log "Starting WordPress backup"
log "=========================================="

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Create temp directory for this backup
TEMP_DIR=$(mktemp -d)
trap cleanup_temp EXIT

log "Using temporary directory: $TEMP_DIR"

# ==============================================
# PRE-FLIGHT CHECKS
# ==============================================

log "Running pre-flight checks..."

# Check if containers are running
check_container "$WP_CONTAINER"
check_container "$DB_CONTAINER"

# Check if we have enough disk space (at least 1GB free)
AVAILABLE_SPACE=$(df -BG "$BACKUP_DIR" | tail -1 | awk '{print $4}' | sed 's/G//')
if [ "$AVAILABLE_SPACE" -lt 1 ]; then
    error "Not enough disk space. Available: ${AVAILABLE_SPACE}GB"
fi

log "✓ Pre-flight checks passed"

# ==============================================
# BACKUP DATABASE
# ==============================================

log "Backing up database..."

DB_BACKUP_FILE="$TEMP_DIR/database.sql"

# Use mysqldump for consistent backup (NOT raw file copy)
if docker exec "$DB_CONTAINER" mysqldump \
    --user="$DB_USER" \
    --password="$DB_PASSWORD" \
    --single-transaction \
    --quick \
    --lock-tables=false \
    "$DB_NAME" > "$DB_BACKUP_FILE" 2>/dev/null; then
    
    log "✓ Database exported: $(du -h "$DB_BACKUP_FILE" | cut -f1)"
else
    error "Database backup failed"
fi

# Verify database backup is not empty
if [ ! -s "$DB_BACKUP_FILE" ]; then
    error "Database backup file is empty"
fi

# Compress database backup
gzip "$DB_BACKUP_FILE"
DB_BACKUP_FILE="${DB_BACKUP_FILE}.gz"

log "✓ Database compressed: $(du -h "$DB_BACKUP_FILE" | cut -f1)"

# ==============================================
# BACKUP WORDPRESS FILES
# ==============================================

log "Backing up WordPress files..."

WP_BACKUP_FILE="$TEMP_DIR/wordpress-files.tar.gz"

# Backup WordPress files (excluding cache/tmp directories)
if docker run --rm \
    --volumes-from "$WP_CONTAINER" \
    -v "$TEMP_DIR:/backup" \
    ubuntu tar czf /backup/wordpress-files.tar.gz \
    --exclude='wp-content/cache/*' \
    --exclude='wp-content/tmp/*' \
    --exclude='wp-content/uploads/wc-logs/*' \
    -C / var/www/html 2>/dev/null; then
    
    log "✓ Files backed up: $(du -h "$WP_BACKUP_FILE" | cut -f1)"
else
    error "WordPress files backup failed"
fi

# Verify files backup is not empty
if [ ! -s "$WP_BACKUP_FILE" ]; then
    error "WordPress files backup is empty"
fi

# ==============================================
# CREATE FINAL BACKUP ARCHIVE
# ==============================================

log "Creating final backup archive..."

FINAL_BACKUP="$BACKUP_DIR/wordpress-backup-$DATE.tar.gz"

# Combine database + files into single archive
tar czf "$FINAL_BACKUP" -C "$TEMP_DIR" \
    database.sql.gz \
    wordpress-files.tar.gz

# Verify final archive
if [ ! -s "$FINAL_BACKUP" ]; then
    error "Final backup archive is empty"
fi

# Test archive integrity
if ! tar tzf "$FINAL_BACKUP" > /dev/null 2>&1; then
    error "Final backup archive is corrupted"
fi

FINAL_SIZE=$(du -h "$FINAL_BACKUP" | cut -f1)
log "✓ Final backup created: $FINAL_SIZE"

# ==============================================
# CREATE BACKUP MANIFEST
# ==============================================

MANIFEST="$BACKUP_DIR/wordpress-backup-$DATE.manifest"

cat > "$MANIFEST" <<EOF
Backup Date: $(date)
Project: $PROJECT_NAME
WordPress Container: $WP_CONTAINER
Database Container: $DB_CONTAINER
Database Name: $DB_NAME
Backup Size: $FINAL_SIZE
Files:
  - database.sql.gz
  - wordpress-files.tar.gz

Verification:
  Archive integrity: OK
  Database size: $(stat -f%z "$DB_BACKUP_FILE" 2>/dev/null || stat -c%s "$DB_BACKUP_FILE") bytes
  Files size: $(stat -f%z "$WP_BACKUP_FILE" 2>/dev/null || stat -c%s "$WP_BACKUP_FILE") bytes

MD5 Checksum: $(md5sum "$FINAL_BACKUP" | cut -d' ' -f1)
EOF

log "✓ Manifest created: $MANIFEST"

# ==============================================
# BACKUP ROTATION
# ==============================================

log "Rotating old backups (keeping last $MAX_BACKUPS)..."

# Count existing backups
BACKUP_COUNT=$(ls -1 "$BACKUP_DIR"/wordpress-backup-*.tar.gz 2>/dev/null | wc -l)

if [ "$BACKUP_COUNT" -gt "$MAX_BACKUPS" ]; then
    # Delete oldest backups
    BACKUPS_TO_DELETE=$((BACKUP_COUNT - MAX_BACKUPS))
    
    ls -1t "$BACKUP_DIR"/wordpress-backup-*.tar.gz | tail -n "$BACKUPS_TO_DELETE" | while read -r old_backup; do
        log "  Deleting old backup: $(basename "$old_backup")"
        rm -f "$old_backup"
        rm -f "${old_backup%.tar.gz}.manifest"  # Also delete manifest
    done
fi

# ==============================================
# SUMMARY
# ==============================================

log "=========================================="
log "Backup completed successfully!"
log "=========================================="
log "Backup file: $FINAL_BACKUP"
log "Manifest: $MANIFEST"
log "Size: $FINAL_SIZE"
log "Available backups:"

ls -lh "$BACKUP_DIR"/wordpress-backup-*.tar.gz | awk '{print "  - " $9 " (" $5 ")"}'

log "=========================================="

# Optional: Send notification (uncomment if needed)
# curl -X POST "https://hooks.slack.com/..." -d "payload={\"text\":\"WordPress backup completed: $FINAL_SIZE\"}"

exit 0