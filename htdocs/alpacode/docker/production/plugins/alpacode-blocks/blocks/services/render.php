<?php
/**
 * Services Block - Premium Server Side Render
 */

defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? '');
$subheading = esc_html($attributes['subheading'] ?? '');
$services = $attributes['services'] ?? array();
$columns = intval($attributes['columns'] ?? 3);
$enable_tilt = $attributes['enableTilt'] ?? true;
$enable_stagger = $attributes['enableStagger'] ?? true;
$card_style = esc_attr($attributes['cardStyle'] ?? 'default');

// Extended icon set
$icons = array(
    'code' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    'server' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>',
    'lightbulb' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2z"></path></svg>',
    'shield' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>',
    'zap' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    'users' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    'globe' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
    'database' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
    'cloud' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
    'terminal' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>',
    'layers' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
    'settings' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
);

$classes = array('alpacode-services');
$classes[] = 'alpacode-services--style-' . $card_style;
$classes[] = 'alpacode-services--cols-' . $columns;

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
));

$grid_attrs = array();
if ($enable_stagger) {
    $grid_attrs[] = 'data-alpacode-stagger="0.1"';
}
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-services__container">
        <!-- Header -->
        <?php if ($eyebrow || $heading || $subheading) : ?>
            <div class="alpacode-services__header" data-alpacode-animate="fade-up">
                <?php if ($eyebrow) : ?>
                    <span class="alpacode-services__eyebrow"><?php echo $eyebrow; ?></span>
                <?php endif; ?>
                <?php if ($heading) : ?>
                    <h2 class="alpacode-services__heading"><?php echo $heading; ?></h2>
                <?php endif; ?>
                <?php if ($subheading) : ?>
                    <p class="alpacode-services__subheading"><?php echo $subheading; ?></p>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <!-- Services Grid -->
        <?php if (!empty($services)) : ?>
            <div class="alpacode-services__grid" <?php echo implode(' ', $grid_attrs); ?>>
                <?php foreach ($services as $index => $service) :
                    $icon_key = $service['icon'] ?? 'code';
                    $icon_svg = $icons[$icon_key] ?? $icons['code'];
                    $card_attrs = array();
                    if ($enable_tilt) {
                        $card_attrs[] = 'data-alpacode-tilt';
                        $card_attrs[] = 'data-tilt-max="8"';
                        $card_attrs[] = 'data-tilt-scale="1.02"';
                    }
                ?>
                    <article class="alpacode-services__card" <?php echo implode(' ', $card_attrs); ?>>
                        <div class="alpacode-services__card-inner">
                            <!-- Icon with glow effect -->
                            <div class="alpacode-services__icon-wrapper">
                                <div class="alpacode-services__icon">
                                    <?php echo $icon_svg; ?>
                                </div>
                                <div class="alpacode-services__icon-glow"></div>
                            </div>

                            <!-- Content -->
                            <h3 class="alpacode-services__title"><?php echo esc_html($service['title'] ?? ''); ?></h3>
                            <p class="alpacode-services__description"><?php echo esc_html($service['description'] ?? ''); ?></p>

                            <!-- Hover arrow -->
                            <div class="alpacode-services__arrow">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </div>
                        </div>

                        <!-- Gradient border effect -->
                        <div class="alpacode-services__card-border"></div>
                    </article>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
