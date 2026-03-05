<?php
/**
 * Feature Grid Block - Server-side render
 */

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? 'Why Choose Us';
$features = $attributes['features'] ?? [];

// Default icons SVG
$icons = [
    'shipping' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 18H3a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v2m-4 7h6a2 2 0 002-2v-3l-3-4h-5v7a2 2 0 002 2zm0 0a2 2 0 01-4 0m4 0a2 2 0 00-4 0m-8 0a2 2 0 104 0m-4 0a2 2 0 014 0"/></svg>',
    'authentic' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
    'returns' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>',
    'support' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
    'secure' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>',
    'quality' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>',
];

if (empty($features)) {
    return;
}
?>
<section class="ss-block ss-features">
    <div class="ss-features__header">
        <?php if (!empty($eyebrow)) : ?>
            <span class="ss-features__eyebrow" data-ss-reveal="up"><?php echo esc_html($eyebrow); ?></span>
        <?php endif; ?>
        <?php if (!empty($title)) : ?>
            <h2 class="ss-features__title" data-ss-reveal="up" data-ss-reveal-delay="100"><?php echo esc_html($title); ?></h2>
        <?php endif; ?>
    </div>

    <div class="ss-features__grid">
        <?php foreach ($features as $index => $feature) : ?>
            <article class="ss-feature" data-ss-reveal="up" data-ss-reveal-delay="<?php echo ($index + 2) * 100; ?>">
                <span class="ss-feature__number" aria-hidden="true"><?php echo str_pad($index + 1, 2, '0', STR_PAD_LEFT); ?></span>

                <div class="ss-feature__icon">
                    <?php
                    $icon_key = $feature['icon'] ?? 'quality';
                    echo isset($icons[$icon_key]) ? $icons[$icon_key] : $icons['quality'];
                    ?>
                </div>

                <?php if (!empty($feature['title'])) : ?>
                    <h3 class="ss-feature__title"><?php echo esc_html($feature['title']); ?></h3>
                <?php endif; ?>

                <?php if (!empty($feature['text'])) : ?>
                    <p class="ss-feature__text"><?php echo esc_html($feature['text']); ?></p>
                <?php endif; ?>
            </article>
        <?php endforeach; ?>
    </div>
</section>
