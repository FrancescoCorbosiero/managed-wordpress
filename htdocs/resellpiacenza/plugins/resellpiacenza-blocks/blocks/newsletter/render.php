<?php
/**
 * Newsletter Block - Server-side render
 */

$title = $attributes['title'] ?? '';
$text = $attributes['text'] ?? '';
$placeholder = $attributes['placeholder'] ?? 'Enter your email';
$button_text = $attributes['buttonText'] ?? 'Subscribe';
$disclaimer = $attributes['disclaimer'] ?? '';

if (empty($title)) {
    return;
}
?>
<section class="rp-block rp-newsletter">
    <div class="rp-newsletter__container" data-rp-reveal="up">
        <div class="rp-newsletter__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
            </svg>
        </div>

        <h2 class="rp-newsletter__title"><?php echo esc_html($title); ?></h2>

        <?php if (!empty($text)) : ?>
            <p class="rp-newsletter__text"><?php echo esc_html($text); ?></p>
        <?php endif; ?>

        <form class="rp-newsletter__form" data-rp-newsletter-form>
            <input
                type="email"
                class="rp-newsletter__input"
                placeholder="<?php echo esc_attr($placeholder); ?>"
                required
                data-rp-newsletter-input
            >
            <button type="submit" class="rp-btn rp-btn--dark" data-rp-newsletter-submit>
                <?php echo esc_html($button_text); ?>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
        </form>

        <p class="rp-newsletter__feedback" data-rp-newsletter-feedback aria-live="polite"></p>

        <?php if (!empty($disclaimer)) : ?>
            <p class="rp-newsletter__disclaimer"><?php echo esc_html($disclaimer); ?></p>
        <?php endif; ?>
    </div>
</section>
