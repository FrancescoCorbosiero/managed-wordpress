<?php
/**
 * Blog Cover Block — Server-side render
 * Cinematic editorial cover for blog posts with eyebrow, title, meta
 */

$eyebrow         = $attributes['eyebrow'] ?? '';
$title           = $attributes['title'] ?? '';
$excerpt         = $attributes['excerpt'] ?? '';
$author_name     = $attributes['authorName'] ?? '';
$date            = $attributes['date'] ?? '';
$reading_time    = $attributes['readingTime'] ?? '';
$bg_image        = $attributes['backgroundImage'] ?? '';
$overlay_opacity = $attributes['overlayOpacity'] ?? 70;
$text_align      = $attributes['textAlign'] ?? 'left';

// Use post title as fallback
if (empty($title)) {
    $title = get_the_title();
}

if (empty($title)) {
    return;
}

$align_class   = $text_align === 'center' ? ' er-blog-cover--center' : '';
$overlay_start = $overlay_opacity / 100;
$overlay_end   = max($overlay_start - 0.3, 0.1);

// Build meta items
$meta_parts = array();
if (!empty($author_name)) {
    $meta_parts[] = '<span class="er-blog-cover__meta-author">' . esc_html($author_name) . '</span>';
}
if (!empty($date)) {
    $meta_parts[] = '<time class="er-blog-cover__meta-date">' . esc_html($date) . '</time>';
}
if (!empty($reading_time)) {
    $meta_parts[] = '<span class="er-blog-cover__meta-reading">' . esc_html($reading_time) . '</span>';
}
?>
<section class="er-blog-cover<?php echo esc_attr($align_class); ?>" data-er-reveal>
    <?php if (!empty($bg_image)) : ?>
        <div class="er-blog-cover__bg">
            <img src="<?php echo esc_url($bg_image); ?>" alt="" loading="eager">
        </div>
    <?php endif; ?>
    <div class="er-blog-cover__overlay"
         style="background: linear-gradient(to top, rgba(10,10,10,<?php echo esc_attr($overlay_start); ?>) 0%, rgba(10,10,10,<?php echo esc_attr($overlay_end); ?>) 50%, rgba(10,10,10,0.2) 100%);">
    </div>

    <div class="er-blog-cover__content">
        <?php if (!empty($eyebrow)) : ?>
            <span class="er-blog-cover__eyebrow"><?php echo esc_html($eyebrow); ?></span>
        <?php endif; ?>

        <h1 class="er-blog-cover__title"><?php echo esc_html($title); ?></h1>

        <?php if (!empty($excerpt)) : ?>
            <p class="er-blog-cover__excerpt"><?php echo esc_html($excerpt); ?></p>
        <?php endif; ?>

        <div class="er-blog-cover__line"></div>

        <?php if (!empty($meta_parts)) : ?>
            <div class="er-blog-cover__meta">
                <?php echo implode('<span class="er-blog-cover__meta-sep">&middot;</span>', $meta_parts); ?>
            </div>
        <?php endif; ?>
    </div>
</section>
