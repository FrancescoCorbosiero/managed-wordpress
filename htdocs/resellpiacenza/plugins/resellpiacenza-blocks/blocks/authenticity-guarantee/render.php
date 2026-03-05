<?php
/**
 * Authenticity Guarantee Block - Server-side render
 */

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$badge_text = $attributes['badgeText'] ?? 'Certified Authentic';
$steps = $attributes['steps'] ?? [];
$button_text = $attributes['buttonText'] ?? '';
$button_url = $attributes['buttonUrl'] ?? '';

if (empty($title)) {
    return;
}
?>
<section class="rp-block rp-authenticity">
    <div class="rp-authenticity__container">
        <div class="rp-authenticity__visual" data-rp-reveal="left">
            <div class="rp-authenticity__badge-large">
                <div class="rp-authenticity__badge-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="M9 12l2 2 4-4"/>
                    </svg>
                </div>
                <span class="rp-authenticity__badge-text"><?php echo esc_html($badge_text); ?></span>
                <span class="rp-authenticity__badge-sub">Resell Piacenza</span>
            </div>
        </div>

        <div class="rp-authenticity__content" data-rp-reveal="right">
            <?php if (!empty($eyebrow)) : ?>
                <span class="rp-authenticity__eyebrow"><?php echo esc_html($eyebrow); ?></span>
            <?php endif; ?>

            <h2 class="rp-authenticity__title"><?php echo esc_html($title); ?></h2>

            <?php if (!empty($description)) : ?>
                <p class="rp-authenticity__description"><?php echo esc_html($description); ?></p>
            <?php endif; ?>

            <?php if (!empty($steps)) : ?>
                <div class="rp-authenticity__steps">
                    <?php foreach ($steps as $index => $step) : ?>
                        <div class="rp-authenticity__step">
                            <span class="rp-authenticity__step-number"><?php echo $index + 1; ?></span>
                            <div class="rp-authenticity__step-content">
                                <?php if (!empty($step['title'])) : ?>
                                    <h4><?php echo esc_html($step['title']); ?></h4>
                                <?php endif; ?>
                                <?php if (!empty($step['text'])) : ?>
                                    <p><?php echo esc_html($step['text']); ?></p>
                                <?php endif; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($button_url) && !empty($button_text)) : ?>
                <a href="<?php echo esc_url($button_url); ?>" class="rp-btn rp-btn--outline-gold" style="margin-top: var(--rp-space-xl);">
                    <?php echo esc_html($button_text); ?>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            <?php endif; ?>
        </div>
    </div>
</section>
