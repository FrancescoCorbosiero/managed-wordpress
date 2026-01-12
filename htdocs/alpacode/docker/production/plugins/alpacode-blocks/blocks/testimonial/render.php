<?php
/**
 * Testimonials Block - Server Side Render
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 */

defined('ABSPATH') || exit;

$section_title = esc_html($attributes['sectionTitle'] ?? '');
$section_subtitle = esc_html($attributes['sectionSubtitle'] ?? '');
$testimonials = $attributes['testimonials'] ?? [];
$autoplay = $attributes['autoplay'] ?? true;
$autoplay_speed = $attributes['autoplaySpeed'] ?? 5000;

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'alpacode-testimonials',
    'data-autoplay' => $autoplay ? 'true' : 'false',
    'data-autoplay-speed' => $autoplay_speed,
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-testimonials__container">
        <?php if ($section_title || $section_subtitle): ?>
            <div class="alpacode-testimonials__header">
                <?php if ($section_subtitle): ?>
                    <span class="alpacode-testimonials__subtitle">
                        <?php echo $section_subtitle; ?>
                    </span>
                <?php endif; ?>
                <?php if ($section_title): ?>
                    <h2 class="alpacode-testimonials__title">
                        <?php echo $section_title; ?>
                    </h2>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <div class="alpacode-testimonials__carousel">
            <div class="alpacode-testimonials__track">
                <?php foreach ($testimonials as $index => $testimonial): ?>
                    <div class="alpacode-testimonials__card" data-index="<?php echo $index; ?>">
                        <div class="alpacode-testimonials__quote-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path
                                    d="M10 20c0-5.523 4.477-10 10-10v4c-3.314 0-6 2.686-6 6 0 1.657.672 3.157 1.757 4.243.642.642.757 1.6.293 2.357l-.707 1.414C13.535 30.828 10 28.657 10 20zm16 0c0-5.523 4.477-10 10-10v4c-3.314 0-6 2.686-6 6 0 1.657.672 3.157 1.757 4.243.642.642.757 1.6.293 2.357l-.707 1.414C29.535 30.828 26 28.657 26 20z"
                                    fill="currentColor" opacity="0.1" />
                            </svg>
                        </div>

                        <div class="alpacode-testimonials__rating">
                            <?php for ($i = 0; $i < 5; $i++): ?>
                                <svg class="alpacode-testimonials__star <?php echo $i < ($testimonial['rating'] ?? 5) ? 'active' : ''; ?>"
                                    width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 2l2.4 5.6 6.1.6-4.6 4 1.4 6-5.3-3.2L4.7 18.2l1.4-6-4.6-4 6.1-.6L10 2z"
                                        fill="currentColor" />
                                </svg>
                            <?php endfor; ?>
                        </div>

                        <blockquote class="alpacode-testimonials__quote">
                            <?php echo esc_html($testimonial['quote']); ?>
                        </blockquote>

                        <div class="alpacode-testimonials__author-wrapper">
                            <?php if (!empty($testimonial['avatar'])): ?>
                                <img src="<?php echo esc_url($testimonial['avatar']); ?>"
                                    alt="<?php echo esc_attr($testimonial['author']); ?>"
                                    class="alpacode-testimonials__avatar" />
                            <?php else: ?>
                                <div class="alpacode-testimonials__avatar alpacode-testimonials__avatar--placeholder">
                                    <?php echo esc_html(substr($testimonial['author'], 0, 1)); ?>
                                </div>
                            <?php endif; ?>
                            <div class="alpacode-testimonials__author-info">
                                <div class="alpacode-testimonials__author">
                                    <?php echo esc_html($testimonial['author']); ?>
                                </div>
                                <div class="alpacode-testimonials__role">
                                    <?php echo esc_html($testimonial['role']); ?>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <?php if (count($testimonials) > 1): ?>
                <div class="alpacode-testimonials__controls">
                    <button class="alpacode-testimonials__nav alpacode-testimonials__nav--prev"
                        aria-label="Previous testimonial">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </button>
                    <div class="alpacode-testimonials__dots">
                        <?php foreach ($testimonials as $index => $testimonial): ?>
                            <button class="alpacode-testimonials__dot <?php echo $index === 0 ? 'active' : ''; ?>"
                                data-index="<?php echo $index; ?>"
                                aria-label="Go to testimonial <?php echo $index + 1; ?>"></button>
                        <?php endforeach; ?>
                    </div>
                    <button class="alpacode-testimonials__nav alpacode-testimonials__nav--next"
                        aria-label="Next testimonial">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>