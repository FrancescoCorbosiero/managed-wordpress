<?php
/**
 * FAQ Schema Block - Server-side render
 * Includes JSON-LD structured data for SEO
 */

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$subtitle = $attributes['subtitle'] ?? '';
$items = $attributes['items'] ?? [];
$allow_multiple = $attributes['allowMultiple'] ?? false;

if (empty($items)) {
    return;
}

// Build FAQ Schema JSON-LD
$faq_schema = [
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => []
];

foreach ($items as $item) {
    if (!empty($item['question']) && !empty($item['answer'])) {
        $faq_schema['mainEntity'][] = [
            '@type' => 'Question',
            'name' => $item['question'],
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text' => wp_strip_all_tags($item['answer'])
            ]
        ];
    }
}
?>
<section class="rp-block rp-faq" data-rp-faq data-rp-faq-multiple="<?php echo $allow_multiple ? 'true' : 'false'; ?>">
    <div class="rp-faq__header" data-rp-reveal="up">
        <?php if (!empty($eyebrow)) : ?>
            <span class="rp-faq__eyebrow"><?php echo esc_html($eyebrow); ?></span>
        <?php endif; ?>
        <h2 class="rp-faq__title"><?php echo esc_html($title); ?></h2>
        <?php if (!empty($subtitle)) : ?>
            <p class="rp-faq__subtitle"><?php echo esc_html($subtitle); ?></p>
        <?php endif; ?>
    </div>

    <div class="rp-faq__list">
        <?php foreach ($items as $index => $item) : ?>
            <?php if (!empty($item['question']) && !empty($item['answer'])) : ?>
                <div class="rp-faq__item" data-rp-faq-item data-rp-reveal="up" data-rp-reveal-delay="<?php echo ($index + 1) * 100; ?>">
                    <button class="rp-faq__trigger" data-rp-faq-trigger aria-expanded="false">
                        <span class="rp-faq__question"><?php echo esc_html($item['question']); ?></span>
                        <span class="rp-faq__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 9l6 6 6-6"/>
                            </svg>
                        </span>
                    </button>
                    <div class="rp-faq__content" data-rp-faq-content>
                        <div class="rp-faq__answer">
                            <?php echo wp_kses_post($item['answer']); ?>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
        <?php endforeach; ?>
    </div>
</section>

<!-- FAQ Schema JSON-LD for SEO -->
<script type="application/ld+json">
<?php echo wp_json_encode($faq_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?>
</script>
