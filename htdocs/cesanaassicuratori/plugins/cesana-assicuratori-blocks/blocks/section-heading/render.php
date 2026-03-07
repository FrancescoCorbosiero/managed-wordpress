<?php
/**
 * Section Heading Block — Server-side render
 * Text-focused block with eyebrow, title, and description
 */

$eyebrow       = $attributes['eyebrow'] ?? '';
$title         = $attributes['title'] ?? '';
$description   = $attributes['description'] ?? '';
$centered      = $attributes['centered'] ?? false;
$heading_level = $attributes['headingLevel'] ?? 2;

if (empty($title)) {
    return;
}

$tag = 'h' . intval($heading_level);
$center_class = $centered ? ' ca-section-heading--centered' : '';
?>
<div class="ca-block ca-section-heading<?php echo esc_attr($center_class); ?>" data-ca-reveal="up">
    <?php if (!empty($eyebrow)) : ?>
        <span class="ca-section-heading__eyebrow"><?php echo esc_html($eyebrow); ?></span>
    <?php endif; ?>

    <<?php echo $tag; ?> class="ca-section-heading__title" data-ca-text-reveal="words"><?php echo esc_html($title); ?></<?php echo $tag; ?>>

    <?php if (!empty($description)) : ?>
        <p class="ca-section-heading__description"><?php echo esc_html($description); ?></p>
    <?php endif; ?>
</div>
