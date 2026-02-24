<?php
/**
 * Text with Lists Block - Server-side render
 */

$sections = $attributes['sections'] ?? [];
$closing_text = $attributes['closingText'] ?? '';

if (empty($sections)) {
    return;
}
?>
<section class="ss-block ss-text-lists">
    <div class="ss-text-lists__container">
        <?php foreach ($sections as $index => $section) : ?>
            <div class="ss-text-lists__section" data-ss-reveal="up" data-ss-reveal-delay="<?php echo $index * 150; ?>">
                <?php if (!empty($section['title'])) : ?>
                    <h2 class="ss-text-lists__title"><?php echo esc_html($section['title']); ?></h2>
                <?php endif; ?>

                <?php if (!empty($section['intro'])) : ?>
                    <p class="ss-text-lists__intro"><?php echo esc_html($section['intro']); ?></p>
                <?php endif; ?>

                <?php if (!empty($section['items'])) : ?>
                    <?php
                    $list_style = $section['listStyle'] ?? 'dash';
                    ?>
                    <ul class="ss-text-lists__list ss-text-lists__list--<?php echo esc_attr($list_style); ?>">
                        <?php foreach ($section['items'] as $item) : ?>
                            <?php if (is_array($item)) : ?>
                                <li class="ss-text-lists__item">
                                    <?php if (!empty($item['label'])) : ?>
                                        <strong class="ss-text-lists__item-label"><?php echo esc_html($item['label']); ?></strong>
                                        <?php if (!empty($item['text'])) : ?>
                                            <span class="ss-text-lists__item-sep"> - </span>
                                            <span class="ss-text-lists__item-text"><?php echo esc_html($item['text']); ?></span>
                                        <?php endif; ?>
                                    <?php else : ?>
                                        <span class="ss-text-lists__item-text"><?php echo esc_html($item['text'] ?? ''); ?></span>
                                    <?php endif; ?>
                                </li>
                            <?php else : ?>
                                <li class="ss-text-lists__item">
                                    <span class="ss-text-lists__item-text"><?php echo esc_html($item); ?></span>
                                </li>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>

        <?php if (!empty($closing_text)) : ?>
            <p class="ss-text-lists__closing" data-ss-reveal="up" data-ss-reveal-delay="<?php echo count($sections) * 150; ?>">
                <?php echo esc_html($closing_text); ?>
            </p>
        <?php endif; ?>
    </div>
</section>
