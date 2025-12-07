# WordPress Infrastructure with Caddy

A production-ready, minimal WordPress hosting setup using official open-source images.

# Make executable
chmod +x setup.sh dock-website.sh

# First time
./setup.sh

# Add sites
./dock-website.sh clientname clientdomain.com
./dock-website.sh another-client another.com

## Stack Overview

| Component | Image | Support Timeline |
|-----------|-------|------------------|
| Reverse Proxy | `lucaslorentz/caddy-docker-proxy:2.9-alpine` | Actively maintained |
| WordPress | `wordpress:6-php8.3-apache` | PHP 8.3 until Dec 2027 |
| Database | `mariadb:11.4-lts` | LTS until May 2029 |

**Why these choices:**
- **Official WordPress image**: Maintained by Docker & WordPress teams, not a third party
- **PHP 8.3**: Current stable with long-term support (8.4 available when ready)
- **MariaDB LTS**: Guaranteed 5-year support cycle, drop-in MySQL replacement
- **Caddy**: Auto HTTPS, simpler config than Traefik, zero-downtime reloads

---

## Directory Structure

```
wordpress-infrastructure/
├── caddy/
│   ├── docker-compose.yml    # Reverse proxy (run first)
│   └── .env.template
└── sites/
    ├── example-site/         # Template - copy for each site
    │   ├── docker-compose.yml
    │   ├── .env.template
    │   └── uploads.ini
    ├── your-site-1/          # Your actual sites
    ├── your-site-2/
    └── ...
```

---

## Initial Setup (One Time)

### 1. Create the Caddy network

```bash
docker network create caddy
```

### 2. Start Caddy reverse proxy

```bash
cd caddy
cp .env.template .env
nano .env  # Set your email for Let's Encrypt

docker compose up -d
```

### 3. Verify Caddy is running

```bash
docker ps | grep caddy
docker logs caddy
```

---

## Adding a New WordPress Site

### 1. Copy the template

```bash
cd sites
cp -r example-site my-new-site
cd my-new-site
```

### 2. Configure the environment

```bash
cp .env.template .env
nano .env
```

**Required changes:**
- `PROJECT_NAME`: Unique name (e.g., `my-client-site`)
- `DOMAIN`: Your domain (e.g., `client.com`)
- `DB_PASSWORD`: Strong unique password
- `DB_ROOT_PASSWORD`: Strong unique password
- Choose size preset (XS/M/XL) by uncommenting the appropriate section

### 3. Start the site

```bash
docker compose up -d
```

### 4. Verify it's running

```bash
docker ps | grep my-new-site
docker logs my-new-site-wordpress
```

The site will automatically:
- Get an SSL certificate from Let's Encrypt
- Be accessible at `https://your-domain.com`
- Handle both `domain.com` and `www.domain.com`

---

## Managing Sites

### View all running containers

```bash
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### Check resource usage

```bash
docker stats --no-stream
```

### View logs for a site

```bash
cd sites/my-site
docker compose logs -f wordpress
docker compose logs -f mariadb
```

### Stop a site

```bash
cd sites/my-site
docker compose down
```

### Restart a site

```bash
cd sites/my-site
docker compose restart
```

### Update WordPress (pull new image)

```bash
cd sites/my-site

# Backup first!
docker exec my-site-mariadb mysqldump -u root -p wordpress > backup.sql

# Update
docker compose pull
docker compose up -d
```

---

## Backup Commands

### Database backup

```bash
# Single site
docker exec SITENAME-mariadb mysqldump -u root -p'ROOT_PASSWORD' wordpress > backup-$(date +%Y%m%d).sql

# Compressed
docker exec SITENAME-mariadb mysqldump -u root -p'ROOT_PASSWORD' wordpress | gzip > backup-$(date +%Y%m%d).sql.gz
```

### WordPress files backup

```bash
docker run --rm \
  -v SITENAME-wordpress-data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/wp-files-$(date +%Y%m%d).tar.gz -C /data .
```

### Restore database

```bash
docker exec -i SITENAME-mariadb mysql -u root -p'ROOT_PASSWORD' wordpress < backup.sql
```

---

## Sizing Reference

| Size | Total RAM | Use Case | Sites per 4GB VPS |
|------|-----------|----------|-------------------|
| XS | ~768MB | Landing pages, portfolios | ~4-5 |
| M | ~1.5GB | Blogs, business sites | ~2 |
| XL | ~3GB | WooCommerce, heavy traffic | ~1 |

Actual usage is typically 30-50% of allocated limits.

---

## Troubleshooting

### Site not accessible

```bash
# Check Caddy logs
docker logs caddy

# Check if containers are running
docker ps -a | grep SITENAME

# Check WordPress logs
docker logs SITENAME-wordpress
```

### Database connection error

```bash
# Check MariaDB is healthy
docker ps | grep SITENAME-mariadb

# Test connection from WordPress container
docker exec SITENAME-wordpress php -r "new PDO('mysql:host=mariadb;dbname=wordpress', 'wordpress', 'PASSWORD');"
```

### SSL certificate issues

```bash
# Check Caddy certificates
docker exec caddy caddy list-certificates

# Force certificate refresh (if needed)
docker exec caddy caddy reload
```

### Out of memory

```bash
# Check which container is using most memory
docker stats --no-stream

# Increase limits in .env and restart
docker compose down
docker compose up -d
```

---

## Upgrading PHP Version

When ready to upgrade PHP (e.g., to 8.4):

1. Edit `docker-compose.yml`
2. Change `wordpress:6-php8.3-apache` to `wordpress:6-php8.4-apache`
3. Test on staging first
4. Run `docker compose pull && docker compose up -d`

---

## Security Checklist

- [ ] Change default database passwords
- [ ] Set `DISALLOW_FILE_EDIT=true` in production
- [ ] Use unique `TABLE_PREFIX` per site
- [ ] Regular backups (automated)
- [ ] Keep images updated
- [ ] Monitor disk space
