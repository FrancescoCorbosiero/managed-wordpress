<?php
/**
 * Quote Banner Block — Server-side render
 * Editorial quote with decorative typography — book excerpts, reviews, author quotes
 */

$quote       = $attributes['quote'] ?? '';
$author_name = $attributes['authorName'] ?? '';
$author_role = $attributes['authorRole'] ?? '';
$source      = $attributes['sourceTitle'] ?? '';
$variant     = $attributes['variant'] ?? 'dark';

if (empty($quote)) {
    return;
}

$variant_class = 'er-quote--' . $variant;
?>
<section class="er-quote <?php echo esc_attr($variant_class); ?>" data-er-reveal>
    <div class="er-quote__deco" aria-hidden="true">&ldquo;</div>
    <div class="er-quote__content">
        <blockquote class="er-quote__text">
            <?php echo esc_html($quote); ?>
        </blockquote>

        <?php if (!empty($author_name) || !empty($source)) : ?>
            <footer class="er-quote__footer">
                <div class="er-quote__line"></div>
                <?php if (!empty($author_name)) : ?>
                    <cite class="er-quote__author"><?php echo esc_html($author_name); ?></cite>
                <?php endif; ?>
                <?php if (!empty($author_role)) : ?>
                    <span class="er-quote__role"><?php echo esc_html($author_role); ?></span>
                <?php endif; ?>
                <?php if (!empty($source)) : ?>
                    <span class="er-quote__source"><?php echo esc_html($source); ?></span>
                <?php endif; ?>
            </footer>
        <?php endif; ?>
    </div>
</section>
