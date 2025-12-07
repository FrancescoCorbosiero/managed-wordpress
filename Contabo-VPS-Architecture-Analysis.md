# Contabo VPS Architecture Analysis for WordPress Hosting

## Your Docker Configuration Resource Requirements

Based on your uploaded Docker Compose files:

| Config | WordPress | MariaDB | **Total per Site** | Traefik Overhead |
|--------|-----------|---------|-------------------|------------------|
| **XS** | 512MB (256MB reserved) | 256MB (128MB reserved) | **768MB** | - |
| **M**  | 1GB (512MB reserved) | 512MB (256MB reserved) | **1.5GB** | - |
| **XL** | 2GB (1GB reserved) | 1GB (512MB reserved) | **3GB** | - |

**System overhead per VPS:** ~512MB-1GB for OS + Docker + Traefik

---

## Contabo Cloud VPS Plans (Current EUR Pricing)

| Plan | vCPU | RAM | NVMe Storage | Price/month |
|------|------|-----|--------------|-------------|
| **Cloud VPS 10** | 3 | 8 GB | 75 GB | €4.50 |
| **Cloud VPS 20** | 6 | 12 GB | 100 GB | €7.00 |
| **Cloud VPS 30** | 8 | 24 GB | 200 GB | €14.00 |
| **Cloud VPS 40** | 12 | 48 GB | 250 GB | €25.00 |
| **Cloud VPS 50** | 16 | 64 GB | 300 GB | €37.00 |
| **Cloud VPS 60** | 18 | 96 GB | 350 GB | €49.00 |

---

## Your Target Workload

| Type | Quantity (Range) | RAM per site | Total RAM Range |
|------|------------------|--------------|-----------------|
| XS (Landing pages) | 20-30 | 768MB | 15-23 GB |
| M (Blogs/Business) | 5-15 | 1.5GB | 7.5-22.5 GB |
| XL (E-commerce) | 3-10 | 3GB | 9-30 GB |
| **TOTAL** | 28-55 sites | - | **31.5-75.5 GB** |

Plus system overhead: ~1-2GB per VPS

---

## Architecture Options

### Option A: Single Large VPS (Simplest)
**For minimum setup (20 XS + 5 M + 3 XL = 28 sites)**

- RAM needed: ~15GB + 7.5GB + 9GB + 1GB overhead = **~33GB**
- **Recommended:** Cloud VPS 40 (48GB) or Cloud VPS 50 (64GB)
- Cost: **€25-37/month**

**Pros:** Simple management, single point of configuration
**Cons:** Single point of failure, all eggs in one basket

---

### Option B: Tiered VPS Architecture (Recommended)
**Separate VPS by site tier - better isolation and scaling**

#### Tier 1: XS Sites VPS
- 20-30 landing pages × 768MB = 15-23GB
- **Cloud VPS 30** (24GB RAM) → fits ~25-28 XS sites
- Cost: **€14/month**

#### Tier 2: M Sites VPS  
- 5-15 medium sites × 1.5GB = 7.5-22.5GB
- **Cloud VPS 30** (24GB RAM) → fits ~12-14 M sites
- Cost: **€14/month**

#### Tier 3: XL Sites VPS
- 3-10 large sites × 3GB = 9-30GB
- **Cloud VPS 30** (24GB RAM) → fits ~6-7 XL sites
- **Cloud VPS 40** (48GB RAM) → fits ~14-15 XL sites
- Cost: **€14-25/month**

**Total Option B (conservative):** €42-53/month for ~40 sites

---

### Option C: Gradual Scaling Architecture (Most Practical)

#### Phase 1 - Start
| VPS | Sites | Plan | RAM | Cost |
|-----|-------|------|-----|------|
| VPS-1 (Mixed) | 15 XS + 5 M + 3 XL | Cloud VPS 40 | 48GB | €25 |
| **Total** | **23 sites** | | | **€25/month** |

#### Phase 2 - Growth  
| VPS | Sites | Plan | RAM | Cost |
|-----|-------|------|-----|------|
| VPS-1 (XS) | 25 XS | Cloud VPS 30 | 24GB | €14 |
| VPS-2 (M+XL) | 10 M + 5 XL | Cloud VPS 40 | 48GB | €25 |
| **Total** | **40 sites** | | | **€39/month** |

#### Phase 3 - Full Scale
| VPS | Sites | Plan | RAM | Cost |
|-----|-------|------|-----|------|
| VPS-1 (XS) | 30 XS | Cloud VPS 30 | 24GB | €14 |
| VPS-2 (M) | 15 M | Cloud VPS 30 | 24GB | €14 |
| VPS-3 (XL) | 10 XL | Cloud VPS 40 | 48GB | €25 |
| **Total** | **55 sites** | | | **€53/month** |

---

## Storage Considerations

Each WordPress site typically uses:
- XS: 2-5GB (themes, plugins, small media)
- M: 5-15GB (blog posts, images)
- XL: 15-50GB (products, galleries, backups)

**Maximum estimate for 55 sites:**
- 30 XS × 5GB = 150GB
- 15 M × 15GB = 225GB
- 10 XL × 50GB = 500GB
- **Total: ~875GB**

You may need additional storage VPS or object storage for backups.

---

## My Recommendation

### Start With: Cloud VPS 40 (€25/month)
- 12 vCPU, 48GB RAM, 250GB NVMe
- Can comfortably run: **~20 XS + 8 M + 5 XL = 33 sites**
- Room to grow before needing second VPS

### Scale To: 2× Cloud VPS 30 (€28/month)
When you hit ~35 sites, split into:
- VPS-1: XS sites only (24GB fits ~30 XS)
- VPS-2: M + XL sites (24GB fits ~10 M + 5 XL)

### Full Dream Setup: 3 VPS (€53/month)
- VPS-1 (Cloud VPS 30): 30 XS sites
- VPS-2 (Cloud VPS 30): 15 M sites  
- VPS-3 (Cloud VPS 40): 10 XL sites

---

## Important Notes

1. **Memory reservations matter more than limits** - Docker will use reserved memory as baseline
2. **CPU is shared** - Contabo may have noisy neighbors; XL e-commerce sites benefit from VDS if issues arise
3. **Bitnami images** - If switching to official WordPress images, expect ~10-15% less memory overhead
4. **Traefik** - Single Traefik instance per VPS (~200-300MB RAM)
5. **Backups** - Consider Contabo Object Storage (€2.49/250GB) for offsite backups
6. **Database pooling** - For M/XL sites, consider separate MariaDB container serving multiple WP instances

---

## Cost Summary

| Scenario | Sites | Monthly Cost | Cost per Site |
|----------|-------|--------------|---------------|
| Minimum viable | 28 | €25 | €0.89 |
| Medium scale | 40 | €39 | €0.97 |
| Full dream | 55 | €53 | €0.96 |

**Your dream of 55 sites would cost approximately €53/month (~€0.96/site)**
