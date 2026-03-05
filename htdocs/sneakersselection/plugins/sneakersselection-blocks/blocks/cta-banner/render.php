<?php
/**
 * CTA Banner Block - Server-side render
 */

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$text = $attributes['text'] ?? '';
$button_text = $attributes['buttonText'] ?? 'Shop Now';
$button_url = $attributes['buttonUrl'] ?? '';
$background_image = $attributes['backgroundImage'] ?? '';
$show_glow = $attributes['showGlow'] ?? true;

if (empty($title)) {
    return;
}
?>
<section class="ss-block ss-cta-banner">
    <?php if ($show_glow) : ?>
        <div class="ss-cta-banner__glow"></div>
    <?php endif; ?>

    <?php if (!empty($background_image)) : ?>
        <div class="ss-cta-banner__bg">
            <img src="<?php echo esc_url($background_image); ?>" alt="" loading="lazy">
        </div>
    <?php endif; ?>

    <div class="ss-cta-banner__gradient"></div>

    <div class="ss-cta-banner__content">
        <?php if (!empty($eyebrow)) : ?>
            <span class="ss-cta-banner__eyebrow" data-ss-reveal="up"><?php echo esc_html($eyebrow); ?></span>
        <?php endif; ?>

        <h2 class="ss-cta-banner__title" data-ss-reveal="up" data-ss-reveal-delay="100"><?php echo esc_html($title); ?></h2>

        <?php if (!empty($text)) : ?>
            <p class="ss-cta-banner__text" data-ss-reveal="up" data-ss-reveal-delay="200"><?php echo esc_html($text); ?></p>
        <?php endif; ?>

        <?php if (!empty($button_url)) : ?>
            <div data-ss-reveal="up" data-ss-reveal-delay="300">
                <a href="<?php echo esc_url($button_url); ?>" class="ss-btn ss-btn--primary ss-btn--large" data-ss-magnetic="0.2">
                    <?php echo esc_html($button_text); ?>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>
        <?php endif; ?>
    </div>
</section>
