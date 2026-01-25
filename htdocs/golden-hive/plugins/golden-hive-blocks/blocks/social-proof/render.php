<?php
/**
 * Social Proof Block - Render lato server
 */

$notifications = $attributes['notifications'] ?? [];
$interval = $attributes['interval'] ?? 8000;
$initial_delay = $attributes['initialDelay'] ?? 5000;
$title = $attributes['title'] ?? 'Qualcuno ha appena acquistato';

if (empty($notifications)) {
    return;
}
?>
<div class="gh-block gh-social-proof"
     data-gh-social-proof
     data-gh-social-proof-items="<?php echo esc_attr(wp_json_encode($notifications)); ?>"
     data-gh-social-proof-interval="<?php echo esc_attr($interval); ?>"
     data-gh-social-proof-delay="<?php echo esc_attr($initial_delay); ?>"
     aria-live="polite"
     aria-atomic="true">

    <div class="gh-social-proof__image">
        <img src="" alt="" data-gh-social-proof-image>
    </div>

    <div class="gh-social-proof__content">
        <span class="gh-social-proof__title"><?php echo esc_html($title); ?></span>
        <span class="gh-social-proof__product" data-gh-social-proof-product></span>
        <span class="gh-social-proof__meta">
            <span data-gh-social-proof-time></span>
            <span> - </span>
            <span data-gh-social-proof-location></span>
        </span>
    </div>

    <button class="gh-social-proof__close" data-gh-social-proof-close aria-label="Chiudi notifica">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
    </button>
</div>
