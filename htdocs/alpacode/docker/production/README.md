# Alpacode WordPress Image

Custom WordPress Docker image with Frost theme, child theme, and custom blocks plugin pre-installed.

## Version: 0.0.1

## What's Included

- **Base**: `wordpress:6-php8.3-apache`
- **Theme**: Frost (v1.1.1) + frost-child
- **Plugin**: alpacode-blocks

## Build

```bash
# Build the image
docker build -t alpacode-wp:0.0.1 .

# Build with specific Frost version
docker build --build-arg FROST_VERSION=1.1.2 -t alpacode-wp:0.0.1 .
```

## Usage

Replace the image in your docker-compose.yml:

```yaml
services:
  wordpress:
    image: alpacode-wp:0.0.1  # Instead of wordpress:6-php8.3-apache
    # ... rest of config
```

## Development Workflow

### 1. Make Changes

Edit files in:
- `themes/frost-child/` - Child theme customizations
- `plugins/alpacode-blocks/` - Custom blocks

### 2. Build New Version

```bash
# Increment version
docker build -t alpacode-wp:0.0.2 .
```

### 3. Deploy

```bash
# Update docker-compose.yml with new version
# Then:
docker compose pull  # or just up if local image
docker compose up -d
```

### 4. Rollback (if needed)

```bash
# Revert to previous version in docker-compose.yml
docker compose up -d
```

## Directory Structure

```
alpacode-wordpress-image/
├── Dockerfile
├── README.md
├── themes/
│   └── frost-child/
│       ├── style.css
│       ├── theme.json
│       ├── functions.php
│       ├── patterns/
│       ├── parts/
│       └── templates/
└── plugins/
    └── alpacode-blocks/
        ├── alpacode-blocks.php
        └── blocks/
            └── hero/
                ├── block.json
                ├── render.php
                ├── style.css
                └── editor.js
```

## Child Theme (frost-child)

### theme.json

Design tokens defined:
- **Colors**: primary, secondary, accent, text-primary, text-secondary, text-muted, border, white
- **Fonts**: Cormorant Garamond (display), Space Mono (mono), System
- **Font Sizes**: xs, small, medium, large, xl, display
- **Spacing**: 10-60 scale

### Adding Patterns

Create files in `themes/frost-child/patterns/`:

```php
<?php
/**
 * Title: My Pattern
 * Slug: frost-child/my-pattern
 * Categories: alpacode
 */
?>
<!-- wp:group -->
<!-- Your block markup -->
<!-- /wp:group -->
```

## Custom Blocks (alpacode-blocks)

### Adding a New Block

1. Create directory: `plugins/alpacode-blocks/blocks/my-block/`
2. Add required files:
   - `block.json` - Block configuration
   - `render.php` - Server-side render
   - `style.css` - Frontend styles
   - `editor.js` - Editor script (optional, for controls)

### Block supports from theme.json

Blocks automatically inherit:
- Colors (background, text)
- Typography (fontSize)
- Spacing (padding, margin)

## Versioning

- `0.0.x` - Development/testing
- `0.x.0` - Feature additions
- `x.0.0` - Breaking changes

## Notes

- Frost parent theme is downloaded at build time (not in repo)
- Pin Frost version in Dockerfile for reproducibility
- All custom code is in this repo = version controlled
