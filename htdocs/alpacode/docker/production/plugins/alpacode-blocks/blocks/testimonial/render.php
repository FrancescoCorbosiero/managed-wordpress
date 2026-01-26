<?php
/**
 * Testimonials Block - Premium Server Side Render
 */

defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? '');
$description = esc_html($attributes['description'] ?? '');
$testimonials = $attributes['testimonials'] ?? array();
$layout = esc_attr($attributes['layout'] ?? 'carousel');
$columns = intval($attributes['columns'] ?? 3);
$show_rating = $attributes['showRating'] ?? true;
$show_quote_icon = $attributes['showQuoteIcon'] ?? true;
$autoplay = $attributes['autoplay'] ?? true;
$autoplay_speed = intval($attributes['autoplaySpeed'] ?? 5000);
$infinite_speed = intval($attributes['infiniteSpeed'] ?? 30);
$pause_on_hover = $attributes['pauseOnHover'] ?? true;
$show_fade_edges = $attributes['showFadeEdges'] ?? true;
$card_style = esc_attr($attributes['cardStyle'] ?? 'default');

$classes = array('alpacode-testimonials');
$classes[] = 'alpacode-testimonials--' . $layout;
$classes[] = 'alpacode-testimonials--card-' . $card_style;
if ($show_fade_edges && $layout !== 'grid') {
    $classes[] = 'alpacode-testimonials--fade-edges';
}
if ($pause_on_hover) {
    $classes[] = 'alpacode-testimonials--pause-hover';
}

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'data-layout' => $layout,
    'data-autoplay' => $autoplay ? 'true' : 'false',
    'data-autoplay-speed' => $autoplay_speed,
    'data-infinite-speed' => $infinite_speed,
    'data-pause-hover' => $pause_on_hover ? 'true' : 'false',
));

// Function to render a single testimonial card
function render_testimonial_card($testimonial, $show_rating, $show_quote_icon, $card_style) {
    $quote = esc_html($testimonial['quote'] ?? '');
    $author = esc_html($testimonial['author'] ?? '');
    $role = esc_html($testimonial['role'] ?? '');
    $avatar = esc_url($testimonial['avatar'] ?? '');
    $rating = intval($testimonial['rating'] ?? 5);
    $initial = strtoupper(substr($author, 0, 1));

    ob_start();
    ?>
    <div class="alpacode-testimonials__card">
        <?php if ($card_style !== 'minimal') : ?>
            <div class="alpacode-testimonials__card-glow"></div>
        <?php endif; ?>

        <div class="alpacode-testimonials__card-inner">
            <?php if ($show_quote_icon) : ?>
                <div class="alpacode-testimonials__quote-icon">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <path d="M14 24c0-6.627 5.373-12 12-12v5c-3.866 0-7 3.134-7 7 0 1.933.784 3.684 2.05 4.95.77.77.908 1.92.351 2.828l-.848 1.697C18.242 37 14 34.428 14 24zm19.2 0c0-6.627 5.373-12 12-12v5c-3.866 0-7 3.134-7 7 0 1.933.784 3.684 2.05 4.95.77.77.908 1.92.351 2.828l-.848 1.697C37.442 37 33.2 34.428 33.2 24z" fill="currentColor"/>
                    </svg>
                </div>
            <?php endif; ?>

            <?php if ($show_rating && $rating > 0) : ?>
                <div class="alpacode-testimonials__rating" aria-label="<?php echo $rating; ?> out of 5 stars">
                    <?php for ($i = 0; $i < 5; $i++) : ?>
                        <svg class="alpacode-testimonials__star <?php echo $i < $rating ? 'alpacode-testimonials__star--active' : ''; ?>"
                             width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M10 2l2.4 5.6 6.1.6-4.6 4 1.4 6-5.3-3.2L4.7 18.2l1.4-6-4.6-4 6.1-.6L10 2z" fill="currentColor"/>
                        </svg>
                    <?php endfor; ?>
                </div>
            <?php endif; ?>

            <blockquote class="alpacode-testimonials__quote">
                <?php echo $quote; ?>
            </blockquote>

            <div class="alpacode-testimonials__author-wrapper">
                <?php if ($avatar) : ?>
                    <img src="<?php echo $avatar; ?>"
                         alt="<?php echo $author; ?>"
                         class="alpacode-testimonials__avatar"
                         loading="lazy"
                         width="56"
                         height="56" />
                <?php else : ?>
                    <div class="alpacode-testimonials__avatar alpacode-testimonials__avatar--placeholder">
                        <span><?php echo $initial; ?></span>
                    </div>
                <?php endif; ?>

                <div class="alpacode-testimonials__author-info">
                    <div class="alpacode-testimonials__author"><?php echo $author; ?></div>
                    <?php if ($role) : ?>
                        <div class="alpacode-testimonials__role"><?php echo $role; ?></div>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <?php if ($card_style === 'bordered' || $card_style === 'glass') : ?>
            <div class="alpacode-testimonials__card-border"></div>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-testimonials__container">
        <!-- Header -->
        <?php if ($eyebrow || $heading || $description) : ?>
            <div class="alpacode-testimonials__header" data-alpacode-animate="fade-up">
                <?php if ($eyebrow) : ?>
                    <span class="alpacode-testimonials__eyebrow"><?php echo $eyebrow; ?></span>
                <?php endif; ?>
                <?php if ($heading) : ?>
                    <h2 class="alpacode-testimonials__heading"><?php echo $heading; ?></h2>
                <?php endif; ?>
                <?php if ($description) : ?>
                    <p class="alpacode-testimonials__description"><?php echo $description; ?></p>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($testimonials)) : ?>
            <?php if ($layout === 'grid') : ?>
                <!-- Grid Layout -->
                <div class="alpacode-testimonials__grid"
                     style="--columns: <?php echo $columns; ?>;"
                     data-alpacode-stagger="0.1">
                    <?php foreach ($testimonials as $testimonial) : ?>
                        <?php echo render_testimonial_card($testimonial, $show_rating, $show_quote_icon, $card_style); ?>
                    <?php endforeach; ?>
                </div>

            <?php elseif ($layout === 'infinite') : ?>
                <!-- Infinite Scroll Layout -->
                <div class="alpacode-testimonials__infinite-wrapper">
                    <?php if ($show_fade_edges) : ?>
                        <div class="alpacode-testimonials__fade alpacode-testimonials__fade--left"></div>
                        <div class="alpacode-testimonials__fade alpacode-testimonials__fade--right"></div>
                    <?php endif; ?>

                    <div class="alpacode-testimonials__infinite-track"
                         style="--infinite-speed: <?php echo $infinite_speed; ?>s;">
                        <!-- Original set -->
                        <?php foreach ($testimonials as $testimonial) : ?>
                            <?php echo render_testimonial_card($testimonial, $show_rating, $show_quote_icon, $card_style); ?>
                        <?php endforeach; ?>
                        <!-- Duplicate for seamless loop -->
                        <?php foreach ($testimonials as $testimonial) : ?>
                            <?php echo render_testimonial_card($testimonial, $show_rating, $show_quote_icon, $card_style); ?>
                        <?php endforeach; ?>
                    </div>
                </div>

            <?php else : ?>
                <!-- Carousel Layout -->
                <div class="alpacode-testimonials__carousel-wrapper">
                    <?php if ($show_fade_edges) : ?>
                        <div class="alpacode-testimonials__fade alpacode-testimonials__fade--left"></div>
                        <div class="alpacode-testimonials__fade alpacode-testimonials__fade--right"></div>
                    <?php endif; ?>

                    <div class="alpacode-testimonials__carousel">
                        <div class="alpacode-testimonials__track">
                            <?php foreach ($testimonials as $index => $testimonial) : ?>
                                <div class="alpacode-testimonials__slide" data-index="<?php echo $index; ?>">
                                    <?php echo render_testimonial_card($testimonial, $show_rating, $show_quote_icon, $card_style); ?>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <?php if (count($testimonials) > 1) : ?>
                        <div class="alpacode-testimonials__controls">
                            <button class="alpacode-testimonials__nav alpacode-testimonials__nav--prev"
                                    aria-label="Previous testimonial"
                                    data-alpacode-magnetic>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>

                            <div class="alpacode-testimonials__dots" role="tablist">
                                <?php foreach ($testimonials as $index => $testimonial) : ?>
                                    <button class="alpacode-testimonials__dot <?php echo $index === 0 ? 'alpacode-testimonials__dot--active' : ''; ?>"
                                            data-index="<?php echo $index; ?>"
                                            role="tab"
                                            aria-selected="<?php echo $index === 0 ? 'true' : 'false'; ?>"
                                            aria-label="Go to testimonial <?php echo $index + 1; ?>">
                                        <span class="alpacode-testimonials__dot-progress"></span>
                                    </button>
                                <?php endforeach; ?>
                            </div>

                            <button class="alpacode-testimonials__nav alpacode-testimonials__nav--next"
                                    aria-label="Next testimonial"
                                    data-alpacode-magnetic>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        <?php endif; ?>
    </div>

    <!-- Background decoration -->
    <div class="alpacode-testimonials__bg-decoration">
        <div class="alpacode-testimonials__bg-gradient"></div>
    </div>
</section>
