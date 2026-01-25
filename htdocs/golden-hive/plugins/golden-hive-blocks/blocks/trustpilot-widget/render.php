<?php
/**
 * Trustpilot Widget Block - Render lato server
 */

$rating = $attributes['rating'] ?? 4.8;
$review_count = $attributes['reviewCount'] ?? 250;
$label = $attributes['label'] ?? 'Eccezionale';
$trustpilot_url = $attributes['trustpilotUrl'] ?? '';

$full_stars = floor($rating);
$has_half = ($rating - $full_stars) >= 0.5;
?>
<section class="gh-block gh-trustpilot" data-gh-reveal="up">
    <div class="gh-trustpilot__container">
        <div class="gh-trustpilot__header">
            <span class="gh-trustpilot__label"><?php echo esc_html($label); ?></span>

            <div class="gh-trustpilot__stars">
                <?php for ($i = 1; $i <= 5; $i++) : ?>
                    <span class="gh-trustpilot__star">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                    </span>
                <?php endfor; ?>
            </div>

            <div class="gh-trustpilot__rating">
                <?php echo number_format($rating, 1); ?> / 5
            </div>

            <p class="gh-trustpilot__count">
                Basato su <strong><?php echo number_format($review_count); ?></strong> recensioni
            </p>
        </div>

        <div class="gh-trustpilot__logo">
            <?php if (!empty($trustpilot_url)) : ?>
                <a href="<?php echo esc_url($trustpilot_url); ?>" target="_blank" rel="noopener noreferrer">
            <?php endif; ?>
            <svg width="120" height="30" viewBox="0 0 126 31" fill="none">
                <path d="M33.6 11.2h3.9l-8.2 23.4h-3.8l8.1-23.4zm-5.4 0l8.2 23.4h3.8l-8.1-23.4h-3.9zm6.3 14.3l1.2-3.4 5.5 9.1h4.2l-10.9-5.7z" fill="#00b67a"/>
                <path d="M51.3 25.5V11.2h3.3V25h7.7v2.5H51.3v-2zm13 0V11.2h3.3v16.3h-3.3zm6.5 0V11.2h9.8v2.5h-6.5v4.1h5.9v2.5h-5.9v4.7h6.7v2.5h-10v-.5zm14.3 0V11.2h3.3v16.3h-3.3zm7.4 0V11.2h3.3v9.4l7-9.4h3.9l-5.8 7.5 6.2 8.8h-4l-4.8-7-2.5 3.2v3.8h-3.3zm16.5-8.2c0-2.5.8-4.5 2.3-6 1.5-1.5 3.5-2.2 5.9-2.2 2.4 0 4.4.7 5.9 2.2 1.5 1.5 2.3 3.5 2.3 6v.1c0 2.5-.8 4.5-2.3 6-1.5 1.5-3.5 2.2-5.9 2.2-2.4 0-4.4-.7-5.9-2.2-1.5-1.5-2.3-3.5-2.3-6v-.1zm3.3.1c0 1.7.4 3 1.3 4 .9 1 2 1.5 3.5 1.5s2.7-.5 3.5-1.5c.9-1 1.3-2.3 1.3-4 0-1.7-.4-3-1.3-4-.9-1-2-1.5-3.5-1.5s-2.7.5-3.5 1.5c-.9 1-1.3 2.3-1.3 4z" fill="#191919"/>
            </svg>
            <?php if (!empty($trustpilot_url)) : ?>
                </a>
            <?php endif; ?>
        </div>
    </div>
</section>
