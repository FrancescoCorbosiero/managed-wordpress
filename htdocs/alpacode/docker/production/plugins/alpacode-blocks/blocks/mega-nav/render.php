<?php
/**
 * Mega Navigation Block - Immersive Fullscreen Menu
 *
 * A stunning fullscreen navigation with dramatic animations,
 * staggered reveals, and premium UX interactions.
 */

defined('ABSPATH') || exit;

// Extract attributes
$logo_url = esc_url($attributes['logoUrl'] ?? '');
$logo_text = esc_html($attributes['logoText'] ?? 'ALPACODE');
$menu_items = $attributes['menuItems'] ?? [];
$cta_text = esc_html($attributes['ctaText'] ?? 'Inizia un Progetto');
$cta_url = esc_url($attributes['ctaUrl'] ?? '#contact');
$color_scheme = esc_attr($attributes['colorScheme'] ?? 'dark');
$accent_color = esc_attr($attributes['accentColor'] ?? '#6366f1');
$variant = esc_attr($attributes['variant'] ?? 'fullscreen');
$trigger_style = esc_attr($attributes['triggerStyle'] ?? 'hamburger');
$show_social = $attributes['showSocialLinks'] ?? true;
$social_links = $attributes['socialLinks'] ?? [];
$footer_text = esc_html($attributes['footerText'] ?? '');
$enable_cursor = $attributes['enableCursorEffect'] ?? true;
$position = esc_attr($attributes['position'] ?? 'fixed');

// Build CSS classes
$classes = array('alpacode-mega-nav');
$classes[] = 'alpacode-mega-nav--' . $color_scheme;
$classes[] = 'alpacode-mega-nav--' . $variant;
$classes[] = 'alpacode-mega-nav--trigger-' . $trigger_style;
$classes[] = 'alpacode-mega-nav--' . $position;

// Convert accent color to RGB
$accent_rgb = sscanf($accent_color, "#%02x%02x%02x");
$accent_rgb_string = implode(',', $accent_rgb);

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'data-color-scheme' => $color_scheme,
    'data-variant' => $variant,
    'data-cursor-effect' => $enable_cursor ? 'true' : 'false',
    'style' => '--nav-accent: ' . $accent_color . '; --nav-accent-rgb: ' . $accent_rgb_string . ';',
));

// Social icons SVG
$social_icons = array(
    'linkedin' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    'twitter' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    'instagram' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    'github' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    'facebook' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    'youtube' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
);

// Menu item icons
$menu_icons = array(
    'globe' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    'smartphone' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    'camera' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    'eye' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    'file-text' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    'mail' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    'default' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>',
);

// Filter active socials
$active_socials = array_filter($social_links, function($social) {
    return !empty($social['url']);
});
?>

<!-- Navigation Header Bar -->
<header <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-mega-nav__bar">
        <!-- Logo -->
        <a href="/" class="alpacode-mega-nav__logo" aria-label="Home">
            <?php if (!empty($logo_url)): ?>
                <img src="<?php echo $logo_url; ?>" alt="<?php echo $logo_text; ?>" class="alpacode-mega-nav__logo-img">
            <?php else: ?>
                <span class="alpacode-mega-nav__logo-text"><?php echo $logo_text; ?></span>
            <?php endif; ?>
        </a>

        <!-- Desktop Mini Links (visible on large screens) -->
        <nav class="alpacode-mega-nav__desktop-links" aria-label="Quick navigation">
            <?php foreach (array_slice($menu_items, 0, 4) as $item):
                $label = esc_html($item['label'] ?? '');
                $url = esc_url($item['url'] ?? '#');
            ?>
            <a href="<?php echo $url; ?>" class="alpacode-mega-nav__desktop-link"><?php echo $label; ?></a>
            <?php endforeach; ?>
        </nav>

        <!-- CTA Button (desktop) -->
        <?php if (!empty($cta_text)): ?>
        <a href="<?php echo $cta_url; ?>" class="alpacode-mega-nav__cta-mini" data-alpacode-magnetic data-alpacode-ripple>
            <?php echo $cta_text; ?>
        </a>
        <?php endif; ?>

        <!-- Menu Trigger Button -->
        <button class="alpacode-mega-nav__trigger" aria-label="Toggle menu" aria-expanded="false" data-alpacode-magnetic>
            <span class="alpacode-mega-nav__trigger-box">
                <span class="alpacode-mega-nav__trigger-line"></span>
                <span class="alpacode-mega-nav__trigger-line"></span>
                <span class="alpacode-mega-nav__trigger-line"></span>
            </span>
            <span class="alpacode-mega-nav__trigger-text">
                <span class="alpacode-mega-nav__trigger-text-open">Menu</span>
                <span class="alpacode-mega-nav__trigger-text-close">Close</span>
            </span>
        </button>
    </div>

    <!-- Fullscreen Menu Overlay -->
    <div class="alpacode-mega-nav__overlay" aria-hidden="true">
        <!-- Background effects -->
        <div class="alpacode-mega-nav__overlay-bg">
            <div class="alpacode-mega-nav__overlay-gradient"></div>
            <div class="alpacode-mega-nav__overlay-grid"></div>
            <div class="alpacode-mega-nav__overlay-noise"></div>
        </div>

        <!-- Cursor follower (if enabled) -->
        <?php if ($enable_cursor): ?>
        <div class="alpacode-mega-nav__cursor"></div>
        <?php endif; ?>

        <!-- Menu Content -->
        <div class="alpacode-mega-nav__content">
            <!-- Left Side: Main Navigation -->
            <div class="alpacode-mega-nav__main">
                <nav class="alpacode-mega-nav__menu" aria-label="Main navigation">
                    <?php foreach ($menu_items as $index => $item):
                        $label = esc_html($item['label'] ?? '');
                        $url = esc_url($item['url'] ?? '#');
                        $icon = esc_attr($item['icon'] ?? 'default');
                        $description = esc_html($item['description'] ?? '');
                        $children = $item['children'] ?? [];
                        $has_children = !empty($children);
                        $icon_svg = $menu_icons[$icon] ?? $menu_icons['default'];
                    ?>
                    <div class="alpacode-mega-nav__item <?php echo $has_children ? 'has-children' : ''; ?>"
                         data-index="<?php echo $index; ?>"
                         style="--item-index: <?php echo $index; ?>">

                        <a href="<?php echo $url; ?>"
                           class="alpacode-mega-nav__link"
                           <?php if ($has_children): ?>aria-expanded="false" aria-controls="submenu-<?php echo $index; ?>"<?php endif; ?>>
                            <span class="alpacode-mega-nav__link-index"><?php echo str_pad($index + 1, 2, '0', STR_PAD_LEFT); ?></span>
                            <span class="alpacode-mega-nav__link-text" data-text="<?php echo $label; ?>"><?php echo $label; ?></span>
                            <span class="alpacode-mega-nav__link-icon"><?php echo $icon_svg; ?></span>
                            <?php if ($has_children): ?>
                            <span class="alpacode-mega-nav__link-arrow">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M9 18l6-6-6-6"/>
                                </svg>
                            </span>
                            <?php endif; ?>
                        </a>

                        <?php if ($has_children): ?>
                        <div class="alpacode-mega-nav__submenu" id="submenu-<?php echo $index; ?>">
                            <div class="alpacode-mega-nav__submenu-inner">
                                <div class="alpacode-mega-nav__submenu-header">
                                    <span class="alpacode-mega-nav__submenu-title"><?php echo $label; ?></span>
                                    <?php if (!empty($description)): ?>
                                    <span class="alpacode-mega-nav__submenu-desc"><?php echo $description; ?></span>
                                    <?php endif; ?>
                                </div>
                                <div class="alpacode-mega-nav__submenu-items">
                                    <?php foreach ($children as $child_index => $child):
                                        $child_label = esc_html($child['label'] ?? '');
                                        $child_url = esc_url($child['url'] ?? '#');
                                        $child_desc = esc_html($child['description'] ?? '');
                                    ?>
                                    <a href="<?php echo $child_url; ?>"
                                       class="alpacode-mega-nav__submenu-link"
                                       style="--child-index: <?php echo $child_index; ?>">
                                        <span class="alpacode-mega-nav__submenu-link-marker"></span>
                                        <span class="alpacode-mega-nav__submenu-link-content">
                                            <span class="alpacode-mega-nav__submenu-link-text"><?php echo $child_label; ?></span>
                                            <?php if (!empty($child_desc)): ?>
                                            <span class="alpacode-mega-nav__submenu-link-desc"><?php echo $child_desc; ?></span>
                                            <?php endif; ?>
                                        </span>
                                        <span class="alpacode-mega-nav__submenu-link-arrow">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M7 17L17 7M17 7H7M17 7V17"/>
                                            </svg>
                                        </span>
                                    </a>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        </div>
                        <?php endif; ?>
                    </div>
                    <?php endforeach; ?>
                </nav>
            </div>

            <!-- Right Side: Preview & Info -->
            <div class="alpacode-mega-nav__sidebar">
                <!-- Dynamic Preview Area -->
                <div class="alpacode-mega-nav__preview">
                    <div class="alpacode-mega-nav__preview-content">
                        <div class="alpacode-mega-nav__preview-title">Esplora</div>
                        <div class="alpacode-mega-nav__preview-description">
                            Passa il mouse sulle voci per scoprire di più
                        </div>
                    </div>
                    <div class="alpacode-mega-nav__preview-visual">
                        <div class="alpacode-mega-nav__preview-shapes">
                            <div class="alpacode-mega-nav__preview-shape alpacode-mega-nav__preview-shape--1"></div>
                            <div class="alpacode-mega-nav__preview-shape alpacode-mega-nav__preview-shape--2"></div>
                            <div class="alpacode-mega-nav__preview-shape alpacode-mega-nav__preview-shape--3"></div>
                        </div>
                    </div>
                </div>

                <!-- CTA Section -->
                <?php if (!empty($cta_text)): ?>
                <div class="alpacode-mega-nav__sidebar-cta">
                    <p class="alpacode-mega-nav__sidebar-cta-text">Pronto a iniziare il tuo progetto?</p>
                    <a href="<?php echo $cta_url; ?>" class="alpacode-mega-nav__sidebar-cta-button" data-alpacode-magnetic data-alpacode-ripple>
                        <span><?php echo $cta_text; ?></span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                </div>
                <?php endif; ?>
            </div>
        </div>

        <!-- Menu Footer -->
        <div class="alpacode-mega-nav__footer">
            <?php if ($show_social && !empty($active_socials)): ?>
            <div class="alpacode-mega-nav__socials">
                <?php foreach ($active_socials as $social):
                    $platform = esc_attr($social['platform'] ?? '');
                    $url = esc_url($social['url'] ?? '');
                    if (empty($platform) || empty($url) || !isset($social_icons[$platform])) continue;
                ?>
                <a href="<?php echo $url; ?>"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="alpacode-mega-nav__social"
                   aria-label="<?php echo ucfirst($platform); ?>"
                   data-alpacode-magnetic>
                    <?php echo $social_icons[$platform]; ?>
                </a>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>

            <?php if (!empty($footer_text)): ?>
            <div class="alpacode-mega-nav__copyright">
                <?php echo $footer_text; ?>
            </div>
            <?php endif; ?>

            <div class="alpacode-mega-nav__scroll-hint">
                <span>Scroll to explore</span>
                <div class="alpacode-mega-nav__scroll-indicator">
                    <div class="alpacode-mega-nav__scroll-dot"></div>
                </div>
            </div>
        </div>
    </div>
</header>
