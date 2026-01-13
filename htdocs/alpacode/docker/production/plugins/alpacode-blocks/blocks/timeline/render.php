<?php
/**
 * Timeline Block - Premium Server Side Render
 */

defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? '');
$description = esc_html($attributes['description'] ?? '');
$items = $attributes['items'] ?? array();
$layout = esc_attr($attributes['layout'] ?? 'vertical');
$show_numbers = $attributes['showNumbers'] ?? true;
$show_icons = $attributes['showIcons'] ?? true;
$enable_scroll_progress = $attributes['enableScrollProgress'] ?? true;
$line_style = esc_attr($attributes['lineStyle'] ?? 'solid');

$classes = array('alpacode-timeline');
$classes[] = 'alpacode-timeline--' . $layout;
$classes[] = 'alpacode-timeline--line-' . $line_style;

if ($enable_scroll_progress) {
    $classes[] = 'alpacode-timeline--scroll-progress';
}

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'data-scroll-progress' => $enable_scroll_progress ? 'true' : 'false',
));

// Icon SVGs
$icons = array(
    'search' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
    'lightbulb' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A5.5 5.5 0 1 0 6 11.5c0 1.45.55 2.77 1.45 3.77.35.38.65.77.85 1.23.2.46.2.97.2 1.5h6c0-.53 0-1.04.2-1.5.2-.46.5-.85.85-1.23.37-.4.7-.84.95-1.27z"/></svg>',
    'palette' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="8" cy="18" r="2.5"/><circle cx="17" cy="15.5" r="2.5"/><path d="M21 12a9 9 0 1 1-9-9c4.97 0 9 3.58 9 8 0 2.21-1.79 4-4 4h-1.5a1.5 1.5 0 1 0 0 3c.83 0 1.5.67 1.5 1.5 0 1.93-1.57 3.5-3.5 3.5"/></svg>',
    'code' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>',
    'rocket' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
    'check' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg>',
    'star' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>',
    'heart' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    'flag' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    'target' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    'users' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'zap' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>',
);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-timeline__container">
        <!-- Header -->
        <?php if ($eyebrow || $heading || $description) : ?>
            <div class="alpacode-timeline__header" data-alpacode-animate="fade-up">
                <?php if ($eyebrow) : ?>
                    <span class="alpacode-timeline__eyebrow"><?php echo $eyebrow; ?></span>
                <?php endif; ?>
                <?php if ($heading) : ?>
                    <h2 class="alpacode-timeline__heading"><?php echo $heading; ?></h2>
                <?php endif; ?>
                <?php if ($description) : ?>
                    <p class="alpacode-timeline__description"><?php echo $description; ?></p>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <!-- Timeline -->
        <?php if (!empty($items)) : ?>
            <div class="alpacode-timeline__track">
                <!-- Progress Line -->
                <div class="alpacode-timeline__line">
                    <div class="alpacode-timeline__line-bg"></div>
                    <div class="alpacode-timeline__line-progress"></div>
                </div>

                <!-- Items -->
                <div class="alpacode-timeline__items">
                    <?php foreach ($items as $index => $item) :
                        $title = esc_html($item['title'] ?? '');
                        $item_description = esc_html($item['description'] ?? '');
                        $icon = esc_attr($item['icon'] ?? 'check');
                        $year = esc_html($item['year'] ?? '');
                        $icon_svg = isset($icons[$icon]) ? $icons[$icon] : $icons['check'];
                    ?>
                        <div class="alpacode-timeline__item" data-index="<?php echo $index; ?>">
                            <!-- Marker -->
                            <div class="alpacode-timeline__marker">
                                <div class="alpacode-timeline__marker-dot">
                                    <?php if ($show_numbers) : ?>
                                        <span class="alpacode-timeline__marker-number"><?php echo $index + 1; ?></span>
                                    <?php elseif ($show_icons) : ?>
                                        <span class="alpacode-timeline__marker-icon"><?php echo $icon_svg; ?></span>
                                    <?php endif; ?>
                                </div>
                                <div class="alpacode-timeline__marker-ring"></div>
                            </div>

                            <!-- Content -->
                            <div class="alpacode-timeline__content">
                                <?php if ($year) : ?>
                                    <span class="alpacode-timeline__year"><?php echo $year; ?></span>
                                <?php endif; ?>

                                <?php if ($show_icons && $show_numbers) : ?>
                                    <div class="alpacode-timeline__icon">
                                        <?php echo $icon_svg; ?>
                                    </div>
                                <?php endif; ?>

                                <?php if ($title) : ?>
                                    <h3 class="alpacode-timeline__title"><?php echo $title; ?></h3>
                                <?php endif; ?>

                                <?php if ($item_description) : ?>
                                    <p class="alpacode-timeline__text"><?php echo $item_description; ?></p>
                                <?php endif; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <!-- Background decoration -->
    <div class="alpacode-timeline__bg-decoration">
        <div class="alpacode-timeline__bg-gradient"></div>
    </div>
</section>
