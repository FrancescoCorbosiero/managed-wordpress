# Quick Reference Commands

## First-Time Setup
```bash
# 1. Create network
docker network create caddy

# 2. Start Caddy
cd caddy && cp .env.template .env && nano .env
docker compose up -d
```

## New Site
```bash
cd sites
cp -r example-site NEWSITE
cd NEWSITE
cp .env.template .env
nano .env  # Configure PROJECT_NAME, DOMAIN, passwords, size
docker compose up -d
```

## Daily Operations
```bash
# Status
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Resources
docker stats --no-stream

# Logs
docker logs -f SITENAME-wordpress
docker logs -f SITENAME-mariadb
docker logs caddy

# Restart site
cd sites/SITENAME && docker compose restart

# Stop site
cd sites/SITENAME && docker compose down

# Start site
cd sites/SITENAME && docker compose up -d
```

## Backups
```bash
# Database
docker exec SITENAME-mariadb mysqldump -u root -p'ROOTPASS' wordpress > backup.sql

# Files
docker run --rm -v SITENAME-wordpress-data:/data -v $(pwd):/backup alpine tar czf /backup/files.tar.gz -C /data .
```

## Updates
```bash
cd sites/SITENAME
# Backup first!
docker compose pull
docker compose up -d
```

## VPS Health Check
```bash
echo "=== MEMORY ===" && free -h | grep Mem && \
echo "=== DISK ===" && df -h / | tail -1 && \
echo "=== LOAD ===" && uptime && \
echo "=== CONTAINERS ===" && docker stats --no-stream --format "table {{.Name}}\t{{.MemUsage}}\t{{.CPUPerc}}"
```
