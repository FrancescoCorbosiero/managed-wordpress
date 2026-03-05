<?php
/**
 * Social Proof Popup Block - Server-side render
 */

$notifications = $attributes['notifications'] ?? [];
$interval = $attributes['interval'] ?? 8000;
$initial_delay = $attributes['initialDelay'] ?? 5000;
$title = $attributes['title'] ?? 'Someone just purchased';

if (empty($notifications)) {
    return;
}

$notifications_json = wp_json_encode($notifications);
?>
<div class="ss-block ss-social-proof"
     data-ss-social-proof
     data-ss-social-proof-items='<?php echo esc_attr($notifications_json); ?>'
     data-ss-social-proof-interval="<?php echo esc_attr($interval); ?>"
     data-ss-social-proof-delay="<?php echo esc_attr($initial_delay); ?>"
     aria-live="polite"
     aria-atomic="true">

    <div class="ss-social-proof__image">
        <img data-ss-social-proof-image src="" alt="">
    </div>

    <div class="ss-social-proof__content">
        <span class="ss-social-proof__title"><?php echo esc_html($title); ?></span>
        <p class="ss-social-proof__product" data-ss-social-proof-product></p>
        <span class="ss-social-proof__meta">
            <span data-ss-social-proof-location></span>
            <span data-ss-social-proof-time></span>
        </span>
    </div>

    <button class="ss-social-proof__close" data-ss-social-proof-close aria-label="Close notification">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
    </button>
</div>
