<?php
/**
 * Feature Highlights Block - Server-side render
 */

$heading = esc_html($attributes['heading'] ?? '');
$features = $attributes['features'] ?? array();
$columns = intval($attributes['columns'] ?? 4);
$layout = esc_attr($attributes['layout'] ?? 'grid');
$icon_style = esc_attr($attributes['iconStyle'] ?? 'filled');

$classes = array('ss-block', 'ss-feature-highlights');
$classes[] = 'ss-feature-highlights--' . $layout;
$classes[] = 'ss-feature-highlights--icons-' . $icon_style;

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
));

// Icon SVGs
$icons = array(
    'comfort' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
    'durability' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>',
    'lightweight' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>',
    'style' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
    'breathable' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
    'traction' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/></svg>',
    'support' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
    'waterproof' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z"/></svg>',
);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="ss-container">
        <?php if ($heading) : ?>
            <h2 class="ss-heading ss-heading--3 ss-feature-highlights__heading"><?php echo $heading; ?></h2>
        <?php endif; ?>

        <div class="ss-grid ss-grid--<?php echo $columns; ?> ss-feature-highlights__grid" data-ss-stagger>
            <?php foreach ($features as $index => $feature) : ?>
                <?php
                $icon_key = esc_attr($feature['icon'] ?? 'style');
                $title = esc_html($feature['title'] ?? '');
                $description = esc_html($feature['description'] ?? '');
                $icon_svg = $icons[$icon_key] ?? $icons['style'];
                ?>
                <div class="ss-feature-highlights__item" data-ss-animate>
                    <div class="ss-feature-highlights__icon">
                        <?php echo $icon_svg; ?>
                    </div>
                    <?php if ($title) : ?>
                        <h3 class="ss-heading ss-heading--5 ss-feature-highlights__title"><?php echo $title; ?></h3>
                    <?php endif; ?>
                    <?php if ($description) : ?>
                        <p class="ss-text ss-text--sm ss-feature-highlights__description"><?php echo $description; ?></p>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
