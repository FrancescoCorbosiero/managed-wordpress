<?php
/**
 * CTA Banner Block — Server-side render
 * Full-width call-to-action with dark and gold variants for editorial promotion
 */

$eyebrow     = $attributes['eyebrow'] ?? '';
$title       = $attributes['title'] ?? '';
$text        = $attributes['text'] ?? '';
$button_text = $attributes['buttonText'] ?? 'Sfoglia i Libri';
$button_url  = $attributes['buttonUrl'] ?? '';
$bg_image    = $attributes['backgroundImage'] ?? '';
$variant     = $attributes['variant'] ?? 'dark';

if (empty($title)) {
    return;
}

$variant_class = 'er-cta--' . $variant;
?>
<section class="er-cta <?php echo esc_attr($variant_class); ?>" data-er-reveal>
    <?php if (!empty($bg_image)) : ?>
        <div class="er-cta__bg">
            <img src="<?php echo esc_url($bg_image); ?>" alt="" loading="lazy">
        </div>
        <div class="er-cta__overlay"></div>
    <?php endif; ?>

    <div class="er-cta__content">
        <?php if (!empty($eyebrow)) : ?>
            <span class="er-cta__eyebrow"><?php echo esc_html($eyebrow); ?></span>
        <?php endif; ?>

        <h2 class="er-cta__title"><?php echo esc_html($title); ?></h2>

        <?php if (!empty($text)) : ?>
            <p class="er-cta__text"><?php echo esc_html($text); ?></p>
        <?php endif; ?>

        <?php if (!empty($button_url) && !empty($button_text)) : ?>
            <a href="<?php echo esc_url($button_url); ?>" class="er-cta__btn">
                <?php echo esc_html($button_text); ?>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
        <?php endif; ?>
    </div>
</section>
