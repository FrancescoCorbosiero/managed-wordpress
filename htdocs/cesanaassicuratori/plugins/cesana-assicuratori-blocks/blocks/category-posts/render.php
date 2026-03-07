<?php
/**
 * Category Posts Block — Server-side render
 * Card grid for pages in a category, with image and text-only variants
 */

$category_slug   = $attributes['categorySlug'] ?? '';
$posts_per_page  = $attributes['postsPerPage'] ?? 9;
$columns         = $attributes['columns'] ?? 3;
$show_image      = $attributes['showImage'] ?? true;
$show_excerpt    = $attributes['showExcerpt'] ?? true;
$show_author     = $attributes['showAuthor'] ?? true;
$show_date       = $attributes['showDate'] ?? true;
$show_reading    = $attributes['showReadingTime'] ?? true;

// Resolve category — from attribute, archive context, or bail
$category = null;
if (!empty($category_slug)) {
    $category = get_category_by_slug($category_slug);
} elseif (is_category()) {
    $category = get_queried_object();
}

if (!$category) {
    return;
}

// Query pages in this category (categories added to pages via plugin)
$paged = get_query_var('paged') ? get_query_var('paged') : 1;
$query_args = array(
    'post_type'      => 'page',
    'posts_per_page' => $posts_per_page,
    'paged'          => $paged,
    'post_status'    => 'publish',
    'tax_query'      => array(
        array(
            'taxonomy' => 'category',
            'field'    => 'term_id',
            'terms'    => $category->term_id,
        ),
    ),
);
$query = new WP_Query($query_args);

if (!$query->have_posts()) {
    echo '<section class="ca-block ca-category-posts">';
    echo '<div class="ca-category-posts__container">';
    echo '<div class="ca-category-posts__empty">';
    echo '<p>Nessun articolo trovato in questa categoria.</p>';
    echo '</div></div></section>';
    return;
}

// Reading time helper
if (!function_exists('ca_estimate_reading_time')) {
    function ca_estimate_reading_time($post_id) {
        $content = get_post_field('post_content', $post_id);
        $word_count = str_word_count(wp_strip_all_tags($content));
        $minutes = max(1, ceil($word_count / 200));
        return $minutes . ' min';
    }
}

$col_class = 'ca-category-posts__grid--' . intval($columns) . 'col';
$variant_class = $show_image ? '' : ' ca-category-posts--text-only';

// Arrow SVG
$arrow_svg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>';
?>
<section class="ca-block ca-category-posts<?php echo esc_attr($variant_class); ?>">
    <div class="ca-category-posts__container">

        <!-- Category Header -->
        <div class="ca-category-posts__header" data-ca-reveal="up">
            <span class="ca-category-posts__eyebrow"><?php echo esc_html__('Categoria', 'cesana-assicuratori-blocks'); ?></span>
            <h1 class="ca-category-posts__title" data-ca-text-reveal="words"><?php echo esc_html($category->name); ?></h1>
            <?php if (!empty($category->description)) : ?>
                <p class="ca-category-posts__description"><?php echo esc_html($category->description); ?></p>
            <?php endif; ?>
        </div>

        <!-- Posts Grid -->
        <div class="ca-category-posts__grid <?php echo esc_attr($col_class); ?>" data-ca-stagger data-ca-stagger-delay="80">
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <?php
                $post_id     = get_the_ID();
                $permalink   = get_permalink();
                $thumb_url   = $show_image ? get_the_post_thumbnail_url($post_id, 'medium_large') : '';
                $post_cats   = wp_get_post_terms($post_id, 'category');
                $first_cat   = (!is_wp_error($post_cats) && !empty($post_cats)) ? $post_cats[0]->name : '';
                $author_name = get_the_author();
                $post_date   = get_the_date('j M Y');
                $reading     = ca_estimate_reading_time($post_id);
                $excerpt     = get_the_excerpt();
                $card_class  = $show_image ? 'ca-post-card' : 'ca-post-card ca-post-card--text-only';
                ?>
                <a href="<?php echo esc_url($permalink); ?>" class="<?php echo esc_attr($card_class); ?>">
                    <?php if ($show_image) : ?>
                        <!-- Image -->
                        <div class="ca-post-card__image-wrap">
                            <?php if ($thumb_url) : ?>
                                <img src="<?php echo esc_url($thumb_url); ?>"
                                     alt="<?php echo esc_attr(get_the_title()); ?>"
                                     loading="lazy"
                                     width="600" height="400">
                            <?php else : ?>
                                <div class="ca-post-card__image-placeholder">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    </svg>
                                </div>
                            <?php endif; ?>

                            <?php if (!empty($first_cat)) : ?>
                                <span class="ca-post-card__badge"><?php echo esc_html($first_cat); ?></span>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>

                    <!-- Content -->
                    <div class="ca-post-card__content">
                        <?php if (!$show_image && !empty($first_cat)) : ?>
                            <span class="ca-post-card__badge ca-post-card__badge--inline"><?php echo esc_html($first_cat); ?></span>
                        <?php endif; ?>

                        <!-- Meta top -->
                        <div class="ca-post-card__meta-top">
                            <?php if ($show_date) : ?>
                                <time class="ca-post-card__date"><?php echo esc_html($post_date); ?></time>
                            <?php endif; ?>
                            <?php if ($show_reading) : ?>
                                <span class="ca-post-card__reading"><?php echo esc_html($reading); ?></span>
                            <?php endif; ?>
                        </div>

                        <h2 class="ca-post-card__title"><?php echo esc_html(get_the_title()); ?></h2>

                        <?php if ($show_excerpt && !empty($excerpt)) : ?>
                            <p class="ca-post-card__excerpt"><?php echo esc_html($excerpt); ?></p>
                        <?php endif; ?>

                        <!-- Footer -->
                        <div class="ca-post-card__footer">
                            <?php if ($show_author) : ?>
                                <span class="ca-post-card__author">
                                    <?php echo get_avatar($post_id, 28, '', '', array('class' => 'ca-post-card__avatar')); ?>
                                    <?php echo esc_html($author_name); ?>
                                </span>
                            <?php endif; ?>
                            <span class="ca-post-card__read-more">
                                Leggi <?php echo $arrow_svg; ?>
                            </span>
                        </div>
                    </div>
                </a>
            <?php endwhile; ?>
        </div>

        <!-- Pagination -->
        <?php if ($query->max_num_pages > 1) : ?>
            <nav class="ca-category-posts__pagination" data-ca-reveal="up">
                <?php
                echo paginate_links(array(
                    'total'     => $query->max_num_pages,
                    'current'   => $paged,
                    'prev_text' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>',
                    'next_text' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>',
                    'type'      => 'list',
                ));
                ?>
            </nav>
        <?php endif; ?>
    </div>
</section>
<?php wp_reset_postdata(); ?>
