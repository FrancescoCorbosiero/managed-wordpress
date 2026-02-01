<?php
/**
 * Product Carousel Shortcode
 *
 * WooCommerce product carousel using Swiper.js
 *
 * @package Golden_Hive_Blocks
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue Swiper assets and inline carousel styles
 */
function rp_enqueue_carousel_assets() {
    static $enqueued = false;

    if ($enqueued) {
        return;
    }

    // Enqueue Swiper CSS
    wp_enqueue_style(
        'swiper',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
        array(),
        '11.0.0'
    );

    // Enqueue Swiper JS
    wp_enqueue_script(
        'swiper',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
        array(),
        '11.0.0',
        true
    );

    // Add inline carousel styles
    wp_add_inline_style('swiper', rp_get_carousel_styles());

    $enqueued = true;
}

/**
 * Get all carousel CSS styles
 *
 * @return string CSS styles
 */
function rp_get_carousel_styles() {
    ob_start();
    ?>
/* ==========================================================================
   Product Carousel - Base Styles
   ========================================================================== */

/* Section Container */
.rp-carousel-section {
    --rp-section-padding: 3rem 0;
    --rp-section-bg: transparent;
    --rp-text-color: #1a1a1a;
    --rp-text-muted: #666;
    --rp-border-color: #e5e5e5;
    --rp-card-bg: #fff;
    --rp-accent: #000;
    --rp-gap: 16px;

    position: relative;
    padding: var(--rp-section-padding);
    background: var(--rp-section-bg);
    color: var(--rp-text-color);
}

/* Section Style Modifiers */
.rp-carousel-section.rp-carousel-section--dark {
    --rp-section-bg: #1a1a1a;
    --rp-text-color: #fff;
    --rp-text-muted: #999;
    --rp-border-color: #333;
    --rp-card-bg: #222;
}

.rp-carousel-section.rp-carousel-section--minimal {
    --rp-section-bg: #f8f8f8;
}

/* Container */
.rp-carousel-section__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
}

/* Header */
.rp-carousel-section__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.rp-carousel-section__title {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0;
    color: var(--rp-text-color);
}

.rp-carousel-section__link {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--rp-text-muted);
    text-decoration: none;
    transition: color 0.2s ease;
}

.rp-carousel-section__link:hover {
    color: var(--rp-text-color);
}

/* ==========================================================================
   Carousel Wrapper
   ========================================================================== */

.rp-carousel {
    position: relative;
}

/* Layout Modifiers */
.rp-carousel.rp-carousel--layout-centered .swiper {
    overflow: visible;
}

.rp-carousel.rp-carousel--layout-peek .swiper {
    overflow: visible;
    margin: 0 -2rem;
    padding: 0 2rem;
}

.rp-carousel.rp-carousel--layout-full-width {
    margin: 0 -1rem;
}

.rp-carousel.rp-carousel--layout-full-width .swiper-slide {
    padding: 0 0.5rem;
}

/* ==========================================================================
   Navigation Styles
   ========================================================================== */

/* Base Navigation Button */
.rp-carousel .swiper-button-prev,
.rp-carousel .swiper-button-next {
    --swiper-navigation-size: 20px;
    width: 44px;
    height: 44px;
    background: var(--rp-card-bg);
    border: 1px solid var(--rp-border-color);
    border-radius: 50%;
    color: var(--rp-text-color);
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.rp-carousel .swiper-button-prev:hover,
.rp-carousel .swiper-button-next:hover {
    background: var(--rp-accent);
    border-color: var(--rp-accent);
    color: #fff;
}

.rp-carousel .swiper-button-prev::after,
.rp-carousel .swiper-button-next::after {
    font-size: 14px;
    font-weight: 700;
}

.rp-carousel .swiper-button-disabled {
    opacity: 0.3;
    pointer-events: none;
}

/* Nav Style: Sides (default) */
.rp-carousel.rp-carousel--nav-sides .swiper-button-prev {
    left: -22px;
}

.rp-carousel.rp-carousel--nav-sides .swiper-button-next {
    right: -22px;
}

@media (max-width: 1200px) {
    .rp-carousel.rp-carousel--nav-sides .swiper-button-prev,
    .rp-carousel.rp-carousel--nav-sides .swiper-button-next {
        display: none;
    }
}

/* Nav Style: Bottom */
.rp-carousel.rp-carousel--nav-bottom {
    padding-bottom: 60px;
}

.rp-carousel.rp-carousel--nav-bottom .swiper-button-prev,
.rp-carousel.rp-carousel--nav-bottom .swiper-button-next {
    top: auto;
    bottom: 0;
    transform: none;
}

.rp-carousel.rp-carousel--nav-bottom .swiper-button-prev {
    left: calc(50% - 52px);
}

.rp-carousel.rp-carousel--nav-bottom .swiper-button-next {
    right: calc(50% - 52px);
}

/* Nav Style: Top Right */
.rp-carousel.rp-carousel--nav-top-right .rp-carousel__nav-wrapper {
    position: absolute;
    top: -60px;
    right: 0;
    display: flex;
    gap: 8px;
    z-index: 10;
}

.rp-carousel.rp-carousel--nav-top-right .swiper-button-prev,
.rp-carousel.rp-carousel--nav-top-right .swiper-button-next {
    position: static;
    margin: 0;
}

/* Nav Style: Integrated (inside cards area) */
.rp-carousel.rp-carousel--nav-integrated .swiper-button-prev,
.rp-carousel.rp-carousel--nav-integrated .swiper-button-next {
    top: 35%;
}

.rp-carousel.rp-carousel--nav-integrated .swiper-button-prev {
    left: 10px;
}

.rp-carousel.rp-carousel--nav-integrated .swiper-button-next {
    right: 10px;
}

/* Nav Style: None */
.rp-carousel.rp-carousel--nav-none .swiper-button-prev,
.rp-carousel.rp-carousel--nav-none .swiper-button-next {
    display: none !important;
}

/* Nav Shape: Square */
.rp-carousel.rp-carousel--nav-shape-square .swiper-button-prev,
.rp-carousel.rp-carousel--nav-shape-square .swiper-button-next {
    border-radius: 4px;
}

/* Nav Shape: Pill */
.rp-carousel.rp-carousel--nav-shape-pill .swiper-button-prev,
.rp-carousel.rp-carousel--nav-shape-pill .swiper-button-next {
    border-radius: 22px;
    width: 52px;
}

/* Nav Size: Small */
.rp-carousel.rp-carousel--nav-size-sm .swiper-button-prev,
.rp-carousel.rp-carousel--nav-size-sm .swiper-button-next {
    --swiper-navigation-size: 16px;
    width: 36px;
    height: 36px;
}

.rp-carousel.rp-carousel--nav-size-sm .swiper-button-prev::after,
.rp-carousel.rp-carousel--nav-size-sm .swiper-button-next::after {
    font-size: 12px;
}

/* Nav Size: Large */
.rp-carousel.rp-carousel--nav-size-lg .swiper-button-prev,
.rp-carousel.rp-carousel--nav-size-lg .swiper-button-next {
    --swiper-navigation-size: 24px;
    width: 52px;
    height: 52px;
}

.rp-carousel.rp-carousel--nav-size-lg .swiper-button-prev::after,
.rp-carousel.rp-carousel--nav-size-lg .swiper-button-next::after {
    font-size: 18px;
}

/* ==========================================================================
   Pagination Styles
   ========================================================================== */

.rp-carousel .swiper-pagination {
    position: relative;
    margin-top: 1.5rem;
    bottom: auto !important;
}

/* Dots (Bullets) */
.rp-carousel .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: var(--rp-border-color);
    opacity: 1;
    transition: all 0.2s ease;
}

.rp-carousel .swiper-pagination-bullet-active {
    background: var(--rp-accent);
}

/* Dots Style: Line */
.rp-carousel.rp-carousel--dots-line .swiper-pagination-bullet {
    width: 24px;
    height: 3px;
    border-radius: 2px;
}

/* Dots Style: Dash */
.rp-carousel.rp-carousel--dots-dash .swiper-pagination-bullet {
    width: 16px;
    height: 3px;
    border-radius: 2px;
}

.rp-carousel.rp-carousel--dots-dash .swiper-pagination-bullet-active {
    width: 32px;
}

/* Dots Style: Dynamic */
.rp-carousel.rp-carousel--dots-dynamic .swiper-pagination-bullet {
    transition: transform 0.2s ease, background 0.2s ease;
}

.rp-carousel.rp-carousel--dots-dynamic .swiper-pagination-bullet-active {
    transform: scale(1.4);
}

/* Fraction Pagination */
.rp-carousel .swiper-pagination-fraction {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--rp-text-muted);
}

.rp-carousel .swiper-pagination-current {
    color: var(--rp-text-color);
}

/* Progress Bar */
.rp-carousel .swiper-pagination-progressbar {
    position: relative;
    height: 3px;
    background: var(--rp-border-color);
    border-radius: 2px;
    top: auto !important;
    margin-top: 1.5rem;
}

.rp-carousel .swiper-pagination-progressbar-fill {
    background: var(--rp-accent);
    border-radius: 2px;
}

/* Autoplay Progress Bar */
.rp-carousel__autoplay-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--rp-border-color);
    z-index: 10;
}

.rp-carousel__autoplay-progress span {
    display: block;
    height: 100%;
    background: var(--rp-accent);
    width: 0;
    transition: width 0.1s linear;
}

/* ==========================================================================
   Product Card Styles
   ========================================================================== */

.rp-product-card {
    --card-radius: 8px;

    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--rp-card-bg);
    border-radius: var(--card-radius);
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
}

/* Card Radius Modifiers */
.rp-product-card.rp-product-card--radius-none { --card-radius: 0; }
.rp-product-card.rp-product-card--radius-sm { --card-radius: 4px; }
.rp-product-card.rp-product-card--radius-md { --card-radius: 8px; }
.rp-product-card.rp-product-card--radius-lg { --card-radius: 12px; }
.rp-product-card.rp-product-card--radius-xl { --card-radius: 16px; }

/* Card Hover Effects */
.rp-product-card.rp-product-card--hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.12);
}

.rp-product-card.rp-product-card--hover-zoom:hover .rp-product-card__image {
    transform: scale(1.08);
}

.rp-product-card.rp-product-card--hover-glow:hover {
    box-shadow: 0 0 0 3px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1);
}

.rp-product-card.rp-product-card--hover-border:hover {
    box-shadow: inset 0 0 0 2px var(--rp-accent);
}

/* Card Image Container */
.rp-product-card__image-wrapper {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    background: #f5f5f5;
}

.rp-product-card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

/* Card Badges */
.rp-product-card__badges {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    z-index: 2;
}

.rp-product-card__badge {
    display: inline-block;
    padding: 4px 10px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    border-radius: 3px;
    line-height: 1.2;
}

.rp-product-card__badge--sale {
    background: #dc2626;
    color: #fff;
}

.rp-product-card__badge--new {
    background: #16a34a;
    color: #fff;
}

.rp-product-card__badge--featured {
    background: #000;
    color: #fff;
}

.rp-product-card__badge--out-of-stock {
    background: #6b7280;
    color: #fff;
}

/* Discount Badge */
.rp-product-card__discount {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #dc2626;
    color: #fff;
    padding: 4px 8px;
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 3px;
    z-index: 2;
}

/* Quick Add Button (overlay) */
.rp-product-card__quick-add {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    padding: 10px;
    background: var(--rp-accent);
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    z-index: 2;
}

.rp-product-card:hover .rp-product-card__quick-add {
    opacity: 1;
    transform: translateY(0);
}

.rp-product-card__quick-add:hover {
    background: #333;
}

/* Card Content */
.rp-product-card__content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem;
    gap: 0.5rem;
}

/* Brand */
.rp-product-card__brand {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--rp-text-muted);
    margin: 0;
}

/* Title */
.rp-product-card__title {
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.3;
    color: var(--rp-text-color);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Price */
.rp-product-card__price {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: auto;
}

.rp-product-card__price-current {
    font-size: 1rem;
    font-weight: 700;
    color: var(--rp-text-color);
}

.rp-product-card__price-original {
    font-size: 0.85rem;
    color: var(--rp-text-muted);
    text-decoration: line-through;
}

/* Rating */
.rp-product-card__rating {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 0.25rem;
}

.rp-product-card__stars {
    color: #fbbf24;
    font-size: 0.8rem;
}

.rp-product-card__rating-count {
    font-size: 0.75rem;
    color: var(--rp-text-muted);
}

/* Sizes */
.rp-product-card__sizes {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 0.5rem;
}

.rp-product-card__size {
    padding: 3px 6px;
    font-size: 0.65rem;
    font-weight: 500;
    background: var(--rp-section-bg, #f5f5f5);
    border-radius: 3px;
    color: var(--rp-text-muted);
}

/* ==========================================================================
   Card Text: Centered - IMPORTANT: Higher specificity for override
   ========================================================================== */

.rp-carousel-section .rp-product-card.rp-product-card--text-centered .rp-product-card__content {
    text-align: center;
    align-items: center;
}

.rp-carousel-section .rp-product-card.rp-product-card--text-centered .rp-product-card__title {
    font-size: 1.1rem;
    font-weight: 700;
}

.rp-carousel-section .rp-product-card.rp-product-card--text-centered .rp-product-card__price {
    justify-content: center;
}

.rp-carousel-section .rp-product-card.rp-product-card--text-centered .rp-product-card__price-current {
    font-size: 1.2rem;
}

.rp-carousel-section .rp-product-card.rp-product-card--text-centered .rp-product-card__brand {
    text-align: center;
}

.rp-carousel-section .rp-product-card.rp-product-card--text-centered .rp-product-card__rating {
    justify-content: center;
}

.rp-carousel-section .rp-product-card.rp-product-card--text-centered .rp-product-card__sizes {
    justify-content: center;
}

/* ==========================================================================
   Card Style Variants
   ========================================================================== */

/* Minimal Card */
.rp-product-card.rp-product-card--minimal {
    background: transparent;
    border-radius: 0;
}

.rp-product-card.rp-product-card--minimal .rp-product-card__content {
    padding: 0.75rem 0;
}

.rp-product-card.rp-product-card--minimal .rp-product-card__image-wrapper {
    border-radius: var(--card-radius);
}

/* Overlay Card */
.rp-product-card.rp-product-card--overlay {
    position: relative;
}

.rp-product-card.rp-product-card--overlay .rp-product-card__image-wrapper {
    height: 100%;
}

.rp-product-card.rp-product-card--overlay .rp-product-card__content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
    color: #fff;
    padding: 2rem 1rem 1rem;
}

.rp-product-card.rp-product-card--overlay .rp-product-card__title,
.rp-product-card.rp-product-card--overlay .rp-product-card__price-current {
    color: #fff;
}

.rp-product-card.rp-product-card--overlay .rp-product-card__brand,
.rp-product-card.rp-product-card--overlay .rp-product-card__price-original {
    color: rgba(255,255,255,0.7);
}

/* Detailed Card */
.rp-product-card.rp-product-card--detailed {
    border: 1px solid var(--rp-border-color);
}

.rp-product-card.rp-product-card--detailed .rp-product-card__content {
    padding: 1.25rem;
}

/* Horizontal Card */
.rp-product-card.rp-product-card--horizontal {
    flex-direction: row;
}

.rp-product-card.rp-product-card--horizontal .rp-product-card__image-wrapper {
    width: 40%;
    flex-shrink: 0;
    aspect-ratio: auto;
}

.rp-product-card.rp-product-card--horizontal .rp-product-card__content {
    justify-content: center;
}

/* ==========================================================================
   Gap Modifiers
   ========================================================================== */

.rp-carousel.rp-carousel--gap-none .swiper { --rp-gap: 0; }
.rp-carousel.rp-carousel--gap-sm .swiper { --rp-gap: 8px; }
.rp-carousel.rp-carousel--gap-md .swiper { --rp-gap: 16px; }
.rp-carousel.rp-carousel--gap-lg .swiper { --rp-gap: 24px; }
.rp-carousel.rp-carousel--gap-xl .swiper { --rp-gap: 32px; }

/* ==========================================================================
   Effect Modifiers
   ========================================================================== */

.rp-carousel.rp-carousel--effect-coverflow .swiper-slide {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.rp-carousel.rp-carousel--effect-fade .swiper-slide {
    opacity: 0;
    transition: opacity 0.4s ease;
}

.rp-carousel.rp-carousel--effect-fade .swiper-slide-active {
    opacity: 1;
}

/* ==========================================================================
   Responsive Adjustments
   ========================================================================== */

@media (max-width: 768px) {
    .rp-carousel-section {
        --rp-section-padding: 2rem 0;
    }

    .rp-carousel-section__title {
        font-size: 1.5rem;
    }

    .rp-product-card__content {
        padding: 0.75rem;
    }

    .rp-product-card__title {
        font-size: 0.85rem;
    }

    .rp-product-card__price-current {
        font-size: 0.9rem;
    }

    /* Centered text mobile adjustments */
    .rp-carousel-section .rp-product-card.rp-product-card--text-centered .rp-product-card__title {
        font-size: 1rem;
    }

    .rp-carousel-section .rp-product-card.rp-product-card--text-centered .rp-product-card__price-current {
        font-size: 1.05rem;
    }

    /* Hide top-right nav on mobile, show bottom */
    .rp-carousel.rp-carousel--nav-top-right .rp-carousel__nav-wrapper {
        top: auto;
        bottom: -50px;
        right: 50%;
        transform: translateX(50%);
    }
}

@media (max-width: 480px) {
    .rp-product-card__quick-add {
        display: none;
    }

    .rp-product-card__sizes {
        display: none;
    }
}
    <?php
    return ob_get_clean();
}

/**
 * Get carousel products via WP_Query
 *
 * @param array $args Shortcode attributes
 * @return WP_Query
 */
function rp_get_carousel_products($args) {
    $query_args = array(
        'post_type'      => 'product',
        'post_status'    => 'publish',
        'posts_per_page' => intval($args['limit']),
        'orderby'        => 'date',
        'order'          => 'DESC',
    );

    // Product type filters
    switch ($args['type']) {
        case 'featured':
            $query_args['tax_query'][] = array(
                'taxonomy' => 'product_visibility',
                'field'    => 'name',
                'terms'    => 'featured',
            );
            break;

        case 'on_sale':
            $query_args['meta_query'][] = array(
                'key'     => '_sale_price',
                'value'   => '',
                'compare' => '!=',
            );
            break;

        case 'best_selling':
            $query_args['meta_key'] = 'total_sales';
            $query_args['orderby']  = 'meta_value_num';
            break;

        case 'top_rated':
            $query_args['meta_key'] = '_wc_average_rating';
            $query_args['orderby']  = 'meta_value_num';
            break;

        case 'recent':
        default:
            // Default ordering by date
            break;
    }

    // Category filter
    if (!empty($args['category'])) {
        $query_args['tax_query'][] = array(
            'taxonomy' => 'product_cat',
            'field'    => 'slug',
            'terms'    => array_map('trim', explode(',', $args['category'])),
        );
    }

    // Tag filter
    if (!empty($args['tag'])) {
        $query_args['tax_query'][] = array(
            'taxonomy' => 'product_tag',
            'field'    => 'slug',
            'terms'    => array_map('trim', explode(',', $args['tag'])),
        );
    }

    // Brand filter (for plugins like Perfect Brands)
    if (!empty($args['brand'])) {
        $query_args['tax_query'][] = array(
            'taxonomy' => 'pwb-brand',
            'field'    => 'slug',
            'terms'    => array_map('trim', explode(',', $args['brand'])),
        );
    }

    // Specific product IDs
    if (!empty($args['ids'])) {
        $query_args['post__in'] = array_map('intval', explode(',', $args['ids']));
        $query_args['orderby']  = 'post__in';
    }

    // Set tax_query relation if multiple taxonomies
    if (!empty($query_args['tax_query']) && count($query_args['tax_query']) > 1) {
        $query_args['tax_query']['relation'] = 'AND';
    }

    return new WP_Query($query_args);
}

/**
 * Render a single product card
 *
 * @param WC_Product $product Product object
 * @param array $args Shortcode attributes
 * @return string HTML
 */
function rp_render_product_card($product, $args) {
    $card_classes = array('rp-product-card');

    // Card style modifier
    if ($args['card_style'] !== 'default') {
        $card_classes[] = 'rp-product-card--' . sanitize_html_class($args['card_style']);
    }

    // Card text alignment modifier
    if ($args['card_text'] !== 'default') {
        $card_classes[] = 'rp-product-card--text-' . sanitize_html_class($args['card_text']);
    }

    // Card hover effect modifier
    if ($args['card_hover'] !== 'none') {
        $card_classes[] = 'rp-product-card--hover-' . sanitize_html_class($args['card_hover']);
    }

    // Card radius modifier
    if ($args['card_radius'] !== 'md') {
        $card_classes[] = 'rp-product-card--radius-' . sanitize_html_class($args['card_radius']);
    }

    $permalink = get_permalink($product->get_id());
    $image_id  = $product->get_image_id();
    $image_url = $image_id ? wp_get_attachment_image_url($image_id, 'woocommerce_thumbnail') : wc_placeholder_img_src();

    ob_start();
    ?>
    <a href="<?php echo esc_url($permalink); ?>" class="<?php echo esc_attr(implode(' ', $card_classes)); ?>">
        <div class="rp-product-card__image-wrapper">
            <img src="<?php echo esc_url($image_url); ?>"
                 alt="<?php echo esc_attr($product->get_name()); ?>"
                 class="rp-product-card__image"
                 loading="lazy">

            <?php if ($args['show_badges']) : ?>
                <?php echo rp_render_product_badges($product); ?>
            <?php endif; ?>

            <?php if ($args['show_discount'] && $product->is_on_sale()) : ?>
                <?php echo rp_render_discount_badge($product); ?>
            <?php endif; ?>

            <?php if ($args['show_cart_btn'] && $product->is_in_stock()) : ?>
                <button type="button" class="rp-product-card__quick-add"
                        data-product-id="<?php echo esc_attr($product->get_id()); ?>">
                    Aggiungi al Carrello
                </button>
            <?php endif; ?>
        </div>

        <div class="rp-product-card__content">
            <?php if ($args['show_brand']) : ?>
                <?php echo rp_render_product_brand($product); ?>
            <?php endif; ?>

            <h3 class="rp-product-card__title"><?php echo esc_html($product->get_name()); ?></h3>

            <div class="rp-product-card__price">
                <?php if ($product->is_on_sale()) : ?>
                    <span class="rp-product-card__price-current"><?php echo wp_kses_post(wc_price($product->get_sale_price())); ?></span>
                    <span class="rp-product-card__price-original"><?php echo wp_kses_post(wc_price($product->get_regular_price())); ?></span>
                <?php else : ?>
                    <span class="rp-product-card__price-current"><?php echo wp_kses_post(wc_price($product->get_price())); ?></span>
                <?php endif; ?>
            </div>

            <?php if ($args['show_rating'] && $product->get_average_rating() > 0) : ?>
                <?php echo rp_render_product_rating($product); ?>
            <?php endif; ?>

            <?php if ($args['show_sizes']) : ?>
                <?php echo rp_render_product_sizes($product); ?>
            <?php endif; ?>
        </div>
    </a>
    <?php
    return ob_get_clean();
}

/**
 * Render product badges
 */
function rp_render_product_badges($product) {
    $badges = array();

    if ($product->is_on_sale()) {
        $badges[] = '<span class="rp-product-card__badge rp-product-card__badge--sale">Saldo</span>';
    }

    // Check if product is new (within last 30 days)
    $post_date = get_post_time('U', false, $product->get_id());
    if ((time() - $post_date) < (30 * DAY_IN_SECONDS)) {
        $badges[] = '<span class="rp-product-card__badge rp-product-card__badge--new">Nuovo</span>';
    }

    if ($product->is_featured()) {
        $badges[] = '<span class="rp-product-card__badge rp-product-card__badge--featured">Top</span>';
    }

    if (!$product->is_in_stock()) {
        $badges[] = '<span class="rp-product-card__badge rp-product-card__badge--out-of-stock">Esaurito</span>';
    }

    if (empty($badges)) {
        return '';
    }

    return '<div class="rp-product-card__badges">' . implode('', $badges) . '</div>';
}

/**
 * Render discount percentage badge
 */
function rp_render_discount_badge($product) {
    if (!$product->is_on_sale()) {
        return '';
    }

    $regular = (float) $product->get_regular_price();
    $sale    = (float) $product->get_sale_price();

    if ($regular <= 0) {
        return '';
    }

    $percentage = round((($regular - $sale) / $regular) * 100);

    return '<span class="rp-product-card__discount">-' . $percentage . '%</span>';
}

/**
 * Render product brand
 */
function rp_render_product_brand($product) {
    // Try Perfect Brands for WooCommerce
    $brands = wp_get_post_terms($product->get_id(), 'pwb-brand');

    if (!empty($brands) && !is_wp_error($brands)) {
        return '<p class="rp-product-card__brand">' . esc_html($brands[0]->name) . '</p>';
    }

    return '';
}

/**
 * Render product rating
 */
function rp_render_product_rating($product) {
    $rating = $product->get_average_rating();
    $count  = $product->get_review_count();

    if ($rating <= 0) {
        return '';
    }

    $full_stars  = floor($rating);
    $half_star   = ($rating - $full_stars) >= 0.5 ? 1 : 0;
    $empty_stars = 5 - $full_stars - $half_star;

    $stars = str_repeat('★', $full_stars);
    if ($half_star) {
        $stars .= '½';
    }
    $stars .= str_repeat('☆', $empty_stars);

    return sprintf(
        '<div class="rp-product-card__rating">
            <span class="rp-product-card__stars">%s</span>
            <span class="rp-product-card__rating-count">(%d)</span>
        </div>',
        $stars,
        $count
    );
}

/**
 * Render product sizes (for variable products)
 */
function rp_render_product_sizes($product) {
    if (!$product->is_type('variable')) {
        return '';
    }

    $sizes = array();
    $attributes = $product->get_variation_attributes();

    // Look for size attribute
    foreach ($attributes as $attr_name => $options) {
        $attr_lower = strtolower($attr_name);
        if (strpos($attr_lower, 'size') !== false || strpos($attr_lower, 'taglia') !== false) {
            $sizes = $options;
            break;
        }
    }

    if (empty($sizes)) {
        return '';
    }

    // Limit to first 6 sizes
    $sizes = array_slice($sizes, 0, 6);

    $html = '<div class="rp-product-card__sizes">';
    foreach ($sizes as $size) {
        $html .= '<span class="rp-product-card__size">' . esc_html($size) . '</span>';
    }
    if (count($attributes) > 6) {
        $html .= '<span class="rp-product-card__size">+</span>';
    }
    $html .= '</div>';

    return $html;
}

/**
 * Generate Swiper.js configuration
 *
 * @param string $carousel_id Unique carousel ID
 * @param array $args Shortcode attributes
 * @return string JavaScript code
 */
function rp_generate_swiper_config($carousel_id, $args) {
    $gap_values = array(
        'none' => 0,
        'sm'   => 8,
        'md'   => 16,
        'lg'   => 24,
        'xl'   => 32,
    );

    $space_between = $gap_values[$args['gap']] ?? 16;

    $config = array(
        'slidesPerView'  => intval($args['columns_mobile']),
        'spaceBetween'   => $space_between,
        'loop'           => $args['loop'] === 'true',
        'grabCursor'     => $args['grab_cursor'] === 'true',
        'keyboard'       => $args['keyboard'] === 'true' ? array('enabled' => true) : false,
        'mousewheel'     => $args['mousewheel'] === 'true' ? array('forceToAxis' => true) : false,
        'freeMode'       => $args['free_mode'] === 'true' ? array('enabled' => true, 'sticky' => true) : false,
    );

    // Effect
    if ($args['effect'] !== 'slide') {
        $config['effect'] = $args['effect'];
        if ($args['effect'] === 'fade') {
            $config['fadeEffect'] = array('crossFade' => true);
        }
        if ($args['effect'] === 'coverflow') {
            $config['coverflowEffect'] = array(
                'rotate'       => 30,
                'stretch'      => 0,
                'depth'        => 100,
                'modifier'     => 1,
                'slideShadows' => false,
            );
        }
    }

    // Grid for multiple rows
    if (intval($args['rows']) > 1) {
        $config['grid'] = array(
            'rows' => intval($args['rows']),
            'fill' => 'row',
        );
    }

    // Navigation
    if ($args['nav_style'] !== 'none') {
        $config['navigation'] = array(
            'nextEl' => '#' . $carousel_id . ' .swiper-button-next',
            'prevEl' => '#' . $carousel_id . ' .swiper-button-prev',
        );
    }

    // Pagination
    if ($args['pagination'] !== 'none') {
        $pagination_type = $args['pagination'];
        if ($pagination_type === 'dots') {
            $pagination_type = 'bullets';
        }

        $config['pagination'] = array(
            'el'        => '#' . $carousel_id . ' .swiper-pagination',
            'type'      => $pagination_type,
            'clickable' => true,
        );

        if ($args['dots_style'] === 'dynamic') {
            $config['pagination']['dynamicBullets'] = true;
        }
    }

    // Autoplay
    if ($args['autoplay'] === 'true') {
        $config['autoplay'] = array(
            'delay'             => intval($args['speed']) * 1000,
            'disableOnInteraction' => false,
            'pauseOnMouseEnter' => true,
        );
    }

    // Speed
    $config['speed'] = 400;

    // Responsive breakpoints
    $config['breakpoints'] = array(
        0 => array(
            'slidesPerView' => intval($args['columns_mobile']),
            'spaceBetween'  => max(8, $space_between - 8),
        ),
        640 => array(
            'slidesPerView' => intval($args['columns_mobile']),
            'spaceBetween'  => $space_between,
        ),
        768 => array(
            'slidesPerView' => intval($args['columns_tablet']),
            'spaceBetween'  => $space_between,
        ),
        1024 => array(
            'slidesPerView' => intval($args['columns']),
            'spaceBetween'  => $space_between,
        ),
    );

    $json_config = wp_json_encode($config);

    $script = "
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Swiper !== 'undefined') {
        var carousel = document.getElementById('{$carousel_id}');
        if (carousel) {
            var swiper = new Swiper('#{$carousel_id} .swiper', {$json_config});
            ";

    // Autoplay progress bar
    if ($args['autoplay'] === 'true' && $args['autoplay_bar'] === 'true') {
        $script .= "
            var progressBar = carousel.querySelector('.rp-carousel__autoplay-progress span');
            if (progressBar) {
                swiper.on('autoplayTimeLeft', function(s, time, progress) {
                    progressBar.style.width = ((1 - progress) * 100) + '%';
                });
            }
            ";
    }

    $script .= "
        }
    }
});
";

    return $script;
}

/**
 * Main shortcode handler
 *
 * @param array $atts Shortcode attributes
 * @return string HTML output
 */
function rp_carousel_section_shortcode($atts) {
    // Check WooCommerce
    if (!class_exists('WooCommerce')) {
        return '<p>WooCommerce is required for the product carousel.</p>';
    }

    // Parse attributes with defaults
    $args = shortcode_atts(array(
        // Section options
        'title'         => '',
        'link_text'     => '',
        'link_url'      => '',
        'style'         => 'default', // default|dark|minimal

        // Navigation options
        'nav_style'     => 'sides',   // bottom|sides|top-right|integrated|none
        'nav_shape'     => 'circle',  // circle|square|pill
        'nav_size'      => 'md',      // sm|md|lg

        // Pagination options
        'pagination'    => 'none',    // dots|fraction|progressbar|none
        'dots_style'    => 'default', // default|line|dash|dynamic

        // Effect & Layout
        'effect'        => 'slide',   // slide|fade|coverflow
        'layout'        => 'standard', // standard|centered|peek|full-width

        // Card options
        'card_style'    => 'default', // default|minimal|overlay|detailed|horizontal
        'card_hover'    => 'lift',    // lift|zoom|glow|border|none
        'card_radius'   => 'md',      // none|sm|md|lg|xl
        'card_text'     => 'default', // default|centered

        // Grid options
        'columns'        => '4',
        'columns_tablet' => '3',
        'columns_mobile' => '2',
        'gap'            => 'md',     // none|sm|md|lg|xl
        'rows'           => '1',

        // Behavior options
        'autoplay'       => 'false',
        'speed'          => '5',      // seconds between slides
        'loop'           => 'true',
        'free_mode'      => 'false',
        'mousewheel'     => 'false',
        'keyboard'       => 'true',
        'grab_cursor'    => 'true',
        'autoplay_bar'   => 'false',

        // Product query
        'type'           => 'recent', // recent|featured|on_sale|best_selling|top_rated
        'limit'          => '8',
        'category'       => '',
        'tag'            => '',
        'brand'          => '',
        'ids'            => '',

        // Card content
        'show_brand'     => 'true',
        'show_sizes'     => 'false',
        'show_badges'    => 'true',
        'show_rating'    => 'false',
        'show_cart_btn'  => 'false',
        'show_discount'  => 'true',
    ), $atts, 'product_carousel');

    // Convert string booleans
    foreach (array('show_brand', 'show_sizes', 'show_badges', 'show_rating', 'show_cart_btn', 'show_discount') as $key) {
        $args[$key] = filter_var($args[$key], FILTER_VALIDATE_BOOLEAN);
    }

    // Enqueue assets
    rp_enqueue_carousel_assets();

    // Get products
    $products_query = rp_get_carousel_products($args);

    if (!$products_query->have_posts()) {
        return '';
    }

    // Generate unique ID
    $carousel_id = 'rp-carousel-' . wp_unique_id();

    // Build section classes
    $section_classes = array('rp-carousel-section');
    if ($args['style'] !== 'default') {
        $section_classes[] = 'rp-carousel-section--' . sanitize_html_class($args['style']);
    }

    // Build carousel classes
    $carousel_classes = array('rp-carousel');
    $carousel_classes[] = 'rp-carousel--nav-' . sanitize_html_class($args['nav_style']);
    $carousel_classes[] = 'rp-carousel--nav-shape-' . sanitize_html_class($args['nav_shape']);
    $carousel_classes[] = 'rp-carousel--nav-size-' . sanitize_html_class($args['nav_size']);
    $carousel_classes[] = 'rp-carousel--layout-' . sanitize_html_class($args['layout']);
    $carousel_classes[] = 'rp-carousel--gap-' . sanitize_html_class($args['gap']);
    $carousel_classes[] = 'rp-carousel--effect-' . sanitize_html_class($args['effect']);

    if ($args['dots_style'] !== 'default' && $args['pagination'] === 'dots') {
        $carousel_classes[] = 'rp-carousel--dots-' . sanitize_html_class($args['dots_style']);
    }

    ob_start();
    ?>
    <section class="<?php echo esc_attr(implode(' ', $section_classes)); ?>" id="<?php echo esc_attr($carousel_id); ?>">
        <div class="rp-carousel-section__container">
            <?php if (!empty($args['title']) || !empty($args['link_text'])) : ?>
                <header class="rp-carousel-section__header">
                    <?php if (!empty($args['title'])) : ?>
                        <h2 class="rp-carousel-section__title"><?php echo esc_html($args['title']); ?></h2>
                    <?php endif; ?>

                    <?php if (!empty($args['link_text']) && !empty($args['link_url'])) : ?>
                        <a href="<?php echo esc_url($args['link_url']); ?>" class="rp-carousel-section__link">
                            <?php echo esc_html($args['link_text']); ?> →
                        </a>
                    <?php endif; ?>
                </header>
            <?php endif; ?>

            <div class="<?php echo esc_attr(implode(' ', $carousel_classes)); ?>">
                <?php if ($args['nav_style'] === 'top-right') : ?>
                    <div class="rp-carousel__nav-wrapper">
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>
                <?php endif; ?>

                <div class="swiper">
                    <div class="swiper-wrapper">
                        <?php while ($products_query->have_posts()) : $products_query->the_post(); ?>
                            <?php $product = wc_get_product(get_the_ID()); ?>
                            <?php if ($product) : ?>
                                <div class="swiper-slide">
                                    <?php echo rp_render_product_card($product, $args); ?>
                                </div>
                            <?php endif; ?>
                        <?php endwhile; ?>
                    </div>

                    <?php if ($args['nav_style'] !== 'none' && $args['nav_style'] !== 'top-right') : ?>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    <?php endif; ?>

                    <?php if ($args['pagination'] !== 'none') : ?>
                        <div class="swiper-pagination"></div>
                    <?php endif; ?>
                </div>

                <?php if ($args['autoplay'] === 'true' && $args['autoplay_bar'] === 'true') : ?>
                    <div class="rp-carousel__autoplay-progress"><span></span></div>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <script>
    <?php echo rp_generate_swiper_config($carousel_id, $args); ?>
    </script>
    <?php

    wp_reset_postdata();

    return ob_get_clean();
}
add_shortcode('product_carousel', 'rp_carousel_section_shortcode');
