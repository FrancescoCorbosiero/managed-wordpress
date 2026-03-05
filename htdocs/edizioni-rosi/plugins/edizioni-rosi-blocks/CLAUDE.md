# CLAUDE.md — Edizioni Rosi Blocks

> Persistent context file for LLM-assisted development (Claude Code, Cursor, etc.).

---

## 1. Plugin Overview

| Field | Value |
|---|---|
| **Plugin Name** | Edizioni Rosi Blocks |
| **Version** | 1.0.0 |
| **Type** | WordPress Gutenberg Block Plugin |
| **Text Domain** | edizioni-rosi-blocks |
| **Requires WP** | 6.4+ |
| **Requires PHP** | 8.0+ |

### Company

| Field | Value |
|---|---|
| **Nome** | Edizioni Rosi |
| **Tipo** | Casa editrice indipendente |
| **Sito** | https://edizionirosi.it |
| **Estetica** | Premium dark editorial — palette nero/oro |

---

## 2. Architecture

```
edizioni-rosi-blocks/
├── edizioni-rosi-blocks.php          Main plugin file (entry point)
├── style.css                          Frontend styles (design system + all blocks)
├── editor.css                         Gutenberg editor styles
├── CLAUDE.md                          This file
├── js/
│   └── animations.js                  Animation library (ScrollReveal, HeaderScroll, SmoothScroll)
└── blocks/                            Custom Gutenberg blocks
    ├── site-header/                   Header con logo e navigazione
    ├── book-grid/                     Container griglia libri (InnerBlocks)
    ├── book-card/                     Card singola libro (child of book-grid)
    ├── editor-grid/                   Container griglia autori (InnerBlocks)
    ├── editor-card/                   Card singola autore (child of editor-grid)
    └── contact-info/                  Sezione contatti con social
```

### Block Structure Pattern

Every block follows the same 4-file pattern:

```
blocks/{block-name}/
├── block.json              Block metadata, attributes, supports
├── editor.js               Gutenberg editor UI (vanilla wp.blocks)
├── editor.asset.php        Dependencies declaration
└── render.php              Server-side PHP rendering
```

- **No build step required** — plain JS using `wp.blocks`, `wp.element`, `wp.blockEditor`, `wp.components`
- All blocks use **server-side rendering** (`save: function() { return null; }` or InnerBlocks.Content)
- Block category: `edizioni-rosi` with `book-alt` icon

### Parent-Child Block Relationships

- `book-grid` → contains `book-card` (InnerBlocks)
- `editor-grid` → contains `editor-card` (InnerBlocks)

---

## 3. Design System

### Color Palette (CSS Variables)

| Variable | Value | Usage |
|---|---|---|
| `--er-color-void` | `#0a0a0a` | Page background |
| `--er-color-ink` | `#111111` | Card backgrounds |
| `--er-color-smoke` | `#1a1a1a` | Hover state |
| `--er-color-ash` | `#2a2a2a` | Borders, grid gaps |
| `--er-color-stone` | `#404040` | Gradient overlays |
| `--er-color-mist` | `#8a8a8a` | Secondary text |
| `--er-color-pearl` | `#e8e8e8` | Primary text |
| `--er-color-milk` | `#f5f5f5` | Hover text |
| `--er-color-gold` | `#c9a55c` | Accent color |

### Typography

- **Display**: `Playfair Display` (serif, italic for section titles)
- **Body**: `Instrument Sans` (sans-serif)
- Google Fonts loaded via plugin enqueue

### Header

- Pure white background (`#ffffff`)
- Sticky with scroll shadow
- Logo + horizontal navigation

---

## 4. Blocks Reference

### site-header
- **Attributes**: `logoUrl`, `siteName`, `navItems[]`
- **Default nav**: Libri, Autori, Contatti
- Active link detection via `$_SERVER['REQUEST_URI']`

### book-grid
- **Attributes**: `sectionTitle`
- Container with `.er-books` class
- Wraps `book-card` inner blocks

### book-card
- **Attributes**: `url`, `cover`, `author`, `title`
- Grid layout: cover | info | arrow
- Links open in new tab (`target="_blank"`)
- Staggered CSS animation on load

### editor-grid
- **Attributes**: `sectionTitle`
- Container with `.er-editors` class
- Wraps `editor-card` inner blocks

### editor-card
- **Attributes**: `url`, `photo`, `name`, `role`, `bio`
- Circular photo, name, role badge, bio text
- Optional link with arrow

### contact-info
- **Attributes**: `sectionTitle`, `email`, `phone`, `address`, `socialLinks[]`
- SVG icons inline (email, phone, map pin)
- Social platforms: instagram, facebook, twitter, linkedin, whatsapp

---

## 5. Development Notes

### Adding a New Block

1. Create folder under `blocks/{block-name}/`
2. Add `block.json` with `name: "edizioni-rosi/{block-name}"`
3. Add `render.php` for server-side output
4. Add `editor.js` using `wp.blocks.registerBlockType()`
5. Add `editor.asset.php` with dependencies array
6. Block is auto-registered by the main plugin file (glob scan)

### CSS Class Convention

- All classes prefixed with `er-` (Edizioni Rosi)
- BEM naming: `.er-block__element--modifier`
- Editor classes: `.er-editor-placeholder`, `.er-editor-block-label`

### Animation System

- CSS keyframe animations for staggered card reveals (`erBookIn`, `erFadeIn`)
- JS `HeaderScroll` for sticky header shadow
- Respects `prefers-reduced-motion`

### Security

- All output escaped: `esc_html()`, `esc_url()`, `esc_attr()`
- No user input processing (no forms in current blocks)

---

## 6. Old References

The `/old` directory contains legacy HTML/CSS files used as design reference:
- `header.html` — Header block markup reference
- `homepage.html` — Book grid with 10 book cards
- `footer.html` — Footer with developer credits
- `template.html` — Page template structure
- `main.css` — Complete CSS design system (source of truth for styles)
