<?php
/**
 * Testimonials Block - Server-side render
 */

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$testimonials = $attributes['testimonials'] ?? [];
$autoplay = $attributes['autoplay'] ?? 6000;

if (empty($testimonials)) {
    return;
}

$star_icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
?>
<section class="rp-block rp-testimonials" data-rp-testimonials data-rp-testimonials-autoplay="<?php echo esc_attr($autoplay); ?>">
    <?php if (!empty($eyebrow) || !empty($title)) : ?>
        <div class="rp-testimonials__header" data-rp-reveal="up">
            <?php if (!empty($eyebrow)) : ?>
                <span class="rp-testimonials__eyebrow"><?php echo esc_html($eyebrow); ?></span>
            <?php endif; ?>
            <?php if (!empty($title)) : ?>
                <h2 class="rp-testimonials__title"><?php echo esc_html($title); ?></h2>
            <?php endif; ?>
        </div>
    <?php endif; ?>

    <div class="rp-testimonials__carousel" data-rp-reveal="up" data-rp-reveal-delay="200">
        <div class="rp-testimonials__track" data-rp-testimonials-track>
            <?php foreach ($testimonials as $testimonial) : ?>
                <div class="rp-testimonial" data-rp-testimonial>
                    <?php if (!empty($testimonial['rating'])) : ?>
                        <div class="rp-testimonials__stars">
                            <?php for ($i = 0; $i < intval($testimonial['rating']); $i++) : ?>
                                <?php echo $star_icon; ?>
                            <?php endfor; ?>
                        </div>
                    <?php endif; ?>

                    <?php if (!empty($testimonial['quote'])) : ?>
                        <blockquote class="rp-testimonial__quote">
                            <?php echo esc_html($testimonial['quote']); ?>
                        </blockquote>
                    <?php endif; ?>

                    <div class="rp-testimonial__author">
                        <?php if (!empty($testimonial['avatar'])) : ?>
                            <div class="rp-testimonial__avatar">
                                <img src="<?php echo esc_url($testimonial['avatar']); ?>" alt="<?php echo esc_attr($testimonial['name'] ?? ''); ?>" loading="lazy">
                            </div>
                        <?php endif; ?>
                        <div class="rp-testimonial__info">
                            <?php if (!empty($testimonial['name'])) : ?>
                                <span class="rp-testimonial__name"><?php echo esc_html($testimonial['name']); ?></span>
                            <?php endif; ?>
                            <?php if (!empty($testimonial['meta'])) : ?>
                                <span class="rp-testimonial__meta"><?php echo esc_html($testimonial['meta']); ?></span>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <?php if (count($testimonials) > 1) : ?>
            <div class="rp-testimonials__nav">
                <?php foreach ($testimonials as $index => $testimonial) : ?>
                    <button
                        class="rp-testimonials__dot <?php echo $index === 0 ? 'rp-testimonials__dot--active' : ''; ?>"
                        data-rp-testimonials-dot
                        aria-label="Go to testimonial <?php echo $index + 1; ?>"
                    ></button>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
