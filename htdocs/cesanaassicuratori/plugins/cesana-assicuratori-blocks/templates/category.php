<?php
/**
 * Category Archive Template Override
 * Renders category pages using the cesana/category-posts block
 */

get_header();

// Render the category-posts block with default attributes
$attributes = array(
    'categorySlug'   => '',
    'postsPerPage'   => 9,
    'columns'        => 3,
    'showExcerpt'    => true,
    'showAuthor'     => true,
    'showDate'       => true,
    'showReadingTime' => true,
);

$block = array(
    'blockName' => 'cesana/category-posts',
    'attrs'     => $attributes,
);

echo render_block($block);

get_footer();
