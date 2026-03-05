# Golden Hive - Product Slider Shortcodes Reference

> All available shortcodes and snippet examples for product carousels.
> Plugin: `golden-hive-blocks` | Shortcode file: `includes/product-carousel-shortcode.php`

---

## Main Shortcodes

| Shortcode | Alias | Description |
|-----------|-------|-------------|
| `[carousel_section]` | `[product_carousel]` | Full-featured product carousel with all options |
| `[bestsellers]` | — | Quick best sellers carousel |
| `[new_arrivals]` | — | Quick new arrivals carousel |
| `[on_sale]` | — | Quick sale products carousel |
| `[featured_products]` | — | Quick featured products with coverflow effect |
| `[carousel_presets]` | — | Shows preset gallery (demo purposes) |

---

## All Available Options for `[carousel_section]`

### Section Styling
| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `style` | `default` \| `dark` \| `minimal` | `default` | Section theme |
| `header_align` | `left` \| `center` | `left` | Title/subtitle alignment |
| `title_size` | `sm` \| `md` \| `lg` \| `xl` \| `xxl` | _(default)_ | Title font size |
| `subtitle_size` | `sm` \| `md` \| `lg` | _(default)_ | Subtitle font size |
| `title` | any text | `Prodotti` | Section title |
| `subtitle` | any text | _(empty)_ | Section subtitle |
| `link` | URL | `/shop` | "View All" link URL |
| `link_text` | any text | `Vedi Tutti` | "View All" link text |

### Navigation Options
| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `nav_style` | `bottom` \| `sides` \| `top-right` \| `integrated` \| `none` | `bottom` | Arrow placement style |
| `nav_shape` | `circle` \| `square` \| `pill` | `circle` | Arrow button shape |
| `nav_size` | `sm` \| `md` \| `lg` | `md` | Arrow button size |
| `show_nav` | `true` \| `false` | `true` | Show/hide navigation arrows |

### Pagination Options
| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `pagination` | `dots` \| `fraction` \| `progressbar` \| `none` | `dots` | Pagination type |
| `dots_style` | `default` \| `line` \| `dash` \| `dynamic` | `default` | Dot shape variant |

### Slider Effects
| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `effect` | `slide` \| `fade` \| `coverflow` | `slide` | Transition effect |

### Card Styles
| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `card_style` | `default` \| `minimal` \| `overlay` \| `detailed` \| `horizontal` | `default` | Card visual style |
| `card_hover` | `lift` \| `zoom` \| `glow` \| `border` \| `none` | `lift` | Hover animation |
| `card_radius` | `none` \| `sm` \| `md` \| `lg` \| `xl` | `md` | Border radius |
| `card_text` | `default` \| `centered` | `default` | Text alignment (centered = bigger text) |

### Layout Options
| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `layout` | `standard` \| `centered` \| `peek` \| `full-width` | `standard` | Carousel layout mode |
| `columns` | `2`-`6` | `5` | Desktop visible slides |
| `columns_tablet` | `2`-`4` | `3` | Tablet visible slides |
| `columns_mobile` | `1`-`2` | `2` | Mobile visible slides |
| `gap` | `none` \| `sm` \| `md` \| `lg` \| `xl` | `md` | Space between slides |
| `rows` | `1` \| `2` | `1` | Multi-row grid |

### Behavior Options
| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `autoplay` | `true` \| `false` | `false` | Auto-advance slides |
| `speed` | ms (e.g. `3000`, `5000`) | `4000` | Autoplay delay in ms |
| `loop` | `true` \| `false` | `true` | Infinite loop |
| `free_mode` | `true` \| `false` | `false` | Momentum scrolling |
| `mousewheel` | `true` \| `false` | `false` | Scroll with mousewheel |
| `keyboard` | `true` \| `false` | `true` | Keyboard navigation |
| `grab_cursor` | `true` \| `false` | `true` | Grab cursor on hover |
| `autoplay_bar` | `true` \| `false` | `false` | Show autoplay progress bar |

### Product Query Options
| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `type` | `recent` \| `best_selling` \| `featured` \| `sale` \| `top_rated` | `recent` | Product query type |
| `limit` | number | `8` | Max products to show |
| `category` | slug(s) | _(empty)_ | Filter by category slug(s), comma-separated |
| `tag` | slug(s) | _(empty)_ | Filter by tag slug(s) |
| `brand` | slug(s) | _(empty)_ | Filter by brand slug(s) |
| `ids` | ID(s) | _(empty)_ | Specific product IDs, comma-separated |

### Card Content Options
| Option | Values | Default | Description |
|--------|--------|---------|-------------|
| `show_brand` | `true` \| `false` | `true` | Show brand name |
| `show_sizes` | `true` \| `false` | `false` | Show available sizes |
| `show_badges` | `true` \| `false` | `true` | Show sale/new/featured badges |
| `show_rating` | `true` \| `false` | `false` | Show star rating |
| `show_cart_btn` | `true` \| `false` | `false` | Show add-to-cart button |
| `show_discount` | `true` \| `false` | `true` | Show discount percentage tag |

---

## Ready-to-Use Snippet Examples

### 1. Homepage - Best Sellers (Classic)
```
[carousel_section title="Best Sellers" type="best_selling" limit="8" nav_style="bottom" pagination="dots" card_style="default" card_hover="lift"]
```

### 2. Homepage - New Arrivals (Modern Top-Right Nav)
```
[carousel_section title="Nuovi Arrivi" subtitle="Le ultime novita" type="recent" limit="10" nav_style="top-right" pagination="fraction" card_style="minimal" card_hover="zoom"]
```

### 3. Homepage - Featured Products (Coverflow Showcase)
```
[carousel_section title="In Evidenza" type="featured" limit="8" effect="coverflow" nav_style="sides" layout="centered" card_radius="lg"]
```

### 4. Homepage - On Sale (Dark Theme with Overlay Cards)
```
[carousel_section title="Saldi" subtitle="Fino al 50% di sconto" type="sale" limit="12" style="dark" card_style="overlay" nav_style="sides" card_radius="lg" pagination="progressbar"]
```

### 5. Category Page - Nike Products
```
[carousel_section title="Nike" brand="nike" limit="8" card_style="minimal" nav_style="top-right" pagination="fraction" show_brand="false"]
```

### 6. Category Page - Sneakers Only
```
[carousel_section title="Sneakers" category="sneakers" limit="12" card_hover="zoom" show_sizes="true" nav_style="bottom"]
```

### 7. Category Page - Multi-Brand Slider
```
[carousel_section title="Jordan & Nike" brand="jordan,nike" limit="10" style="dark" card_style="overlay" card_radius="xl"]
```

### 8. Product Page - Related (Minimal Inline)
```
[carousel_section title="Ti potrebbe piacere" type="recent" limit="6" style="minimal" card_style="minimal" nav_style="none" pagination="none" gap="sm" columns="4"]
```

### 9. Full Grid View (2 Rows)
```
[carousel_section title="Tutti i Prodotti" type="recent" limit="16" rows="2" columns="4" columns_tablet="3" columns_mobile="2" card_style="detailed" pagination="none" show_rating="true"]
```

### 10. Editorial / Horizontal Cards
```
[carousel_section title="In Primo Piano" type="featured" limit="6" card_style="horizontal" columns="2" columns_tablet="1" columns_mobile="1" gap="lg" card_hover="border"]
```

### 11. Autoplay with Progress Bar
```
[carousel_section title="Highlights" type="featured" limit="8" autoplay="true" speed="5000" autoplay_bar="true" nav_style="integrated" pagination="dots" dots_style="line"]
```

### 12. Free Scroll / Browse Mode
```
[carousel_section title="Sfoglia" type="recent" limit="16" free_mode="true" mousewheel="true" pagination="none" nav_style="none" gap="sm" columns="6" columns_tablet="4" columns_mobile="2"]
```

### 13. Centered Header with Subtitle
```
[carousel_section title="La Nostra Collezione" subtitle="Scopri i modelli piu esclusivi" header_align="center" type="featured" limit="8" nav_style="bottom" card_style="default" card_text="centered"]
```

### 14. Large Title, Dark Luxury
```
[carousel_section title="Exclusive Drops" title_size="xxl" style="dark" type="featured" limit="6" nav_style="sides" nav_shape="pill" nav_size="lg" card_style="overlay" card_radius="xl" pagination="none"]
```

### 15. Peek Layout (Visible Overflow)
```
[carousel_section title="Scopri" type="recent" limit="10" layout="peek" card_style="minimal" card_hover="zoom" nav_style="bottom" nav_shape="pill"]
```

### 16. Full-Width Immersive
```
[carousel_section title="Collezione Completa" type="recent" limit="12" layout="full-width" columns="6" columns_tablet="4" columns_mobile="2" gap="sm" card_style="minimal" card_hover="zoom" pagination="progressbar"]
```

### 17. Specific Products by ID
```
[carousel_section title="Selezionati per Te" ids="123,456,789,101" card_style="detailed" show_rating="true" show_sizes="true" nav_style="top-right"]
```

### 18. Tag-Based Filtering
```
[carousel_section title="Trending" tag="trending,hot" limit="8" style="default" card_hover="glow" nav_style="bottom" pagination="dots" dots_style="dynamic"]
```

### 19. Top Rated Products
```
[carousel_section title="I Piu Votati" type="top_rated" limit="8" show_rating="true" card_style="detailed" nav_style="integrated" pagination="dots"]
```

### 20. With Add to Cart Button
```
[carousel_section title="Acquista Ora" type="recent" limit="8" show_cart_btn="true" card_style="default" nav_style="bottom"]
```

---

## Quick Shortcodes

### Best Sellers
```
[bestsellers]
[bestsellers limit="12" title="Top Vendite" style="dark"]
```

### New Arrivals
```
[new_arrivals]
[new_arrivals limit="10" title="Appena Arrivati"]
```

### On Sale
```
[on_sale]
[on_sale limit="12" title="Offerte" style="minimal"]
```

### Featured Products
```
[featured_products]
[featured_products limit="6" title="Da Non Perdere" effect="slide"]
```

### Preset Gallery (Demo)
```
[carousel_presets]
[carousel_presets show="classic"]
[carousel_presets show="modern"]
[carousel_presets show="dark_luxury"]
[carousel_presets show="showcase"]
[carousel_presets show="grid"]
[carousel_presets show="editorial"]
```

---

## Combining with Gutenberg Shortcode Wrapper Block

Use the `golden-hive/shortcode-wrapper` block in the editor to embed any of the above shortcodes with section styling:

```
Block: Shortcode Wrapper
  - Eyebrow: "Collection"
  - Title: "Best Sellers"
  - Shortcode: [carousel_section type="best_selling" limit="8"]
  - Background: white | gray | black
```

---

## Notes

- All shortcodes require **WooCommerce** to be active
- Brand filtering supports: `pa_brand`, `pwb-brand`, `product_brand` taxonomies
- Size display supports: `pa_misura`, `pa_size`, `pa_taglia` attributes
- Cards are wrapped in `<a>` tags linking to product pages
- The `show_cart_btn="true"` option adds an AJAX add-to-cart button with modal support for variable products
- CSS uses `--ghb-accent: #721124` (Golden Hive burgundy) as the accent color
