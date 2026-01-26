<?php
/**
 * Hero Carousel Block - Server-side render
 */

$slides = $attributes['slides'] ?? [];
$autoplay = $attributes['autoplay'] ?? 6000;
$show_dots = $attributes['showDots'] ?? true;
$show_arrows = $attributes['showArrows'] ?? true;

if (empty($slides)) {
    return;
}

$block_id = 'ss-hero-' . wp_unique_id();
?>
<div class="ss-block ss-hero-carousel" data-ss-hero-carousel data-ss-hero-autoplay="<?php echo esc_attr($autoplay); ?>" id="<?php echo esc_attr($block_id); ?>">
    <?php foreach ($slides as $index => $slide) : ?>
        <div class="ss-hero-slide" data-ss-hero-slide>
            <?php if (!empty($slide['backgroundImage'])) : ?>
                <div class="ss-hero-slide__bg">
                    <img src="<?php echo esc_url($slide['backgroundImage']); ?>" alt="" loading="<?php echo $index === 0 ? 'eager' : 'lazy'; ?>">
                </div>
            <?php endif; ?>
            <div class="ss-hero-slide__overlay"></div>
            <div class="ss-hero-slide__content">
                <?php if (!empty($slide['eyebrow'])) : ?>
                    <span class="ss-hero-slide__eyebrow"><?php echo esc_html($slide['eyebrow']); ?></span>
                <?php endif; ?>

                <?php if (!empty($slide['title'])) : ?>
                    <h2 class="ss-hero-slide__title" data-ss-split="chars"><?php echo esc_html($slide['title']); ?></h2>
                <?php endif; ?>

                <?php if (!empty($slide['subtitle'])) : ?>
                    <p class="ss-hero-slide__subtitle"><?php echo esc_html($slide['subtitle']); ?></p>
                <?php endif; ?>

                <?php if (!empty($slide['buttonText']) && !empty($slide['buttonUrl'])) : ?>
                    <div class="ss-hero-slide__cta">
                        <a href="<?php echo esc_url($slide['buttonUrl']); ?>" class="ss-btn ss-btn--primary ss-btn--large" data-ss-magnetic="0.2">
                            <?php echo esc_html($slide['buttonText']); ?>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    <?php endforeach; ?>

    <?php if ($show_dots && count($slides) > 1) : ?>
        <div class="ss-hero-nav" data-ss-hero-dots></div>
    <?php endif; ?>

    <?php if ($show_arrows && count($slides) > 1) : ?>
        <div class="ss-hero-arrows">
            <button class="ss-hero-arrow" data-ss-hero-prev aria-label="Previous slide">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
            </button>
            <button class="ss-hero-arrow" data-ss-hero-next aria-label="Next slide">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
        </div>
    <?php endif; ?>
</div>
