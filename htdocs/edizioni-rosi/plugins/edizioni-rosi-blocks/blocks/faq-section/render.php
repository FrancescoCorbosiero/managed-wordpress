<?php
/**
 * FAQ Section Block — Server-side render
 * Accordion FAQ with JSON-LD FAQPage schema for SEO
 */

$title          = $attributes['title'] ?? 'Domande Frequenti';
$subtitle       = $attributes['subtitle'] ?? '';
$items          = $attributes['items'] ?? [];
$allow_multiple = $attributes['allowMultiple'] ?? false;

if (empty($items)) {
    return;
}

$block_id = 'er-faq-' . wp_unique_id();

// Build JSON-LD FAQPage schema
$schema_items = array();
foreach ($items as $item) {
    if (!empty($item['question']) && !empty($item['answer'])) {
        $schema_items[] = array(
            '@type' => 'Question',
            'name' => wp_strip_all_tags($item['question']),
            'acceptedAnswer' => array(
                '@type' => 'Answer',
                'text' => wp_strip_all_tags($item['answer']),
            ),
        );
    }
}

if (!empty($schema_items)) :
?>
<script type="application/ld+json">
<?php echo wp_json_encode(array(
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => $schema_items,
), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); ?>
</script>
<?php endif; ?>

<section class="er-faq" id="<?php echo esc_attr($block_id); ?>"
    data-er-faq
    <?php if ($allow_multiple) : ?>data-er-faq-multiple="true"<?php endif; ?>>

    <div class="er-faq__header">
        <h2 class="er-faq__title"><?php echo esc_html($title); ?></h2>
        <?php if (!empty($subtitle)) : ?>
            <p class="er-faq__subtitle"><?php echo esc_html($subtitle); ?></p>
        <?php endif; ?>
    </div>

    <div class="er-faq__list">
        <?php foreach ($items as $index => $item) :
            if (empty($item['question'])) continue;
            $q_id = $block_id . '-q-' . $index;
            $a_id = $block_id . '-a-' . $index;
        ?>
            <div class="er-faq__item">
                <button class="er-faq__trigger"
                    id="<?php echo esc_attr($q_id); ?>"
                    aria-expanded="false"
                    aria-controls="<?php echo esc_attr($a_id); ?>"
                    data-er-faq-trigger>
                    <span class="er-faq__question"><?php echo esc_html($item['question']); ?></span>
                    <span class="er-faq__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                    </span>
                </button>
                <div class="er-faq__content"
                    id="<?php echo esc_attr($a_id); ?>"
                    role="region"
                    aria-labelledby="<?php echo esc_attr($q_id); ?>"
                    data-er-faq-content
                    hidden>
                    <div class="er-faq__answer">
                        <?php echo wp_kses_post($item['answer']); ?>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>
