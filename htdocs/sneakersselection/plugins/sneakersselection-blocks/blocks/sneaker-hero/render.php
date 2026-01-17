<?php
/**
 * Sneaker Hero Block - Server-side render
 *
 * @var array    $attributes Block attributes
 * @var string   $content    Block content
 * @var WP_Block $block      Block instance
 */

$eyebrow = esc_html($attributes['eyebrow'] ?? 'New Release');
$heading = esc_html($attributes['heading'] ?? 'Air Jordan 1 Retro High OG');
$subheading = esc_html($attributes['subheading'] ?? '');
$primary_button_text = esc_html($attributes['primaryButtonText'] ?? 'Shop Now');
$primary_button_url = esc_url($attributes['primaryButtonUrl'] ?? '#');
$secondary_button_text = esc_html($attributes['secondaryButtonText'] ?? '');
$secondary_button_url = esc_url($attributes['secondaryButtonUrl'] ?? '#');
$image_url = esc_url($attributes['imageUrl'] ?? '');
$image_alt = esc_attr($attributes['imageAlt'] ?? $heading);
$background_color = esc_attr($attributes['backgroundColor'] ?? '#f5f5f5');
$text_color = esc_attr($attributes['textColor'] ?? '#000000');
$layout = esc_attr($attributes['layout'] ?? 'image-right');
$show_floating = $attributes['showFloatingEffect'] ?? true;

$classes = array('ss-block', 'ss-sneaker-hero');
$classes[] = 'ss-sneaker-hero--' . $layout;

if ($show_floating && $image_url) {
    $classes[] = 'ss-sneaker-hero--floating';
}

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'style' => sprintf('--ss-hero-bg: %s; --ss-hero-text: %s;', $background_color, $text_color),
));
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="ss-container ss-sneaker-hero__container">
        <div class="ss-sneaker-hero__content" data-ss-animate="slide-right">
            <?php if ($eyebrow) : ?>
                <span class="ss-label ss-sneaker-hero__eyebrow"><?php echo $eyebrow; ?></span>
            <?php endif; ?>

            <h1 class="ss-heading ss-heading--display ss-sneaker-hero__heading">
                <?php echo $heading; ?>
            </h1>

            <?php if ($subheading) : ?>
                <p class="ss-text ss-text--lg ss-sneaker-hero__subheading">
                    <?php echo $subheading; ?>
                </p>
            <?php endif; ?>

            <div class="ss-sneaker-hero__buttons">
                <?php if ($primary_button_text) : ?>
                    <a href="<?php echo $primary_button_url; ?>" class="ss-button ss-button--primary ss-button--large">
                        <?php echo $primary_button_text; ?>
                    </a>
                <?php endif; ?>

                <?php if ($secondary_button_text) : ?>
                    <a href="<?php echo $secondary_button_url; ?>" class="ss-button ss-button--secondary ss-button--large">
                        <?php echo $secondary_button_text; ?>
                    </a>
                <?php endif; ?>
            </div>
        </div>

        <?php if ($image_url) : ?>
            <div class="ss-sneaker-hero__image" data-ss-animate="scale" <?php echo $show_floating ? 'data-ss-float' : ''; ?>>
                <img src="<?php echo $image_url; ?>" alt="<?php echo $image_alt; ?>" loading="eager" />
            </div>
        <?php endif; ?>
    </div>
</section>
