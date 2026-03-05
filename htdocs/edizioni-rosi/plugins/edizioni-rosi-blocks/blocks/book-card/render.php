<?php
/**
 * Book Card Block - Server-side render
 * Single book entry with cover, author, title and arrow link
 */

$url    = $attributes['url'] ?? '';
$cover  = $attributes['cover'] ?? '';
$author = $attributes['author'] ?? '';
$title  = $attributes['title'] ?? '';

if (empty($title)) {
    return;
}

$tag        = !empty($url) ? 'a' : 'div';
$href_attr  = !empty($url) ? ' href="' . esc_url($url) . '" target="_blank" rel="noopener"' : '';

$arrow_svg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>';
?>
<<?php echo $tag; ?> class="er-book"<?php echo $href_attr; ?>>
    <div class="er-book__cover">
        <?php if (!empty($cover)) : ?>
            <img src="<?php echo esc_url($cover); ?>"
                 alt="<?php echo esc_attr($title); ?>"
                 loading="lazy">
        <?php endif; ?>
    </div>

    <div class="er-book__info">
        <?php if (!empty($author)) : ?>
            <span class="er-book__author"><?php echo esc_html($author); ?></span>
        <?php endif; ?>
        <span class="er-book__title"><?php echo esc_html($title); ?></span>
    </div>

    <?php if (!empty($url)) : ?>
        <span class="er-book__arrow"><?php echo $arrow_svg; ?></span>
    <?php endif; ?>
</<?php echo $tag; ?>>
