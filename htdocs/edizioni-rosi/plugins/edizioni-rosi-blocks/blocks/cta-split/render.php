<?php
/**
 * CTA Split Block — Server-side render
 * Side-by-side text + image CTA with optional background image
 */

$eyebrow         = $attributes['eyebrow'] ?? '';
$title           = $attributes['title'] ?? '';
$text            = $attributes['text'] ?? '';
$button_text     = $attributes['buttonText'] ?? 'Sfoglia i Libri';
$button_url      = $attributes['buttonUrl'] ?? '';
$image           = $attributes['image'] ?? '';
$image_alt       = $attributes['imageAlt'] ?? '';
$bg_image        = $attributes['backgroundImage'] ?? '';
$overlay_opacity = $attributes['overlayOpacity'] ?? 80;
$variant         = $attributes['variant'] ?? 'dark';
$image_position  = $attributes['imagePosition'] ?? 'right';

if (empty($title)) {
    return;
}

$variant_class  = 'er-cta-split--' . $variant;
$position_class = 'er-cta-split--img-' . $image_position;
$overlay_alpha  = round($overlay_opacity / 100, 2);
?>
<section class="er-cta-split <?php echo esc_attr($variant_class); ?> <?php echo esc_attr($position_class); ?>" data-er-reveal>
    <?php if (!empty($bg_image)) : ?>
        <div class="er-cta-split__bg">
            <img src="<?php echo esc_url($bg_image); ?>" alt="" loading="lazy">
        </div>
        <div class="er-cta-split__overlay" style="opacity: <?php echo esc_attr($overlay_alpha); ?>"></div>
    <?php endif; ?>

    <div class="er-cta-split__inner">
        <div class="er-cta-split__text">
            <?php if (!empty($eyebrow)) : ?>
                <span class="er-cta-split__eyebrow"><?php echo esc_html($eyebrow); ?></span>
            <?php endif; ?>

            <h2 class="er-cta-split__title"><?php echo esc_html($title); ?></h2>

            <?php if (!empty($text)) : ?>
                <p class="er-cta-split__desc"><?php echo esc_html($text); ?></p>
            <?php endif; ?>

            <?php if (!empty($button_url) && !empty($button_text)) : ?>
                <a href="<?php echo esc_url($button_url); ?>" class="er-cta-split__btn">
                    <?php echo esc_html($button_text); ?>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
            <?php endif; ?>
        </div>

        <?php if (!empty($image)) : ?>
            <div class="er-cta-split__media">
                <img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($image_alt); ?>" loading="lazy">
            </div>
        <?php endif; ?>
    </div>
</section>
