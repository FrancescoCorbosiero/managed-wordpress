<?php
/**
 * FAQ Schema Block - Server-side render
 * Includes JSON-LD structured data for SEO
 */

$title = $attributes['title'] ?? 'Frequently Asked Questions';
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
<section class="ss-block ss-faq" data-ss-faq data-ss-faq-multiple="<?php echo $allow_multiple ? 'true' : 'false'; ?>">
    <div class="ss-faq__header">
        <h2 class="ss-faq__title" data-ss-reveal="up"><?php echo esc_html($title); ?></h2>
        <?php if (!empty($subtitle)) : ?>
            <p class="ss-faq__subtitle" data-ss-reveal="up" data-ss-reveal-delay="100"><?php echo esc_html($subtitle); ?></p>
        <?php endif; ?>
    </div>

    <div class="ss-faq__list">
        <?php foreach ($items as $index => $item) : ?>
            <?php if (!empty($item['question']) && !empty($item['answer'])) : ?>
                <div class="ss-faq__item" data-ss-faq-item data-ss-reveal="up" data-ss-reveal-delay="<?php echo ($index + 1) * 100; ?>">
                    <button class="ss-faq__trigger" data-ss-faq-trigger aria-expanded="false">
                        <span class="ss-faq__question"><?php echo esc_html($item['question']); ?></span>
                        <span class="ss-faq__icon" aria-hidden="true"></span>
                    </button>
                    <div class="ss-faq__content" data-ss-faq-content>
                        <div class="ss-faq__answer">
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
