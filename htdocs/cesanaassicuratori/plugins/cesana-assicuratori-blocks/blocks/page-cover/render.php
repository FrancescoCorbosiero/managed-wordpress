<?php
/**
 * Page Cover Block - Server-side render
 * Elegant cover with eyebrow and title for pages/posts
 */

$eyebrow         = $attributes['eyebrow'] ?? '';
$title           = $attributes['title'] ?? '';
$bg_image        = $attributes['backgroundImage'] ?? '';
$overlay_opacity = $attributes['overlayOpacity'] ?? 70;
$text_align      = $attributes['textAlign'] ?? 'left';

// Use post title as fallback
if (empty($title)) {
    $title = get_the_title();
}

if (empty($title)) {
    return;
}

$align_class = $text_align === 'center' ? ' ca-page-cover--center' : '';
$overlay_start = $overlay_opacity / 100;
$overlay_end   = max($overlay_start - 0.35, 0.15);
?>
<section class="ca-block ca-page-cover<?php echo esc_attr($align_class); ?>">
    <?php if (!empty($bg_image)) : ?>
        <div class="ca-page-cover__bg">
            <img src="<?php echo esc_url($bg_image); ?>" alt="" loading="eager">
        </div>
    <?php endif; ?>
    <div class="ca-page-cover__overlay"
         style="background: linear-gradient(to top, rgba(12,12,20,<?php echo esc_attr($overlay_start); ?>) 0%, rgba(12,12,20,<?php echo esc_attr($overlay_end); ?>) 100%);">
    </div>

    <div class="ca-page-cover__content">
        <?php if (!empty($eyebrow)) : ?>
            <span class="ca-page-cover__eyebrow" data-ca-reveal="up"><?php echo esc_html($eyebrow); ?></span>
        <?php endif; ?>

        <h1 class="ca-page-cover__title" data-ca-reveal="up" data-ca-reveal-delay="100"><?php echo esc_html($title); ?></h1>

        <div class="ca-page-cover__line" data-ca-reveal="up" data-ca-reveal-delay="200"></div>
    </div>
</section>
