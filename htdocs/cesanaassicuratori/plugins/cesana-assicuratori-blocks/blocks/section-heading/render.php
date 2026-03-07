<?php
/**
 * Section Heading Block — Server-side render
 * Text-focused block with eyebrow, title, description, and optional image
 */

$eyebrow        = $attributes['eyebrow'] ?? '';
$title          = $attributes['title'] ?? '';
$description    = $attributes['description'] ?? '';
$text_align     = $attributes['textAlign'] ?? 'left';
$heading_level  = $attributes['headingLevel'] ?? 2;
$image_url      = $attributes['imageUrl'] ?? '';
$image_alt      = $attributes['imageAlt'] ?? '';
$image_position = $attributes['imagePosition'] ?? 'right';

if (empty($title)) {
    return;
}

$tag = 'h' . intval($heading_level);
$has_image = !empty($image_url);

$classes = 'ca-block ca-section-heading';
$classes .= ' ca-section-heading--align-' . esc_attr($text_align);
if ($has_image) {
    $classes .= ' ca-section-heading--has-image ca-section-heading--image-' . esc_attr($image_position);
}
?>
<div class="<?php echo esc_attr($classes); ?>">
    <div class="ca-section-heading__inner">
        <div class="ca-section-heading__text" data-ca-reveal="up">
            <?php if (!empty($eyebrow)) : ?>
                <span class="ca-section-heading__eyebrow"><?php echo esc_html($eyebrow); ?></span>
            <?php endif; ?>

            <<?php echo $tag; ?> class="ca-section-heading__title" data-ca-text-reveal="words"><?php echo esc_html($title); ?></<?php echo $tag; ?>>

            <?php if (!empty($description)) : ?>
                <p class="ca-section-heading__description"><?php echo esc_html($description); ?></p>
            <?php endif; ?>
        </div>

        <?php if ($has_image) : ?>
            <div class="ca-section-heading__image" data-ca-reveal="up">
                <img src="<?php echo esc_url($image_url); ?>"
                     alt="<?php echo esc_attr($image_alt); ?>"
                     loading="lazy">
            </div>
        <?php endif; ?>
    </div>
</div>
