<?php
/**
 * Collection Banner Block - Server-side render
 */

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? 'Summer 2024');
$description = esc_html($attributes['description'] ?? '');
$button_text = esc_html($attributes['buttonText'] ?? 'Shop Collection');
$button_url = esc_url($attributes['buttonUrl'] ?? '#');
$background_image = esc_url($attributes['backgroundImage'] ?? '');
$background_color = esc_attr($attributes['backgroundColor'] ?? '#000000');
$text_color = esc_attr($attributes['textColor'] ?? '#ffffff');
$overlay_opacity = intval($attributes['overlayOpacity'] ?? 50);
$min_height = esc_attr($attributes['minHeight'] ?? '400px');
$content_position = esc_attr($attributes['contentPosition'] ?? 'center');
$show_parallax = $attributes['showParallax'] ?? false;

$classes = array('ss-block', 'ss-collection-banner');
$classes[] = 'ss-collection-banner--' . $content_position;

if ($background_image) {
    $classes[] = 'ss-collection-banner--has-bg-image';
}

$style = sprintf(
    '--ss-banner-bg: %s; --ss-banner-text: %s; --ss-banner-overlay: %s; --ss-banner-min-height: %s;',
    $background_color,
    $text_color,
    $overlay_opacity / 100,
    $min_height
);

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'style' => $style,
));
?>

<section <?php echo $wrapper_attributes; ?>>
    <?php if ($background_image) : ?>
        <div class="ss-collection-banner__bg" <?php echo $show_parallax ? 'data-ss-parallax="0.3"' : ''; ?>>
            <img src="<?php echo $background_image; ?>" alt="" loading="lazy" />
        </div>
        <div class="ss-collection-banner__overlay"></div>
    <?php endif; ?>

    <div class="ss-container ss-collection-banner__container">
        <div class="ss-collection-banner__content" data-ss-animate>
            <?php if ($eyebrow) : ?>
                <span class="ss-label ss-collection-banner__eyebrow"><?php echo $eyebrow; ?></span>
            <?php endif; ?>

            <?php if ($heading) : ?>
                <h2 class="ss-heading ss-heading--1 ss-collection-banner__heading"><?php echo $heading; ?></h2>
            <?php endif; ?>

            <?php if ($description) : ?>
                <p class="ss-text ss-text--lg ss-collection-banner__description"><?php echo $description; ?></p>
            <?php endif; ?>

            <?php if ($button_text) : ?>
                <a href="<?php echo $button_url; ?>" class="ss-button ss-button--accent ss-button--large">
                    <?php echo $button_text; ?>
                </a>
            <?php endif; ?>
        </div>
    </div>
</section>
