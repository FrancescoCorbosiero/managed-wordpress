<?php
/**
 * CTA Banner Block - Server-side render
 */

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$text = $attributes['text'] ?? '';
$primary_btn_text = $attributes['primaryButtonText'] ?? '';
$primary_btn_url = $attributes['primaryButtonUrl'] ?? '';
$secondary_btn_text = $attributes['secondaryButtonText'] ?? '';
$secondary_btn_url = $attributes['secondaryButtonUrl'] ?? '';
$background_image = $attributes['backgroundImage'] ?? '';

if (empty($title)) {
    return;
}
?>
<section class="rp-block rp-cta-banner">
    <div class="rp-cta-banner__accent"></div>

    <?php if (!empty($background_image)) : ?>
        <div class="rp-cta-banner__bg">
            <img src="<?php echo esc_url($background_image); ?>" alt="" loading="lazy">
        </div>
    <?php endif; ?>

    <div class="rp-cta-banner__overlay"></div>

    <div class="rp-cta-banner__content">
        <?php if (!empty($eyebrow)) : ?>
            <span class="rp-cta-banner__eyebrow" data-rp-reveal="up"><?php echo esc_html($eyebrow); ?></span>
        <?php endif; ?>

        <h2 class="rp-cta-banner__title" data-rp-reveal="up" data-rp-reveal-delay="100"><?php echo esc_html($title); ?></h2>

        <?php if (!empty($text)) : ?>
            <p class="rp-cta-banner__text" data-rp-reveal="up" data-rp-reveal-delay="200"><?php echo esc_html($text); ?></p>
        <?php endif; ?>

        <?php if (!empty($primary_btn_url) || !empty($secondary_btn_url)) : ?>
            <div class="rp-cta-banner__buttons" data-rp-reveal="up" data-rp-reveal-delay="300">
                <?php if (!empty($primary_btn_url) && !empty($primary_btn_text)) : ?>
                    <a href="<?php echo esc_url($primary_btn_url); ?>" class="rp-btn rp-btn--primary rp-btn--large">
                        <?php echo esc_html($primary_btn_text); ?>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                <?php endif; ?>

                <?php if (!empty($secondary_btn_url) && !empty($secondary_btn_text)) : ?>
                    <a href="<?php echo esc_url($secondary_btn_url); ?>" class="rp-btn rp-btn--secondary rp-btn--large">
                        <?php echo esc_html($secondary_btn_text); ?>
                    </a>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
