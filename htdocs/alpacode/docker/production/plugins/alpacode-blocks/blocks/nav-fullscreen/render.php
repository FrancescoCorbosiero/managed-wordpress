<?php
/**
 * Navigation Fullscreen Block - Standalone Overlay Menu
 *
 * A dramatic fullscreen navigation overlay that can be triggered
 * from any element. Perfect for use with WordPress native headers.
 */

defined('ABSPATH') || exit;

// Extract attributes
$menu_items = $attributes['menuItems'] ?? [];
$trigger_id = esc_attr($attributes['triggerId'] ?? 'nav-trigger');
$cta_text = esc_html($attributes['ctaText'] ?? 'Inizia un Progetto');
$cta_url = esc_url($attributes['ctaUrl'] ?? '#contact');
$color_scheme = esc_attr($attributes['colorScheme'] ?? 'dark');
$accent_color = esc_attr($attributes['accentColor'] ?? '#6366f1');
$show_social = $attributes['showSocialLinks'] ?? true;
$social_links = $attributes['socialLinks'] ?? [];
$footer_text = esc_html($attributes['footerText'] ?? '');
$enable_cursor = $attributes['enableCursorEffect'] ?? true;
$enable_numbering = $attributes['enableNumbering'] ?? true;
$animation_style = esc_attr($attributes['animationStyle'] ?? 'stagger');

// Build CSS classes
$classes = array('alpacode-nav-fullscreen');
$classes[] = 'alpacode-nav-fullscreen--' . $color_scheme;
$classes[] = 'alpacode-nav-fullscreen--anim-' . $animation_style;

// Convert accent color to RGB
$accent_rgb = sscanf($accent_color, "#%02x%02x%02x");
$accent_rgb_string = $accent_rgb ? implode(',', $accent_rgb) : '99, 102, 241';

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'id' => 'alpacode-nav-fullscreen',
    'data-trigger' => $trigger_id,
    'data-cursor-effect' => $enable_cursor ? 'true' : 'false',
    'aria-hidden' => 'true',
    'role' => 'dialog',
    'aria-modal' => 'true',
    'aria-label' => 'Navigation menu',
    'style' => '--nav-accent: ' . $accent_color . '; --nav-accent-rgb: ' . $accent_rgb_string . ';',
));

// Social icons
$social_icons = array(
    'linkedin' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    'twitter' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    'instagram' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    'github' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    'facebook' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    'youtube' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
);

$active_socials = array_filter($social_links, function($social) {
    return !empty($social['url']);
});
?>

<!-- Fullscreen Navigation Overlay -->
<div <?php echo $wrapper_attributes; ?>>
    <!-- Background layers -->
    <div class="alpacode-nav-fullscreen__bg">
        <div class="alpacode-nav-fullscreen__bg-slide"></div>
        <div class="alpacode-nav-fullscreen__bg-gradient"></div>
        <div class="alpacode-nav-fullscreen__bg-grid"></div>
        <div class="alpacode-nav-fullscreen__bg-noise"></div>
    </div>

    <!-- Cursor follower -->
    <?php if ($enable_cursor): ?>
    <div class="alpacode-nav-fullscreen__cursor"></div>
    <?php endif; ?>

    <!-- Close button -->
    <button class="alpacode-nav-fullscreen__close" aria-label="Close menu">
        <span class="alpacode-nav-fullscreen__close-icon">
            <span></span>
            <span></span>
        </span>
        <span class="alpacode-nav-fullscreen__close-text">Chiudi</span>
    </button>

    <!-- Main content area -->
    <div class="alpacode-nav-fullscreen__container">
        <!-- Left: Navigation -->
        <div class="alpacode-nav-fullscreen__main">
            <nav class="alpacode-nav-fullscreen__menu" aria-label="Main navigation">
                <?php foreach ($menu_items as $index => $item):
                    $label = esc_html($item['label'] ?? '');
                    $url = esc_url($item['url'] ?? '#');
                    $description = esc_html($item['description'] ?? '');
                    $children = $item['children'] ?? [];
                    $has_children = !empty($children);
                    $item_num = str_pad($index + 1, 2, '0', STR_PAD_LEFT);
                ?>
                <div class="alpacode-nav-fullscreen__item <?php echo $has_children ? 'has-children' : ''; ?>"
                     data-index="<?php echo $index; ?>"
                     style="--item-index: <?php echo $index; ?>">

                    <a href="<?php echo $url; ?>"
                       class="alpacode-nav-fullscreen__link"
                       <?php if ($has_children): ?>aria-expanded="false"<?php endif; ?>>
                        <?php if ($enable_numbering): ?>
                        <span class="alpacode-nav-fullscreen__link-num"><?php echo $item_num; ?></span>
                        <?php endif; ?>
                        <span class="alpacode-nav-fullscreen__link-text">
                            <span class="alpacode-nav-fullscreen__link-text-main" data-text="<?php echo $label; ?>"><?php echo $label; ?></span>
                            <?php if (!empty($description)): ?>
                            <span class="alpacode-nav-fullscreen__link-text-desc"><?php echo $description; ?></span>
                            <?php endif; ?>
                        </span>
                        <?php if ($has_children): ?>
                        <span class="alpacode-nav-fullscreen__link-arrow">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 5v14M5 12h14"/>
                            </svg>
                        </span>
                        <?php endif; ?>
                    </a>

                    <?php if ($has_children): ?>
                    <div class="alpacode-nav-fullscreen__submenu">
                        <div class="alpacode-nav-fullscreen__submenu-inner">
                            <?php foreach ($children as $child_index => $child):
                                $child_label = esc_html($child['label'] ?? '');
                                $child_url = esc_url($child['url'] ?? '#');
                                $child_desc = esc_html($child['description'] ?? '');
                            ?>
                            <a href="<?php echo $child_url; ?>"
                               class="alpacode-nav-fullscreen__submenu-link"
                               style="--child-index: <?php echo $child_index; ?>">
                                <span class="alpacode-nav-fullscreen__submenu-link-dot"></span>
                                <span class="alpacode-nav-fullscreen__submenu-link-content">
                                    <span class="alpacode-nav-fullscreen__submenu-link-label"><?php echo $child_label; ?></span>
                                    <?php if (!empty($child_desc)): ?>
                                    <span class="alpacode-nav-fullscreen__submenu-link-desc"><?php echo $child_desc; ?></span>
                                    <?php endif; ?>
                                </span>
                                <span class="alpacode-nav-fullscreen__submenu-link-arrow">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                                    </svg>
                                </span>
                            </a>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <?php endif; ?>
                </div>
                <?php endforeach; ?>
            </nav>
        </div>

        <!-- Right: Sidebar with CTA -->
        <div class="alpacode-nav-fullscreen__sidebar">
            <div class="alpacode-nav-fullscreen__sidebar-content">
                <!-- Visual element -->
                <div class="alpacode-nav-fullscreen__sidebar-visual">
                    <div class="alpacode-nav-fullscreen__sidebar-shape alpacode-nav-fullscreen__sidebar-shape--1"></div>
                    <div class="alpacode-nav-fullscreen__sidebar-shape alpacode-nav-fullscreen__sidebar-shape--2"></div>
                    <div class="alpacode-nav-fullscreen__sidebar-shape alpacode-nav-fullscreen__sidebar-shape--3"></div>
                </div>

                <!-- CTA -->
                <?php if (!empty($cta_text)): ?>
                <div class="alpacode-nav-fullscreen__cta">
                    <p class="alpacode-nav-fullscreen__cta-label">Pronto a iniziare?</p>
                    <a href="<?php echo $cta_url; ?>" class="alpacode-nav-fullscreen__cta-button" data-alpacode-magnetic data-alpacode-ripple>
                        <span><?php echo $cta_text; ?></span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="alpacode-nav-fullscreen__footer">
        <?php if ($show_social && !empty($active_socials)): ?>
        <div class="alpacode-nav-fullscreen__socials">
            <?php foreach ($active_socials as $social):
                $platform = esc_attr($social['platform'] ?? '');
                $url = esc_url($social['url'] ?? '');
                if (empty($platform) || empty($url) || !isset($social_icons[$platform])) continue;
            ?>
            <a href="<?php echo $url; ?>"
               target="_blank"
               rel="noopener noreferrer"
               class="alpacode-nav-fullscreen__social"
               aria-label="<?php echo ucfirst($platform); ?>"
               data-alpacode-magnetic>
                <?php echo $social_icons[$platform]; ?>
            </a>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>

        <?php if (!empty($footer_text)): ?>
        <div class="alpacode-nav-fullscreen__copyright"><?php echo $footer_text; ?></div>
        <?php endif; ?>
    </div>
</div>

<!-- Trigger Helper: Add this data attribute to any element to trigger the menu -->
<!-- Example: <button data-nav-trigger="nav-trigger">Menu</button> -->
