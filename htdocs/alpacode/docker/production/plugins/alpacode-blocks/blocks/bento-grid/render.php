<?php
/**
 * Bento Grid Block - Premium Server Side Render
 */

defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? '');
$description = esc_html($attributes['description'] ?? '');
$items = $attributes['items'] ?? array();
$columns = intval($attributes['columns'] ?? 4);
$gap = intval($attributes['gap'] ?? 24);
$card_style = esc_attr($attributes['cardStyle'] ?? 'default');
$enable_hover_zoom = $attributes['enableHoverZoom'] ?? true;
$show_icons = $attributes['showIcons'] ?? true;
$icon_style = esc_attr($attributes['iconStyle'] ?? 'filled');

$classes = array('alpacode-bento-grid');
$classes[] = 'alpacode-bento-grid--cols-' . $columns;
$classes[] = 'alpacode-bento-grid--card-' . $card_style;
$classes[] = 'alpacode-bento-grid--icon-' . $icon_style;
if ($enable_hover_zoom) {
    $classes[] = 'alpacode-bento-grid--hover-zoom';
}

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'style' => '--bento-gap: ' . $gap . 'px;',
));

// Icon SVGs
$icons = array(
    'zap' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    'shield' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    'globe' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    'headphones' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
    'code' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    'rocket' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
    'layers' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    'cpu' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
    'database' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    'cloud' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
    'lock' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    'chart' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    'star' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    'users' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'settings' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-bento-grid__container">
        <!-- Header -->
        <?php if ($eyebrow || $heading || $description) : ?>
            <div class="alpacode-bento-grid__header" data-alpacode-animate="fade-up">
                <?php if ($eyebrow) : ?>
                    <span class="alpacode-bento-grid__eyebrow"><?php echo $eyebrow; ?></span>
                <?php endif; ?>
                <?php if ($heading) : ?>
                    <h2 class="alpacode-bento-grid__heading"><?php echo $heading; ?></h2>
                <?php endif; ?>
                <?php if ($description) : ?>
                    <p class="alpacode-bento-grid__description"><?php echo $description; ?></p>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <!-- Grid -->
        <?php if (!empty($items)) : ?>
            <div class="alpacode-bento-grid__grid" data-alpacode-stagger="0.1">
                <?php foreach ($items as $index => $item) :
                    $title = esc_html($item['title'] ?? '');
                    $item_description = esc_html($item['description'] ?? '');
                    $icon = esc_attr($item['icon'] ?? 'zap');
                    $size = esc_attr($item['size'] ?? 'medium');
                    $image = esc_url($item['image'] ?? '');
                    $link = esc_url($item['link'] ?? '');
                    $accent_color = esc_attr($item['accentColor'] ?? '');
                    $icon_svg = $icons[$icon] ?? $icons['zap'];

                    $item_classes = array('alpacode-bento-grid__item');
                    $item_classes[] = 'alpacode-bento-grid__item--' . $size;
                    if ($image) {
                        $item_classes[] = 'alpacode-bento-grid__item--has-image';
                    }

                    $item_style = '';
                    if ($accent_color) {
                        $item_style = '--bento-accent: ' . $accent_color . ';';
                    }
                ?>
                    <<?php echo $link ? 'a href="' . $link . '"' : 'div'; ?>
                        class="<?php echo implode(' ', $item_classes); ?>"
                        <?php echo $item_style ? 'style="' . $item_style . '"' : ''; ?>
                        <?php echo $link ? '' : ''; ?>
                    >
                        <!-- Background image -->
                        <?php if ($image) : ?>
                            <div class="alpacode-bento-grid__item-bg">
                                <img src="<?php echo $image; ?>" alt="<?php echo $title; ?>" loading="lazy" />
                            </div>
                        <?php endif; ?>

                        <!-- Content -->
                        <div class="alpacode-bento-grid__item-content">
                            <?php if ($show_icons && $icon_svg) : ?>
                                <div class="alpacode-bento-grid__item-icon">
                                    <?php echo $icon_svg; ?>
                                </div>
                            <?php endif; ?>

                            <?php if ($title) : ?>
                                <h3 class="alpacode-bento-grid__item-title"><?php echo $title; ?></h3>
                            <?php endif; ?>

                            <?php if ($item_description) : ?>
                                <p class="alpacode-bento-grid__item-description"><?php echo $item_description; ?></p>
                            <?php endif; ?>

                            <?php if ($link) : ?>
                                <span class="alpacode-bento-grid__item-arrow">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            <?php endif; ?>
                        </div>

                        <!-- Glow effect -->
                        <div class="alpacode-bento-grid__item-glow"></div>

                        <!-- Border gradient -->
                        <div class="alpacode-bento-grid__item-border"></div>
                    </<?php echo $link ? 'a' : 'div'; ?>>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>

    <!-- Background decoration -->
    <div class="alpacode-bento-grid__bg-decoration">
        <div class="alpacode-bento-grid__bg-gradient"></div>
    </div>
</section>
