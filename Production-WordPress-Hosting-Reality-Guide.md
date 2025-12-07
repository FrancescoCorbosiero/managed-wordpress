# Production WordPress Hosting: The Reality Guide
*Everything that can go wrong and how to prepare for it*

---

## 1. BACKUPS - The Full Picture

### Contabo's Backup Options

| Type | What it is | Retention | Cost | Limitations |
|------|------------|-----------|------|-------------|
| **Snapshots** | Point-in-time VPS state | 30 days | FREE (2-3 per VPS) | Stored on same infrastructure, manual trigger |
| **Auto Backup** | Daily incremental, off-server | 10 days | €1.15 - €12/month per VPS | Full VPS restore only, not granular |

### Can You Rely on Contabo Backups Only?

**Short answer: NO.** Here's why:

1. **Auto Backup restores the ENTIRE VPS** - you can't restore just one WordPress site's database
2. **10 days retention** - if corruption happens slowly and you notice on day 11, you're screwed
3. **Same provider risk** - if Contabo has a major incident, your backups might be affected too
4. **No granular restore** - can't restore just `/var/www/site-x` or just one database

### The 3-2-1 Backup Rule (Industry Standard)

```
3 copies of your data
2 different storage types/media
1 offsite (different provider/location)
```

### Recommended Backup Strategy for Your Setup

#### Layer 1: Contabo Auto Backup (VPS-level disaster recovery)
- **What:** Full VPS snapshots
- **When:** Daily automatic
- **Cost:** ~€3-6/month per VPS
- **Use for:** Complete server failure, ransomware, catastrophic failure

#### Layer 2: WordPress-level Backups (Site-level recovery)
- **What:** Database dumps + wp-content folders
- **When:** Daily (or hourly for XL/e-commerce)
- **Tools:** 
  - UpdraftPlus (free tier works)
  - WP-CLI scripts
  - Custom mysqldump + rsync scripts
- **Store to:** Different location (Object Storage, S3, etc.)

#### Layer 3: Offsite/Off-provider Backup
- **What:** Critical data copied to different provider
- **Options:**
  - Contabo Object Storage: €2.49/250GB (same provider, but different system)
  - Backblaze B2: ~$5/TB/month (truly offsite)
  - Hetzner Storage Box: €3.81/100GB
- **Use for:** Complete Contabo failure, regional disaster

### Backup Cost Impact on Your Plan

For 3 VPS setup (your full-scale dream):

| Backup Layer | Monthly Cost |
|--------------|--------------|
| Contabo Auto Backup (3 VPS) | ~€6-12 |
| Object Storage 250GB | €2.49 |
| **Total backup overhead** | **~€9-15/month** |

**Revised full-scale cost: €53 + €12 = ~€65/month**

---

## 2. UPDATES & VERSION HELL

### The Update Matrix of Pain

| Component | Update Frequency | Risk Level | What Breaks |
|-----------|-----------------|------------|-------------|
| WordPress Core | Monthly | Medium | Plugins, themes, custom code |
| PHP Version | Yearly major | HIGH | Old plugins, deprecated functions |
| MySQL/MariaDB | Yearly | HIGH | Queries, charset issues |
| Plugins | Constant | Medium-High | Everything, especially after major WP updates |
| Themes | Irregular | Medium | Customizations, child theme conflicts |
| Docker Images | Monthly | Medium | PHP version jumps, config changes |
| Ubuntu/OS | 2-year LTS cycle | HIGH | Everything |
| SSL Certs | 90 days (Let's Encrypt) | LOW (if automated) | Site goes HTTPS error |

### The Most Common Update Disasters

#### PHP Version Jumps
```
Bitnami updates image → PHP 8.1 → 8.2 → 8.3
Your plugin uses: deprecated_function()
Result: White screen of death
```

**Prevention:**
- Pin Docker image versions (don't use `latest`)
- Test updates on staging first
- Keep plugin list minimal and well-maintained

#### WordPress Core + Plugin Incompatibility
```
WordPress 6.5 releases
You auto-update
Plugin X hasn't updated in 8 months
Site breaks
```

**Prevention:**
- Disable auto-updates for core (do it manually after testing)
- Audit plugins quarterly - remove abandoned ones
- Use staging environment

#### Database Charset/Collation Issues
```
MariaDB upgrade
utf8mb4_unicode_ci → utf8mb4_unicode_520_ci
Special characters become: ????
```

**Prevention:**
- Backup database BEFORE any MariaDB updates
- Test restore on staging
- Keep charset consistent: `utf8mb4_unicode_ci`

#### SSL Certificate Renewal Failures
```
Let's Encrypt cert expires
Traefik can't renew (port 80 blocked, DNS issue)
Site shows: NET::ERR_CERT_DATE_INVALID
```

**Prevention:**
- Monitor cert expiry (add to monitoring)
- Ensure Traefik has proper ACME configuration
- Test renewal: `docker exec traefik traefik healthcheck`

### Update Strategy for Production

```bash
# NEVER do this on production
docker-compose pull && docker-compose up -d

# DO this instead
1. Backup database
2. Create VPS snapshot
3. Test on staging/dev
4. Schedule maintenance window
5. Update production
6. Monitor for 24h
7. Keep rollback ready for 7 days
```

---

## 3. THE NIGHTMARE SCENARIOS
*Things that happen at 3 AM on a Friday*

### Category A: Database Disasters

#### Database Corruption
**Symptoms:** Random errors, missing posts, broken admin
**Causes:** 
- Disk full during write
- OOM killer kills MariaDB mid-transaction
- Docker container killed during query

**Prevention:**
```yaml
# In docker-compose, add proper shutdown timeout
stop_grace_period: 30s

# MariaDB settings
innodb_flush_log_at_trx_commit=1  # Slower but safer
```

**Recovery:**
```bash
# If you have backups:
docker exec mariadb mysqldump -u root -p dbname > emergency_backup.sql
# Restore from last known good backup
```

#### Database Table Locks
**Symptoms:** Site hangs, admin frozen, "waiting for table lock"
**Causes:** Long-running queries, plugin doing massive imports

**Fix:**
```bash
docker exec -it mariadb mysql -u root -p
SHOW FULL PROCESSLIST;
KILL <process_id>;
```

### Category B: Disk Space Nightmares

#### Disk Full = Everything Dies
**Symptoms:** Sites down, databases corrupted, Docker won't start
**Causes:** 
- Log files exploding
- Backup files accumulating
- Uploaded media
- Docker images/volumes

**Prevention:**
```bash
# Add to crontab - daily disk check
0 6 * * * /usr/bin/df -h | grep -E '^/dev' | awk '{if(int($5)>80) print}' | mail -s "Disk Warning" you@email.com

# Docker cleanup
docker system prune -af --volumes  # CAREFUL: removes unused volumes
```

**Common space hogs:**
```bash
du -sh /var/lib/docker/        # Docker eating space
du -sh /var/log/               # Logs
du -sh /var/lib/mysql/         # Database files
find / -name "*.log" -size +100M  # Large log files
```

### Category C: Container Chaos

#### OOM Killer Strikes
**Symptoms:** Container randomly restarts, `docker logs` shows: "Killed"
**Cause:** Container exceeded memory limit

**Check:**
```bash
dmesg | grep -i "killed process"
docker inspect <container> | grep -i oom
```

**Fix:** Increase memory limits in docker-compose or optimize the site

#### Docker Daemon Crashes
**Symptoms:** All containers down, `docker ps` hangs
**Cause:** Corrupted Docker state, disk full, kernel issues

**Recovery:**
```bash
sudo systemctl restart docker
# If that fails:
sudo systemctl stop docker
sudo rm -rf /var/lib/docker/network/files/local-kv.db  # Reset network DB
sudo systemctl start docker
```

### Category D: Network & SSL Hell

#### DNS Propagation Delays
**Symptoms:** Some users see old site, some see new
**Reality:** DNS changes can take 24-48h globally

**Mitigation:** 
- Lower TTL before migration (300 seconds)
- Keep old server running for 48h after migration

#### Let's Encrypt Rate Limits
**Symptoms:** "too many certificates already issued"
**Cause:** Too many cert requests (testing, failed renewals)
**Limit:** 50 certs per domain per week

**Prevention:**
- Use staging ACME for testing
- Don't recreate Traefik constantly

### Category E: Human Error (The #1 Cause)

- `rm -rf /var/www/*` (wrong directory)
- Deploying to production instead of staging
- Updating all plugins at once without testing
- Forgetting to renew domain (not just SSL, the actual domain)
- Editing wp-config.php and syntax error
- Running database migration on wrong DB

---

## 4. MIGRATION: VPS to Bigger VPS

### The Good News
**Yes, you can migrate without losing data.** Docker volumes make this manageable.

### Migration Methods

#### Method A: Docker Volume Migration (Recommended)

```bash
# On OLD VPS - Export volumes
docker run --rm \
  -v projectname_wordpress-data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/wordpress-data.tar.gz -C /data .

docker run --rm \
  -v projectname_mariadb-data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/mariadb-data.tar.gz -C /data .

# Transfer to NEW VPS
scp *.tar.gz user@new-vps:/home/user/

# On NEW VPS - Import volumes
docker volume create projectname_wordpress-data
docker volume create projectname_mariadb-data

docker run --rm \
  -v projectname_wordpress-data:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/wordpress-data.tar.gz -C /data

docker run --rm \
  -v projectname_mariadb-data:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/mariadb-data.tar.gz -C /data
```

#### Method B: Database + Files Separately (More Control)

```bash
# Export database
docker exec mariadb mysqldump -u root -p'password' dbname > site_backup.sql

# Export wp-content
docker cp wordpress:/bitnami/wordpress/wp-content ./wp-content-backup

# On new server: import database
docker exec -i mariadb mysql -u root -p'password' dbname < site_backup.sql

# Copy wp-content
docker cp ./wp-content-backup wordpress:/bitnami/wordpress/wp-content
```

#### Method C: Rsync Live Migration (Zero Downtime)

```bash
# Initial sync (while old server still running)
rsync -avz --progress /path/to/volumes/ user@new-vps:/path/to/volumes/

# Final sync (quick, only changes)
docker-compose stop  # Brief downtime starts
rsync -avz --delete /path/to/volumes/ user@new-vps:/path/to/volumes/
# Update DNS
# Start on new server
docker-compose up -d
```

### Migration Checklist

```
□ Backup everything (database + files + docker-compose + .env)
□ Document current setup (versions, configs)
□ Set up new VPS with same Docker/Traefik config
□ Test restore on new VPS (don't point DNS yet)
□ Lower DNS TTL to 300 seconds (do this 24h before)
□ Schedule maintenance window
□ Final sync + DNS switch
□ Monitor both servers for 24-48h
□ Keep old server for 1 week (just in case)
□ Decommission old server
```

### Downtime Expectations

| Method | Expected Downtime |
|--------|-------------------|
| Volume tar + transfer | 10-30 min per site |
| Database + files | 5-15 min per site |
| Rsync with final sync | 2-5 min per site |
| Contabo VPS clone (if available) | ~15 min total |

---

## 5. MONITORING: Know Before Users Complain

### Minimum Monitoring Stack

```bash
# Simple uptime check (cron every 5 min)
*/5 * * * * curl -s -o /dev/null -w "%{http_code}" https://yoursite.com | grep -q 200 || echo "Site down" | mail -s "ALERT" you@email.com
```

### What to Monitor

| Metric | Warning | Critical | Tool |
|--------|---------|----------|------|
| Disk space | 80% | 90% | df, node_exporter |
| Memory | 85% | 95% | free, docker stats |
| CPU | 80% avg | 95% avg | top, htop |
| Container status | restart | not running | docker ps |
| SSL expiry | 14 days | 7 days | ssl-cert-check |
| HTTP response | >2s | >5s or non-200 | curl, uptime robot |
| Database connections | 80% max | 95% max | SHOW STATUS |

### Free/Cheap Monitoring Options

- **UptimeRobot** (free): HTTP checks, alerts
- **Healthchecks.io** (free tier): Cron job monitoring
- **Netdata** (self-hosted, free): Beautiful real-time dashboard
- **Grafana + Prometheus** (self-hosted, free): Professional monitoring

---

## 6. REALITY CHECK: Total Cost of Production Hosting

### Your Dream Setup - True Cost

| Item | Monthly Cost |
|------|--------------|
| 3× VPS (XS/M/XL tiers) | €53 |
| Auto Backup (3 VPS) | €9 |
| Object Storage (offsite) | €2.49 |
| Domain renewals (amortized) | ~€5 |
| **Monitoring** | Free (UptimeRobot) |
| **Your time** | ??? |
| **Total** | **~€70/month** |

**Still ~€1.27/site for 55 sites** — that's excellent value.

### Time Investment (Be Honest)

| Task | Frequency | Time |
|------|-----------|------|
| Updates + testing | Weekly | 2-4h |
| Monitoring checks | Daily | 15min |
| Incident response | Monthly avg | 2-8h |
| Client support | Ongoing | Varies |
| Quarterly audits | Quarterly | 4h |

**First year:** Expect 200+ hours learning and firefighting
**After year 1:** 5-10 hours/month maintenance (if things are stable)

---

## TL;DR - The Essentials

1. **Backups:** Contabo Auto Backup + your own WordPress-level backups + offsite. Never trust one layer.

2. **Updates:** Pin versions, test on staging, never auto-update everything, always have rollback ready.

3. **Nightmares:** Disk full and OOM kills are the most common. Monitor proactively.

4. **Migration:** Docker volumes make it manageable. Expect 5-30 min downtime per site.

5. **True cost:** Add ~€15-20/month for proper backups and monitoring to your VPS costs.

6. **Your sanity:** Document everything, automate what you can, and accept that things WILL break at the worst possible time. That's hosting.
