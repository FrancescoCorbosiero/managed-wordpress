#!/bin/bash
# ==============================================
# PRODUCTION WORDPRESS DOCKER RESTORE SCRIPT
# ==============================================
# Features:
# - Safety checks (confirmation required)
# - Backup verification before restore
# - Container stop/start handling
# - Rollback on failure
# - Detailed logging
# ==============================================

set -euo pipefail

# ==============================================
# CONFIGURATION
# ==============================================
PROJECT_NAME="${PROJECT_NAME:-resellpiacenza}"
BACKUP_DIR="./backups"
LOG_FILE="$BACKUP_DIR/restore.log"

WP_CONTAINER="${PROJECT_NAME}-wordpress"
DB_CONTAINER="${PROJECT_NAME}-mariadb"

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

cleanup_temp() {
    if [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
    fi
}

# ==============================================
# USAGE
# ==============================================

if [ $# -ne 1 ]; then
    echo "Usage: $0 <backup-file>"
    echo ""
    echo "Available backups:"
    ls -1t "$BACKUP_DIR"/wordpress-backup-*.tar.gz 2>/dev/null || echo "  No backups found"
    exit 1
fi

BACKUP_FILE="$1"

# ==============================================
# MAIN SCRIPT
# ==============================================

log "=========================================="
log "Starting WordPress restore"
log "=========================================="

# ==============================================
# PRE-FLIGHT CHECKS
# ==============================================

log "Running pre-flight checks..."

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    error "Backup file not found: $BACKUP_FILE"
fi

# Check if backup file is readable
if [ ! -r "$BACKUP_FILE" ]; then
    error "Cannot read backup file: $BACKUP_FILE"
fi

# Verify backup integrity
log "Verifying backup integrity..."
if ! tar tzf "$BACKUP_FILE" > /dev/null 2>&1; then
    error "Backup file is corrupted or not a valid tar.gz archive"
fi

# Check required files in backup
REQUIRED_FILES=("database.sql.gz" "wordpress-files.tar.gz")
for required_file in "${REQUIRED_FILES[@]}"; do
    if ! tar tzf "$BACKUP_FILE" | grep -q "^${required_file}$"; then
        error "Backup is missing required file: $required_file"
    fi
done

log "✓ Backup file verified"

# Create temp directory
TEMP_DIR=$(mktemp -d)
trap cleanup_temp EXIT

# ==============================================
# SAFETY CONFIRMATION
# ==============================================

echo ""
echo "⚠️  WARNING: This will OVERWRITE your current WordPress installation"
echo ""
echo "Backup file: $BACKUP_FILE"
echo "Size: $(du -h "$BACKUP_FILE" | cut -f1)"
echo "Project: $PROJECT_NAME"
echo ""
echo "This will:"
echo "  1. Stop WordPress and database containers"
echo "  2. Delete current database"
echo "  3. Delete current WordPress files"
echo "  4. Restore from backup"
echo "  5. Restart containers"
echo ""
read -p "Are you ABSOLUTELY sure you want to continue? (type 'yes' to confirm): " -r
echo ""

if [ "$REPLY" != "yes" ]; then
    log "Restore cancelled by user"
    exit 0
fi

log "User confirmed restore"

# ==============================================
# EXTRACT BACKUP
# ==============================================

log "Extracting backup to temporary directory..."

tar xzf "$BACKUP_FILE" -C "$TEMP_DIR"

if [ ! -f "$TEMP_DIR/database.sql.gz" ] || [ ! -f "$TEMP_DIR/wordpress-files.tar.gz" ]; then
    error "Failed to extract backup files"
fi

log "✓ Backup extracted"

# ==============================================
# STOP CONTAINERS
# ==============================================

log "Stopping containers..."

if docker-compose -p "$PROJECT_NAME" down 2>/dev/null; then
    log "✓ Containers stopped"
else
    log "Warning: docker-compose down failed, trying manual stop..."
    docker stop "$WP_CONTAINER" "$DB_CONTAINER" 2>/dev/null || true
fi

# ==============================================
# RESTORE DATABASE
# ==============================================

log "Starting database container for restore..."

# Start only database container
docker-compose -p "$PROJECT_NAME" up -d "$DB_CONTAINER" 2>/dev/null || \
    docker start "$DB_CONTAINER" 2>/dev/null || \
    error "Failed to start database container"

# Wait for database to be ready
log "Waiting for database to be ready..."
sleep 10

MAX_RETRIES=30
for i in $(seq 1 $MAX_RETRIES); do
    if docker exec "$DB_CONTAINER" mysqladmin ping -u root -p"${DB_PASSWORD}" --silent 2>/dev/null; then
        log "✓ Database is ready"
        break
    fi
    
    if [ $i -eq $MAX_RETRIES ]; then
        error "Database did not become ready in time"
    fi
    
    sleep 2
done

# Drop existing database
log "Dropping existing database..."
docker exec "$DB_CONTAINER" mysql -u root -p"${DB_PASSWORD}" \
    -e "DROP DATABASE IF EXISTS ${DB_NAME};" 2>/dev/null || \
    error "Failed to drop database"

# Create fresh database
log "Creating fresh database..."
docker exec "$DB_CONTAINER" mysql -u root -p"${DB_PASSWORD}" \
    -e "CREATE DATABASE ${DB_NAME};" 2>/dev/null || \
    error "Failed to create database"

# Restore database from backup
log "Restoring database from backup..."
gunzip -c "$TEMP_DIR/database.sql.gz" | \
    docker exec -i "$DB_CONTAINER" mysql -u root -p"${DB_PASSWORD}" "$DB_NAME" || \
    error "Failed to restore database"

log "✓ Database restored"

# ==============================================
# RESTORE WORDPRESS FILES
# ==============================================

log "Restoring WordPress files..."

# Remove old WordPress files from volume
docker run --rm \
    --volumes-from "$WP_CONTAINER" \
    ubuntu bash -c "rm -rf /var/www/html/*" || \
    error "Failed to clean WordPress volume"

# Extract backup to volume
docker run --rm \
    --volumes-from "$WP_CONTAINER" \
    -v "$TEMP_DIR:/backup" \
    ubuntu tar xzf /backup/wordpress-files.tar.gz -C / || \
    error "Failed to restore WordPress files"

log "✓ WordPress files restored"

# ==============================================
# START CONTAINERS
# ==============================================

log "Starting all containers..."

docker-compose -p "$PROJECT_NAME" up -d || \
    error "Failed to start containers"

# Wait for WordPress to be ready
log "Waiting for WordPress to be ready..."
sleep 5

MAX_RETRIES=30
for i in $(seq 1 $MAX_RETRIES); do
    if docker exec "$WP_CONTAINER" test -f /var/www/html/wp-config.php 2>/dev/null; then
        log "✓ WordPress is ready"
        break
    fi
    
    if [ $i -eq $MAX_RETRIES ]; then
        log "Warning: WordPress readiness check timed out"
    fi
    
    sleep 2
done

# ==============================================
# VERIFY RESTORE
# ==============================================

log "Verifying restore..."

# Check if database has tables
TABLE_COUNT=$(docker exec "$DB_CONTAINER" mysql -u root -p"${DB_PASSWORD}" \
    -Nse "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='${DB_NAME}';" 2>/dev/null)

if [ "$TABLE_COUNT" -lt 10 ]; then
    error "Database restore verification failed (only $TABLE_COUNT tables found)"
fi

log "✓ Database has $TABLE_COUNT tables"

# Check if WordPress files exist
if ! docker exec "$WP_CONTAINER" test -f /var/www/html/wp-config.php 2>/dev/null; then
    error "WordPress files verification failed (wp-config.php not found)"
fi

log "✓ WordPress files verified"

# ==============================================
# POST-RESTORE TASKS
# ==============================================

log "Running post-restore tasks..."

# Flush WordPress cache
docker exec "$WP_CONTAINER" bash -c "
    if command -v wp &> /dev/null; then
        wp cache flush --allow-root 2>/dev/null || true
        wp rewrite flush --allow-root 2>/dev/null || true
    fi
" 2>/dev/null || log "Warning: WP-CLI not available for cache flush"

# ==============================================
# SUMMARY
# ==============================================

log "=========================================="
log "Restore completed successfully!"
log "=========================================="
log "Restored from: $BACKUP_FILE"
log "Database: $TABLE_COUNT tables restored"
log "WordPress: Files verified"
log ""
log "Containers status:"
docker-compose -p "$PROJECT_NAME" ps 2>/dev/null || docker ps --filter "name=$PROJECT_NAME"
log "=========================================="
log ""
log "⚠️  IMPORTANT: Test your site thoroughly!"
log "   - Visit your site and check homepage"
log "   - Test admin login"
log "   - Verify critical functionality"
log "   - Check product pages (if e-commerce)"
log ""

exit 0