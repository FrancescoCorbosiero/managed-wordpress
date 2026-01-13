<?php
/**
 * Portfolio Block - Server Side Render
 */
defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? '');
$description = esc_html($attributes['description'] ?? '');
$projects = $attributes['projects'] ?? array();
$show_filters = $attributes['showFilters'] ?? true;
$columns = intval($attributes['columns'] ?? 3);
$gap = intval($attributes['gap'] ?? 24);
$card_style = esc_attr($attributes['cardStyle'] ?? 'default');
$aspect_ratio = esc_attr($attributes['aspectRatio'] ?? '4/3');
$show_description = $attributes['showDescription'] ?? true;
$hover_effect = esc_attr($attributes['hoverEffect'] ?? 'zoom');

// Get unique categories
$categories = array();
foreach ($projects as $project) {
    $cat = $project['category'] ?? '';
    if ($cat && !in_array($cat, $categories)) {
        $categories[] = $cat;
    }
}

$classes = array('alpacode-portfolio');
$classes[] = 'alpacode-portfolio--' . $card_style;
$classes[] = 'alpacode-portfolio--hover-' . $hover_effect;
$classes[] = 'alpacode-portfolio--cols-' . $columns;

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'style' => '--portfolio-gap: ' . $gap . 'px; --portfolio-aspect: ' . $aspect_ratio . ';',
));
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-portfolio__container">
        <!-- Header -->
        <?php if ($eyebrow || $heading || $description) : ?>
            <div class="alpacode-portfolio__header" data-alpacode-animate="fade-up">
                <?php if ($eyebrow) : ?>
                    <span class="alpacode-portfolio__eyebrow"><?php echo $eyebrow; ?></span>
                <?php endif; ?>
                <?php if ($heading) : ?>
                    <h2 class="alpacode-portfolio__heading"><?php echo $heading; ?></h2>
                <?php endif; ?>
                <?php if ($description) : ?>
                    <p class="alpacode-portfolio__description"><?php echo $description; ?></p>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <!-- Filters -->
        <?php if ($show_filters && !empty($categories)) : ?>
            <div class="alpacode-portfolio__filters" data-alpacode-animate="fade-up">
                <button class="alpacode-portfolio__filter alpacode-portfolio__filter--active" data-filter="all">
                    All
                </button>
                <?php foreach ($categories as $category) : ?>
                    <button class="alpacode-portfolio__filter" data-filter="<?php echo esc_attr(sanitize_title($category)); ?>">
                        <?php echo esc_html($category); ?>
                    </button>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <!-- Grid -->
        <?php if (!empty($projects)) : ?>
            <div class="alpacode-portfolio__grid" data-alpacode-stagger="0.1">
                <?php foreach ($projects as $project) :
                    $title = esc_html($project['title'] ?? '');
                    $category = esc_html($project['category'] ?? '');
                    $category_slug = esc_attr(sanitize_title($category));
                    $image = esc_url($project['image'] ?? '');
                    $link = esc_url($project['link'] ?? '#');
                    $project_desc = esc_html($project['description'] ?? '');
                ?>
                    <article class="alpacode-portfolio__item" data-category="<?php echo $category_slug; ?>">
                        <a href="<?php echo $link; ?>" class="alpacode-portfolio__link">
                            <div class="alpacode-portfolio__image">
                                <?php if ($image) : ?>
                                    <img src="<?php echo $image; ?>" alt="<?php echo $title; ?>" loading="lazy" />
                                <?php else : ?>
                                    <div class="alpacode-portfolio__placeholder">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                            <circle cx="8.5" cy="8.5" r="1.5"/>
                                            <polyline points="21 15 16 10 5 21"/>
                                        </svg>
                                    </div>
                                <?php endif; ?>

                                <!-- Overlay -->
                                <div class="alpacode-portfolio__overlay">
                                    <span class="alpacode-portfolio__view">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                            <polyline points="15 3 21 3 21 9"/>
                                            <line x1="10" y1="14" x2="21" y2="3"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div class="alpacode-portfolio__content">
                                <?php if ($category) : ?>
                                    <span class="alpacode-portfolio__category"><?php echo $category; ?></span>
                                <?php endif; ?>
                                <h3 class="alpacode-portfolio__title"><?php echo $title; ?></h3>
                                <?php if ($show_description && $project_desc) : ?>
                                    <p class="alpacode-portfolio__desc"><?php echo $project_desc; ?></p>
                                <?php endif; ?>
                            </div>
                        </a>
                    </article>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
