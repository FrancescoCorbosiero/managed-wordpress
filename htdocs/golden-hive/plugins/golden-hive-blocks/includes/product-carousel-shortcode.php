<?php
/**
 * Product Carousel Shortcode
 *
 * WooCommerce product carousels using Swiper.js
 *
 * @package Golden_Hive_Blocks
 * @version 2.1.0
 *
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                         ALL AVAILABLE OPTIONS                              ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║ SECTION STYLING                                                            ║
 * ║ ─────────────────────────────────────────────────────────────────────────  ║
 * ║ style          = default|dark|minimal                                     ║
 * ║ header_align   = left|center (centered title & subtitle)                  ║
 * ║                                                                            ║
 * ║ NAVIGATION OPTIONS                                                         ║
 * ║ ─────────────────────────────────────────────────────────────────────────  ║
 * ║ nav_style      = bottom|sides|top-right|integrated|none                   ║
 * ║ nav_shape      = circle|square|pill                                       ║
 * ║ nav_size       = sm|md|lg                                                 ║
 * ║ show_nav       = true|false                                               ║
 * ║                                                                            ║
 * ║ PAGINATION OPTIONS                                                         ║
 * ║ ─────────────────────────────────────────────────────────────────────────  ║
 * ║ pagination     = dots|fraction|progressbar|none                           ║
 * ║ dots_style     = default|line|dash|dynamic                                ║
 * ║                                                                            ║
 * ║ SLIDER EFFECTS                                                             ║
 * ║ ─────────────────────────────────────────────────────────────────────────  ║
 * ║ effect         = slide|fade|coverflow                                     ║
 * ║                                                                            ║
 * ║ CARD STYLES                                                                ║
 * ║ ─────────────────────────────────────────────────────────────────────────  ║
 * ║ card_style     = default|minimal|overlay|detailed|horizontal              ║
 * ║ card_hover     = lift|zoom|glow|border|none                               ║
 * ║ card_radius    = none|sm|md|lg|xl                                         ║
 * ║ card_text      = default|centered (bigger & centered text)                ║
 * ║                                                                            ║
 * ║ LAYOUT OPTIONS                                                             ║
 * ║ ─────────────────────────────────────────────────────────────────────────  ║
 * ║ layout         = standard|centered|peek|full-width                        ║
 * ║ columns        = 2|3|4|5|6 (desktop)                                      ║
 * ║ columns_tablet = 2|3|4 (tablet)                                           ║
 * ║ columns_mobile = 1|2 (mobile)                                             ║
 * ║ gap            = none|sm|md|lg|xl                                         ║
 * ║ rows           = 1|2 (multi-row grid)                                     ║
 * ║                                                                            ║
 * ║ BEHAVIOR OPTIONS                                                           ║
 * ║ ─────────────────────────────────────────────────────────────────────────  ║
 * ║ autoplay       = true|false                                               ║
 * ║ speed          = 3000|4000|5000|... (ms)                                  ║
 * ║ loop           = true|false                                               ║
 * ║ free_mode      = true|false (momentum scrolling)                          ║
 * ║ mousewheel     = true|false                                               ║
 * ║ keyboard       = true|false                                               ║
 * ║ grab_cursor    = true|false                                               ║
 * ║ autoplay_bar   = true|false (show progress bar during autoplay)           ║
 * ║                                                                            ║
 * ║ PRODUCT OPTIONS                                                            ║
 * ║ ─────────────────────────────────────────────────────────────────────────  ║
 * ║ type           = recent|best_selling|featured|sale|top_rated              ║
 * ║ limit          = 4|8|12|16|...                                            ║
 * ║ category       = slug1,slug2,...                                          ║
 * ║ tag            = slug1,slug2,...                                          ║
 * ║ brand          = slug1,slug2,...                                          ║
 * ║ ids            = 123,456,789,...                                          ║
 * ║ show_brand     = true|false                                               ║
 * ║ show_sizes     = true|false                                               ║
 * ║ show_badges    = true|false                                               ║
 * ║ show_rating    = true|false                                               ║
 * ║ show_cart_btn  = true|false                                               ║
 * ║ show_discount  = true|false                                               ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 *
 * USAGE EXAMPLES:
 * ───────────────
 * // Classic bottom navigation
 * [carousel_section title="Best Sellers" type="best_selling" nav_style="bottom"]
 *
 * // Coverflow effect with side arrows
 * [carousel_section title="Featured" type="featured" effect="coverflow" nav_style="sides"]
 *
 * // Top-right navigation
 * [carousel_section title="New In" type="recent" nav_style="top-right"]
 *
 * // Minimal style with progress bar
 * [carousel_section title="Sale" type="sale" style="minimal" pagination="progressbar"]
 *
 * // Dark theme with overlay cards
 * [carousel_section title="Nike" brand="nike" style="dark" card_style="overlay"]
 *
 * // Multi-row grid
 * [carousel_section title="All Products" type="recent" rows="2" limit="16"]
 *
 * // Autoplay with progress bar
 * [carousel_section title="Highlights" type="featured" autoplay="true" autoplay_bar="true"]
 *
 * // Bigger centered text
 * [carousel_section title="Collection" type="recent" card_text="centered"]
 *
 * // Centered header
 * [carousel_section title="Our Collection" subtitle="Discover the latest" header_align="center" nav_style="bottom"]
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 1. ENQUEUE ASSETS
 * ═══════════════════════════════════════════════════════════════
 */
add_action('wp_enqueue_scripts', 'ghb_enqueue_carousel_assets');

function ghb_enqueue_carousel_assets() {
    wp_enqueue_style(
        'swiper-css',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
        array(),
        '11.0.0'
    );

    wp_enqueue_script(
        'swiper-js',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
        array(),
        '11.0.0',
        true
    );

    wp_add_inline_style('swiper-css', ghb_get_carousel_styles());
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 2. COMPREHENSIVE CSS STYLES
 * ═══════════════════════════════════════════════════════════════
 */
function ghb_get_carousel_styles() {
    return '
    /* ═══════════════════════════════════════════════════════════
       CSS CUSTOM PROPERTIES (Theme Variables)
       ═══════════════════════════════════════════════════════════ */
    :root {
        --ghb-primary: #0a0a0a;
        --ghb-accent: #f5a623;
        --ghb-danger: #e53e3e;
        --ghb-success: #38a169;
        --ghb-light: #f5f5f5;
        --ghb-border: #e5e5e5;
        --ghb-text: #0a0a0a;
        --ghb-text-muted: #666666;
        --ghb-white: #ffffff;
        --ghb-shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
        --ghb-shadow-md: 0 4px 12px rgba(0,0,0,0.1);
        --ghb-shadow-lg: 0 12px 40px rgba(0,0,0,0.12);
        --ghb-radius-sm: 6px;
        --ghb-radius-md: 12px;
        --ghb-radius-lg: 20px;
        --ghb-radius-xl: 28px;
        --ghb-transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* ═══════════════════════════════════════════════════════════
       BASE SECTION STYLES
       ═══════════════════════════════════════════════════════════ */
    .ghb-carousel-section {
        position: relative;
        padding: 3rem 0;
        overflow: hidden;
    }

    .ghb-carousel-section__container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 20px;
    }

    /* Full-width layout */
    .ghb-carousel-section--layout-full-width .ghb-carousel-section__container {
        max-width: 100%;
        padding: 0 40px;
    }

    /* Peek layout - show partial slides on edges */
    .ghb-carousel-section--layout-peek .ghb-carousel-section__container {
        max-width: 100%;
        padding: 0;
    }
    .ghb-carousel-section--layout-peek .ghb-carousel__wrapper {
        padding: 0 5%;
    }

    /* ═══════════════════════════════════════════════════════════
       HEADER STYLES
       ═══════════════════════════════════════════════════════════ */
    .ghb-carousel-section__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .ghb-carousel-section__header-left {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 1;
    }

    .ghb-carousel-section__header-right {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .ghb-carousel-section__title {
        font-size: clamp(1.25rem, 4vw, 1.75rem);
        font-weight: 700;
        margin: 0;
        letter-spacing: -0.02em;
        line-height: 1.2;
    }

    .ghb-carousel-section__subtitle {
        font-size: 0.9rem;
        color: var(--ghb-text-muted);
        margin: 0.25rem 0 0;
    }

    .ghb-carousel-section__link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        text-decoration: none;
        white-space: nowrap;
        transition: var(--ghb-transition);
    }

    .ghb-carousel-section__link:hover {
        gap: 0.75rem;
    }

    .ghb-carousel-section__link svg {
        width: 16px;
        height: 16px;
        transition: transform 0.2s ease;
    }

    .ghb-carousel-section__link:hover svg {
        transform: translateX(3px);
    }

    /* ─────────────────────────────────────────────────────────
       HEADER ALIGN: Center
       ───────────────────────────────────────────────────────── */
    .ghb-carousel-section--header-center .ghb-carousel-section__header {
        flex-direction: column;
        text-align: center;
        justify-content: center;
    }

    .ghb-carousel-section--header-center .ghb-carousel-section__header-left {
        justify-content: center;
        flex: none;
        width: 100%;
    }

    .ghb-carousel-section--header-center .ghb-carousel-section__title {
        text-align: center;
    }

    .ghb-carousel-section--header-center .ghb-carousel-section__subtitle {
        text-align: center;
    }

    .ghb-carousel-section--header-center .ghb-carousel-section__header-right {
        justify-content: center;
        width: 100%;
    }

    .ghb-carousel-section--header-center .ghb-carousel-section__link {
        margin-top: 0.5rem;
    }

    /* Hide link when header is centered (cleaner look) - can be overridden */
    .ghb-carousel-section--header-center.ghb-carousel-section--hide-link .ghb-carousel-section__link {
        display: none;
    }

    /* ═══════════════════════════════════════════════════════════
       STYLE VARIATIONS
       ═══════════════════════════════════════════════════════════ */

    /* Default (Light) */
    .ghb-carousel-section--default {
        background: var(--ghb-white);
    }
    .ghb-carousel-section--default .ghb-carousel-section__title { color: var(--ghb-text); }
    .ghb-carousel-section--default .ghb-carousel-section__link { color: var(--ghb-text); }

    /* Dark */
    .ghb-carousel-section--dark {
        background: var(--ghb-primary);
    }
    .ghb-carousel-section--dark .ghb-carousel-section__title { color: var(--ghb-white); }
    .ghb-carousel-section--dark .ghb-carousel-section__link { color: var(--ghb-accent); }
    .ghb-carousel-section--dark .ghb-product-card { background: #1a1a1a; }
    .ghb-carousel-section--dark .ghb-product-card__title { color: var(--ghb-white); }
    .ghb-carousel-section--dark .ghb-product-card__price { color: var(--ghb-white); }
    .ghb-carousel-section--dark .ghb-carousel__nav-btn {
        background: rgba(255,255,255,0.1);
        border-color: rgba(255,255,255,0.2);
        color: var(--ghb-white);
    }
    .ghb-carousel-section--dark .ghb-carousel__nav-btn:hover:not(:disabled) {
        background: var(--ghb-accent);
        border-color: var(--ghb-accent);
        color: var(--ghb-primary);
    }
    .ghb-carousel-section--dark .ghb-carousel__pagination .swiper-pagination-bullet { background: rgba(255,255,255,0.3); }
    .ghb-carousel-section--dark .ghb-carousel__pagination .swiper-pagination-bullet-active { background: var(--ghb-accent); }
    .ghb-carousel-section--dark .ghb-carousel__progressbar .swiper-pagination-progressbar-fill { background: var(--ghb-accent); }

    /* Minimal */
    .ghb-carousel-section--minimal {
        background: transparent;
        padding: 2rem 0;
        border-top: 1px solid var(--ghb-border);
    }
    .ghb-carousel-section--minimal .ghb-carousel-section__title {
        font-weight: 600;
        font-size: clamp(1rem, 3vw, 1.25rem);
    }
    .ghb-carousel-section--minimal .ghb-carousel-section__link { color: var(--ghb-text-muted); }
    .ghb-carousel-section--minimal .ghb-carousel__nav-btn {
        background: transparent;
        border-color: var(--ghb-border);
    }

    /* ═══════════════════════════════════════════════════════════
       SWIPER CAROUSEL BASE
       ═══════════════════════════════════════════════════════════ */
    .ghb-carousel {
        position: relative;
    }

    .ghb-carousel__wrapper {
        position: relative;
    }

    .ghb-carousel .swiper {
        overflow: hidden;
        padding: 10px 0;
    }

    .ghb-carousel .swiper-wrapper {
        align-items: stretch;
    }

    .ghb-carousel .swiper-slide {
        height: auto;
    }

    /* Centered layout */
    .ghb-carousel--layout-centered .swiper-slide {
        opacity: 0.5;
        transform: scale(0.9);
        transition: var(--ghb-transition);
    }
    .ghb-carousel--layout-centered .swiper-slide-active {
        opacity: 1;
        transform: scale(1);
    }

    /* ═══════════════════════════════════════════════════════════
       NAVIGATION STYLES
       ═══════════════════════════════════════════════════════════ */

    /* Base Navigation Button */
    .ghb-carousel__nav-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--ghb-border);
        background: var(--ghb-white);
        color: var(--ghb-text);
        cursor: pointer;
        transition: var(--ghb-transition);
        flex-shrink: 0;
        z-index: 10;
    }

    .ghb-carousel__nav-btn:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }

    .ghb-carousel__nav-btn:hover:not(:disabled) {
        background: var(--ghb-primary);
        border-color: var(--ghb-primary);
        color: var(--ghb-white);
    }

    .ghb-carousel__nav-btn svg {
        stroke-width: 2;
        transition: transform 0.2s ease;
    }

    /* Navigation Shapes */
    .ghb-carousel__nav-btn--circle { border-radius: 50%; }
    .ghb-carousel__nav-btn--square { border-radius: var(--ghb-radius-sm); }
    .ghb-carousel__nav-btn--pill { border-radius: 100px; }

    /* Navigation Sizes */
    .ghb-carousel__nav-btn--sm { width: 36px; height: 36px; }
    .ghb-carousel__nav-btn--sm svg { width: 14px; height: 14px; }

    .ghb-carousel__nav-btn--md { width: 44px; height: 44px; }
    .ghb-carousel__nav-btn--md svg { width: 18px; height: 18px; }

    .ghb-carousel__nav-btn--lg { width: 56px; height: 56px; }
    .ghb-carousel__nav-btn--lg svg { width: 22px; height: 22px; }

    /* ─────────────────────────────────────────────────────────
       NAV STYLE: Bottom (arrows flanking pagination)
       ───────────────────────────────────────────────────────── */
    .ghb-carousel__footer {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    /* ─────────────────────────────────────────────────────────
       NAV STYLE: Sides (floating on left/right)
       ───────────────────────────────────────────────────────── */
    .ghb-carousel--nav-sides .ghb-carousel__wrapper {
        position: relative;
    }

    .ghb-carousel--nav-sides .ghb-carousel__nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        box-shadow: var(--ghb-shadow-md);
    }

    .ghb-carousel--nav-sides .ghb-carousel__nav-prev {
        left: -22px;
    }

    .ghb-carousel--nav-sides .ghb-carousel__nav-next {
        right: -22px;
    }

    @media (max-width: 768px) {
        .ghb-carousel--nav-sides .ghb-carousel__nav-prev { left: 10px; }
        .ghb-carousel--nav-sides .ghb-carousel__nav-next { right: 10px; }
    }

    /* ─────────────────────────────────────────────────────────
       NAV STYLE: Top-Right (in header area)
       ───────────────────────────────────────────────────────── */
    .ghb-carousel-section--nav-top-right .ghb-carousel__header-nav {
        display: flex;
        gap: 0.5rem;
    }

    /* ─────────────────────────────────────────────────────────
       NAV STYLE: Integrated (inside pagination area)
       ───────────────────────────────────────────────────────── */
    .ghb-carousel--nav-integrated .ghb-carousel__footer {
        background: var(--ghb-light);
        padding: 0.75rem 1.5rem;
        border-radius: 100px;
        gap: 1.5rem;
        width: fit-content;
        margin: 1.5rem auto 0;
    }

    /* ═══════════════════════════════════════════════════════════
       PAGINATION STYLES
       ═══════════════════════════════════════════════════════════ */

    /* Base Pagination Container */
    .ghb-carousel__pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        min-width: 80px;
    }

    /* Dots - Default */
    .ghb-carousel__pagination .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        background: #ccc;
        opacity: 1;
        border-radius: 50%;
        transition: var(--ghb-transition);
        margin: 0 !important;
    }

    .ghb-carousel__pagination .swiper-pagination-bullet-active {
        background: var(--ghb-primary);
        width: 24px;
        border-radius: 4px;
    }

    /* Dots - Line Style */
    .ghb-carousel__pagination--line .swiper-pagination-bullet {
        width: 20px;
        height: 3px;
        border-radius: 2px;
    }
    .ghb-carousel__pagination--line .swiper-pagination-bullet-active {
        width: 40px;
        background: var(--ghb-primary);
    }

    /* Dots - Dash Style */
    .ghb-carousel__pagination--dash .swiper-pagination-bullet {
        width: 16px;
        height: 4px;
        border-radius: 2px;
    }
    .ghb-carousel__pagination--dash .swiper-pagination-bullet-active {
        width: 32px;
    }

    /* Dots - Dynamic (scale nearby bullets) */
    .ghb-carousel__pagination--dynamic .swiper-pagination-bullet {
        transform: scale(0.7);
    }
    .ghb-carousel__pagination--dynamic .swiper-pagination-bullet-active {
        transform: scale(1);
        width: 10px;
    }
    .ghb-carousel__pagination--dynamic .swiper-pagination-bullet-active-prev,
    .ghb-carousel__pagination--dynamic .swiper-pagination-bullet-active-next {
        transform: scale(0.85);
    }

    /* Fraction Pagination */
    .ghb-carousel__fraction {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--ghb-text);
        min-width: 60px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
    }

    .ghb-carousel__fraction-current {
        font-size: 1.1rem;
    }

    .ghb-carousel__fraction-divider {
        opacity: 0.5;
    }

    .ghb-carousel__fraction-total {
        opacity: 0.7;
    }

    /* Progress Bar Pagination */
    .ghb-carousel__progressbar {
        position: relative;
        width: 100%;
        max-width: 200px;
        height: 3px;
        background: var(--ghb-border);
        border-radius: 2px;
        overflow: hidden;
    }

    .ghb-carousel__progressbar .swiper-pagination-progressbar-fill {
        background: var(--ghb-primary);
        height: 100%;
        border-radius: 2px;
        transition: transform 0.3s ease;
    }

    /* ═══════════════════════════════════════════════════════════
       AUTOPLAY PROGRESS BAR
       ═══════════════════════════════════════════════════════════ */
    .ghb-carousel__autoplay-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: var(--ghb-border);
        z-index: 10;
    }

    .ghb-carousel__autoplay-progress-bar {
        height: 100%;
        background: var(--ghb-accent);
        width: 0%;
        transition: width 0.1s linear;
    }

    /* ═══════════════════════════════════════════════════════════
       PRODUCT CARD STYLES
       ═══════════════════════════════════════════════════════════ */

    /* Base Card */
    .ghb-product-card {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--ghb-white);
        overflow: hidden;
        text-decoration: none;
        transition: var(--ghb-transition);
    }

    /* Card Radius Variations */
    .ghb-product-card--radius-none { border-radius: 0; }
    .ghb-product-card--radius-sm { border-radius: var(--ghb-radius-sm); }
    .ghb-product-card--radius-md { border-radius: var(--ghb-radius-md); }
    .ghb-product-card--radius-lg { border-radius: var(--ghb-radius-lg); }
    .ghb-product-card--radius-xl { border-radius: var(--ghb-radius-xl); }

    /* Card Hover Effects */
    .ghb-product-card--hover-lift:hover {
        transform: translateY(-8px);
        box-shadow: var(--ghb-shadow-lg);
    }

    .ghb-product-card--hover-zoom:hover .ghb-product-card__image {
        transform: scale(1.1);
    }

    .ghb-product-card--hover-glow:hover {
        box-shadow: 0 0 30px rgba(245, 166, 35, 0.3);
    }

    .ghb-product-card--hover-border:hover {
        border-color: var(--ghb-primary);
    }

    /* ─────────────────────────────────────────────────────────
       CARD STYLE: Default
       ───────────────────────────────────────────────────────── */
    .ghb-product-card--default {
        box-shadow: var(--ghb-shadow-sm);
    }

    .ghb-product-card--default .ghb-product-card__image-wrapper {
        aspect-ratio: 1;
        overflow: hidden;
        background: var(--ghb-light);
    }

    .ghb-product-card--default .ghb-product-card__content {
        padding: 1rem;
    }

    /* ─────────────────────────────────────────────────────────
       CARD STYLE: Minimal
       ───────────────────────────────────────────────────────── */
    .ghb-product-card--minimal {
        background: transparent;
    }

    .ghb-product-card--minimal .ghb-product-card__image-wrapper {
        aspect-ratio: 1;
        overflow: hidden;
        background: var(--ghb-light);
        border-radius: var(--ghb-radius-md);
    }

    .ghb-product-card--minimal .ghb-product-card__content {
        padding: 0.75rem 0;
    }

    .ghb-product-card--minimal .ghb-product-card__title {
        font-size: 0.85rem;
    }

    /* ─────────────────────────────────────────────────────────
       CARD STYLE: Overlay (text on image)
       ───────────────────────────────────────────────────────── */
    .ghb-product-card--overlay {
        position: relative;
    }

    .ghb-product-card--overlay .ghb-product-card__image-wrapper {
        aspect-ratio: 3/4;
        overflow: hidden;
    }

    .ghb-product-card--overlay .ghb-product-card__content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 3rem 1rem 1rem;
        background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
        color: var(--ghb-white);
    }

    .ghb-product-card--overlay .ghb-product-card__title {
        color: var(--ghb-white);
    }

    .ghb-product-card--overlay .ghb-product-card__price {
        color: var(--ghb-white);
    }

    .ghb-product-card--overlay .ghb-product-card__brand {
        color: rgba(255,255,255,0.7);
    }

    /* ─────────────────────────────────────────────────────────
       CARD STYLE: Detailed (with more info)
       ───────────────────────────────────────────────────────── */
    .ghb-product-card--detailed {
        border: 1px solid var(--ghb-border);
    }

    .ghb-product-card--detailed .ghb-product-card__image-wrapper {
        aspect-ratio: 1;
        overflow: hidden;
        background: var(--ghb-light);
    }

    .ghb-product-card--detailed .ghb-product-card__content {
        padding: 1rem;
        border-top: 1px solid var(--ghb-border);
    }

    .ghb-product-card--detailed .ghb-product-card__meta {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 0.75rem;
        padding-top: 0.75rem;
        border-top: 1px solid var(--ghb-border);
    }

    /* ─────────────────────────────────────────────────────────
       CARD STYLE: Horizontal
       ───────────────────────────────────────────────────────── */
    .ghb-product-card--horizontal {
        flex-direction: row;
        border: 1px solid var(--ghb-border);
    }

    .ghb-product-card--horizontal .ghb-product-card__image-wrapper {
        width: 40%;
        aspect-ratio: 1;
        flex-shrink: 0;
    }

    .ghb-product-card--horizontal .ghb-product-card__content {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    /* ═══════════════════════════════════════════════════════════
       CARD COMPONENTS
       ═══════════════════════════════════════════════════════════ */
    .ghb-product-card__image-wrapper {
        position: relative;
        overflow: hidden;
        background: var(--ghb-light);
    }

    .ghb-product-card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    /* Badges */
    .ghb-product-card__badges {
        position: absolute;
        top: 10px;
        left: 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        z-index: 2;
    }

    .ghb-product-card__badge {
        display: inline-block;
        padding: 4px 10px;
        font-size: 0.65rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border-radius: 4px;
    }

    .ghb-product-card__badge--sale { background: var(--ghb-danger); color: var(--ghb-white); }
    .ghb-product-card__badge--new { background: var(--ghb-primary); color: var(--ghb-white); }
    .ghb-product-card__badge--featured { background: var(--ghb-accent); color: var(--ghb-primary); }
    .ghb-product-card__badge--out { background: #718096; color: var(--ghb-white); }
    .ghb-product-card__badge--discount { background: var(--ghb-success); color: var(--ghb-white); }

    /* Quick Actions */
    .ghb-product-card__actions {
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
        display: flex;
        gap: 8px;
        opacity: 0;
        transform: translateY(10px);
        transition: var(--ghb-transition);
        z-index: 2;
    }

    .ghb-product-card:hover .ghb-product-card__actions {
        opacity: 1;
        transform: translateY(0);
    }

    .ghb-product-card__action-btn {
        flex: 1;
        padding: 10px 16px;
        background: var(--ghb-primary);
        color: var(--ghb-white);
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border: none;
        border-radius: var(--ghb-radius-sm);
        cursor: pointer;
        transition: var(--ghb-transition);
        text-align: center;
    }

    .ghb-product-card__action-btn:hover {
        background: var(--ghb-accent);
        color: var(--ghb-primary);
    }

    .ghb-product-card__action-btn--icon {
        flex: 0;
        width: 40px;
        padding: 10px;
    }

    /* Content */
    .ghb-product-card__content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .ghb-product-card__brand {
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--ghb-text-muted);
        margin-bottom: 4px;
    }

    .ghb-product-card__title {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--ghb-text);
        margin: 0 0 auto;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .ghb-product-card__rating {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 0.5rem;
    }

    .ghb-product-card__stars {
        display: flex;
        gap: 2px;
    }

    .ghb-product-card__star {
        width: 14px;
        height: 14px;
        fill: #ddd;
    }

    .ghb-product-card__star--filled {
        fill: #fbbf24;
    }

    .ghb-product-card__rating-count {
        font-size: 0.75rem;
        color: var(--ghb-text-muted);
    }

    .ghb-product-card__price-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 0.75rem;
        flex-wrap: wrap;
    }

    .ghb-product-card__price {
        font-size: 1rem;
        font-weight: 700;
        color: var(--ghb-text);
    }

    .ghb-product-card__price--sale {
        color: var(--ghb-danger);
    }

    .ghb-product-card__price--regular {
        font-size: 0.85rem;
        font-weight: 400;
        color: #999;
        text-decoration: line-through;
    }

    .ghb-product-card__discount-tag {
        font-size: 0.7rem;
        font-weight: 600;
        color: var(--ghb-success);
        background: rgba(56, 161, 105, 0.1);
        padding: 2px 6px;
        border-radius: 3px;
    }

    /* Sizes Preview */
    .ghb-product-card__sizes {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-top: 0.5rem;
    }

    .ghb-product-card__size {
        font-size: 0.65rem;
        padding: 2px 6px;
        background: var(--ghb-light);
        border-radius: 3px;
        color: var(--ghb-text-muted);
    }

    /* Add to Cart Button */
    .ghb-product-card__cart-btn {
        margin-top: 0.75rem;
        padding: 10px;
        background: var(--ghb-primary);
        color: var(--ghb-white);
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border: none;
        border-radius: var(--ghb-radius-sm);
        cursor: pointer;
        transition: var(--ghb-transition);
        width: 100%;
    }

    .ghb-product-card__cart-btn:hover {
        background: var(--ghb-accent);
        color: var(--ghb-primary);
    }

    /* ─────────────────────────────────────────────────────────
       CARD TEXT: Centered (bigger & centered)
       Higher specificity to ensure it overrides other styles
       ───────────────────────────────────────────────────────── */
    .ghb-carousel-section .ghb-product-card.ghb-product-card--text-centered .ghb-product-card__content {
        text-align: center !important;
        align-items: center !important;
        width: 100% !important;
    }

    .ghb-carousel-section .ghb-product-card.ghb-product-card--text-centered .ghb-product-card__brand {
        font-size: 0.8rem !important;
        text-align: center !important;
    }

    .ghb-carousel-section .ghb-product-card.ghb-product-card--text-centered .ghb-product-card__title {
        font-size: 1.15rem !important;
        font-weight: 700 !important;
        text-align: center !important;
    }

    .ghb-carousel-section .ghb-product-card.ghb-product-card--text-centered .ghb-product-card__price {
        font-size: 1.25rem !important;
    }

    .ghb-carousel-section .ghb-product-card.ghb-product-card--text-centered .ghb-product-card__price--sale {
        font-size: 1.25rem !important;
    }

    .ghb-carousel-section .ghb-product-card.ghb-product-card--text-centered .ghb-product-card__price--regular {
        font-size: 1rem !important;
    }

    .ghb-carousel-section .ghb-product-card.ghb-product-card--text-centered .ghb-product-card__price-wrapper {
        justify-content: center !important;
        width: 100% !important;
    }

    .ghb-carousel-section .ghb-product-card.ghb-product-card--text-centered .ghb-product-card__sizes {
        justify-content: center !important;
    }

    .ghb-carousel-section .ghb-product-card.ghb-product-card--text-centered .ghb-product-card__rating {
        justify-content: center !important;
    }

    @media (max-width: 768px) {
        .ghb-carousel-section .ghb-product-card.ghb-product-card--text-centered .ghb-product-card__title {
            font-size: 1rem !important;
        }
        .ghb-carousel-section .ghb-product-card.ghb-product-card--text-centered .ghb-product-card__price,
        .ghb-carousel-section .ghb-product-card.ghb-product-card--text-centered .ghb-product-card__price--sale {
            font-size: 1.1rem !important;
        }
    }

    /* ═══════════════════════════════════════════════════════════
       EFFECT-SPECIFIC STYLES
       ═══════════════════════════════════════════════════════════ */

    /* Coverflow Effect */
    .ghb-carousel--effect-coverflow .swiper {
        padding: 40px 0;
    }

    /* ═══════════════════════════════════════════════════════════
       GAP VARIATIONS
       ═══════════════════════════════════════════════════════════ */
    .ghb-carousel--gap-none .swiper-slide { padding: 0; }
    .ghb-carousel--gap-sm .swiper { --swiper-spacing: 8px; }
    .ghb-carousel--gap-md .swiper { --swiper-spacing: 16px; }
    .ghb-carousel--gap-lg .swiper { --swiper-spacing: 24px; }
    .ghb-carousel--gap-xl .swiper { --swiper-spacing: 32px; }

    /* ═══════════════════════════════════════════════════════════
       SCROLLBAR (Optional)
       ═══════════════════════════════════════════════════════════ */
    .ghb-carousel__scrollbar {
        margin-top: 1rem;
        height: 4px;
        background: var(--ghb-border);
        border-radius: 2px;
    }

    .ghb-carousel__scrollbar .swiper-scrollbar-drag {
        background: var(--ghb-primary);
        border-radius: 2px;
    }

    /* ═══════════════════════════════════════════════════════════
       RESPONSIVE
       ═══════════════════════════════════════════════════════════ */
    @media (max-width: 768px) {
        .ghb-carousel-section {
            padding: 2rem 0;
        }

        .ghb-carousel-section__container {
            padding: 0 15px;
        }

        .ghb-carousel-section__header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
        }

        .ghb-carousel-section__header-right {
            width: 100%;
            justify-content: space-between;
        }

        .ghb-product-card__content {
            padding: 0.75rem;
        }

        .ghb-product-card__actions {
            display: none;
        }

        .ghb-carousel__footer {
            gap: 0.75rem;
        }

        /* Hide side navigation on mobile */
        .ghb-carousel--nav-sides .ghb-carousel__nav-btn {
            width: 36px;
            height: 36px;
        }
    }

    @media (max-width: 480px) {
        .ghb-carousel-section__title {
            font-size: 1.1rem;
        }

        .ghb-product-card__title {
            font-size: 0.8rem;
        }

        .ghb-product-card__price {
            font-size: 0.9rem;
        }
    }
    ';
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 3. MAIN SHORTCODE
 * ═══════════════════════════════════════════════════════════════
 */
add_shortcode('carousel_section', 'ghb_carousel_section_shortcode');
add_shortcode('product_carousel', 'ghb_carousel_section_shortcode'); // Alias

function ghb_carousel_section_shortcode($atts) {
    // Check WooCommerce
    if (!class_exists('WooCommerce')) {
        return '<p style="text-align:center;padding:2rem;color:#666;">WooCommerce is required for the product carousel.</p>';
    }

    $atts = shortcode_atts(array(
        // Section settings
        'title'          => 'Prodotti',
        'subtitle'       => '',
        'link'           => '/shop',
        'link_text'      => 'Vedi Tutti',
        'style'          => 'default',      // default|dark|minimal
        'header_align'   => 'left',         // left|center

        // Navigation
        'nav_style'      => 'bottom',       // bottom|sides|top-right|integrated|none
        'nav_shape'      => 'circle',       // circle|square|pill
        'nav_size'       => 'md',           // sm|md|lg
        'show_nav'       => 'true',

        // Pagination
        'pagination'     => 'dots',         // dots|fraction|progressbar|none
        'dots_style'     => 'default',      // default|line|dash|dynamic

        // Effect
        'effect'         => 'slide',        // slide|fade|coverflow

        // Card style
        'card_style'     => 'default',      // default|minimal|overlay|detailed|horizontal
        'card_hover'     => 'lift',         // lift|zoom|glow|border|none
        'card_radius'    => 'md',           // none|sm|md|lg|xl
        'card_text'      => 'default',      // default|centered (centered = bigger & centered text)

        // Layout
        'layout'         => 'standard',     // standard|centered|peek|full-width
        'columns'        => 5,              // Desktop columns
        'columns_tablet' => 3,
        'columns_mobile' => 2,
        'gap'            => 'md',           // none|sm|md|lg|xl
        'rows'           => 1,

        // Behavior
        'autoplay'       => 'false',
        'speed'          => 4000,
        'loop'           => 'true',
        'free_mode'      => 'false',
        'mousewheel'     => 'false',
        'keyboard'       => 'true',
        'grab_cursor'    => 'true',
        'autoplay_bar'   => 'false',

        // Product query
        'type'           => 'recent',
        'limit'          => 8,
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
    ), $atts);

    $carousel_id = 'ghb_carousel_' . uniqid();
    $products = ghb_get_carousel_products($atts);

    if (!$products->have_posts()) {
        return '<p style="text-align:center;padding:2rem;color:#666;">Nessun prodotto trovato.</p>';
    }

    $total_products = $products->post_count;

    // Build CSS classes - nav style class added to section for top-right targeting
    $section_classes = array(
        'ghb-carousel-section',
        'ghb-carousel-section--' . esc_attr($atts['style']),
        'ghb-carousel-section--layout-' . esc_attr($atts['layout']),
        'ghb-carousel-section--nav-' . esc_attr($atts['nav_style']),
    );

    // Header alignment
    if ($atts['header_align'] === 'center') {
        $section_classes[] = 'ghb-carousel-section--header-center';
    }

    $carousel_classes = array(
        'ghb-carousel',
        'ghb-carousel--nav-' . esc_attr($atts['nav_style']),
        'ghb-carousel--effect-' . esc_attr($atts['effect']),
        'ghb-carousel--gap-' . esc_attr($atts['gap']),
    );

    if ($atts['layout'] === 'centered') {
        $carousel_classes[] = 'ghb-carousel--layout-centered';
    }

    // Navigation button classes
    $nav_btn_classes = array(
        'ghb-carousel__nav-btn',
        'ghb-carousel__nav-btn--' . esc_attr($atts['nav_shape']),
        'ghb-carousel__nav-btn--' . esc_attr($atts['nav_size']),
    );
    $nav_btn_class = implode(' ', $nav_btn_classes);

    ob_start();
    ?>
    <section class="<?php echo esc_attr(implode(' ', $section_classes)); ?>">
        <div class="ghb-carousel-section__container">

            <!-- Header -->
            <div class="ghb-carousel-section__header">
                <div class="ghb-carousel-section__header-left">
                    <div>
                        <h2 class="ghb-carousel-section__title"><?php echo esc_html($atts['title']); ?></h2>
                        <?php if (!empty($atts['subtitle'])) : ?>
                            <p class="ghb-carousel-section__subtitle"><?php echo esc_html($atts['subtitle']); ?></p>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="ghb-carousel-section__header-right">
                    <?php if ($atts['nav_style'] === 'top-right' && $atts['show_nav'] === 'true') : ?>
                        <div class="ghb-carousel__header-nav">
                            <button type="button" class="<?php echo esc_attr($nav_btn_class); ?> ghb-carousel__nav-prev" aria-label="Previous">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button type="button" class="<?php echo esc_attr($nav_btn_class); ?> ghb-carousel__nav-next" aria-label="Next">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    <?php endif; ?>

                    <?php if (!empty($atts['link'])) : ?>
                        <a href="<?php echo esc_url($atts['link']); ?>" class="ghb-carousel-section__link">
                            <?php echo esc_html($atts['link_text']); ?>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Carousel -->
            <div class="<?php echo esc_attr(implode(' ', $carousel_classes)); ?>" data-carousel-id="<?php echo esc_attr($carousel_id); ?>">
                <div class="ghb-carousel__wrapper">

                    <?php if ($atts['nav_style'] === 'sides' && $atts['show_nav'] === 'true') : ?>
                        <button type="button" class="<?php echo esc_attr($nav_btn_class); ?> ghb-carousel__nav-prev" aria-label="Previous">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    <?php endif; ?>

                    <div id="<?php echo esc_attr($carousel_id); ?>" class="swiper">
                        <div class="swiper-wrapper">
                            <?php
                            while ($products->have_posts()) : $products->the_post();
                                global $product;
                                echo '<div class="swiper-slide">';
                                echo ghb_render_product_card($product, $atts);
                                echo '</div>';
                            endwhile;
                            ?>
                        </div>

                        <?php if ($atts['autoplay'] === 'true' && $atts['autoplay_bar'] === 'true') : ?>
                            <div class="ghb-carousel__autoplay-progress">
                                <div class="ghb-carousel__autoplay-progress-bar"></div>
                            </div>
                        <?php endif; ?>
                    </div>

                    <?php if ($atts['nav_style'] === 'sides' && $atts['show_nav'] === 'true') : ?>
                        <button type="button" class="<?php echo esc_attr($nav_btn_class); ?> ghb-carousel__nav-next" aria-label="Next">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    <?php endif; ?>

                </div>

                <!-- Footer Navigation (for bottom/integrated styles) -->
                <?php if (in_array($atts['nav_style'], array('bottom', 'integrated')) || ($atts['pagination'] !== 'none' && $atts['nav_style'] !== 'top-right')) : ?>
                    <div class="ghb-carousel__footer">

                        <?php if (in_array($atts['nav_style'], array('bottom', 'integrated')) && $atts['show_nav'] === 'true') : ?>
                            <button type="button" class="<?php echo esc_attr($nav_btn_class); ?> ghb-carousel__nav-prev" aria-label="Previous">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        <?php endif; ?>

                        <?php if ($atts['pagination'] === 'dots') : ?>
                            <div class="ghb-carousel__pagination ghb-carousel__pagination--<?php echo esc_attr($atts['dots_style']); ?>"></div>
                        <?php elseif ($atts['pagination'] === 'fraction') : ?>
                            <div class="ghb-carousel__fraction">
                                <span class="ghb-carousel__fraction-current">1</span>
                                <span class="ghb-carousel__fraction-divider">/</span>
                                <span class="ghb-carousel__fraction-total"><?php echo esc_html($total_products); ?></span>
                            </div>
                        <?php elseif ($atts['pagination'] === 'progressbar') : ?>
                            <div class="ghb-carousel__progressbar"></div>
                        <?php endif; ?>

                        <?php if (in_array($atts['nav_style'], array('bottom', 'integrated')) && $atts['show_nav'] === 'true') : ?>
                            <button type="button" class="<?php echo esc_attr($nav_btn_class); ?> ghb-carousel__nav-next" aria-label="Next">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        <?php endif; ?>

                    </div>
                <?php endif; ?>

            </div>

        </div>
    </section>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        <?php echo ghb_generate_swiper_config($atts, $carousel_id, $total_products); ?>
    });
    </script>

    <?php
    wp_reset_postdata();
    return ob_get_clean();
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 4. SWIPER CONFIGURATION GENERATOR
 * ═══════════════════════════════════════════════════════════════
 */
function ghb_generate_swiper_config($atts, $carousel_id, $total_products) {
    $config = array();

    // Base config
    $config['slidesPerView'] = intval($atts['columns_mobile']);
    $config['spaceBetween'] = ghb_get_gap_value($atts['gap']);
    $config['loop'] = $atts['loop'] === 'true';
    $config['grabCursor'] = $atts['grab_cursor'] === 'true';
    $config['keyboard'] = array('enabled' => $atts['keyboard'] === 'true');

    // Grid (multi-row)
    if (intval($atts['rows']) > 1) {
        $config['grid'] = array(
            'rows' => intval($atts['rows']),
            'fill' => 'row'
        );
    }

    // Effect
    $effect = $atts['effect'];
    if ($effect !== 'slide') {
        $config['effect'] = $effect;

        switch ($effect) {
            case 'fade':
                $config['fadeEffect'] = array('crossFade' => true);
                break;
            case 'coverflow':
                $config['coverflowEffect'] = array(
                    'rotate'       => 30,
                    'stretch'      => 0,
                    'depth'        => 100,
                    'modifier'     => 1,
                    'slideShadows' => true
                );
                $config['centeredSlides'] = true;
                break;
        }
    }

    // Layout: centered
    if ($atts['layout'] === 'centered') {
        $config['centeredSlides'] = true;
        $config['slidesPerView'] = 'auto';
    }

    // Autoplay
    if ($atts['autoplay'] === 'true') {
        $config['autoplay'] = array(
            'delay'                => intval($atts['speed']),
            'disableOnInteraction' => false,
            'pauseOnMouseEnter'    => true
        );
    }

    // Free mode
    if ($atts['free_mode'] === 'true') {
        $config['freeMode'] = array(
            'enabled'  => true,
            'sticky'   => false,
            'momentum' => true
        );
    }

    // Mousewheel
    if ($atts['mousewheel'] === 'true') {
        $config['mousewheel'] = array(
            'forceToAxis' => true,
            'sensitivity' => 1
        );
    }

    // Navigation - use section selector for top-right since buttons are in header
    if ($atts['show_nav'] === 'true' && $atts['nav_style'] !== 'none') {
        if ($atts['nav_style'] === 'top-right') {
            $container_selector = ".ghb-carousel-section--nav-top-right";
        } else {
            $container_selector = "[data-carousel-id=\"{$carousel_id}\"]";
        }
        $config['navigation'] = array(
            'nextEl' => "{$container_selector} .ghb-carousel__nav-next",
            'prevEl' => "{$container_selector} .ghb-carousel__nav-prev"
        );
    }

    // Pagination
    if ($atts['pagination'] === 'dots') {
        $config['pagination'] = array(
            'el'             => "[data-carousel-id=\"{$carousel_id}\"] .ghb-carousel__pagination",
            'clickable'      => true,
            'dynamicBullets' => $atts['dots_style'] === 'dynamic'
        );
    } elseif ($atts['pagination'] === 'progressbar') {
        $config['pagination'] = array(
            'el'   => "[data-carousel-id=\"{$carousel_id}\"] .ghb-carousel__progressbar",
            'type' => 'progressbar'
        );
    }

    // Breakpoints
    $config['breakpoints'] = array(
        0 => array(
            'slidesPerView' => intval($atts['columns_mobile']),
            'spaceBetween'  => max(8, ghb_get_gap_value($atts['gap']) - 8)
        ),
        640 => array(
            'slidesPerView' => intval($atts['columns_mobile']),
            'spaceBetween'  => ghb_get_gap_value($atts['gap'])
        ),
        768 => array(
            'slidesPerView' => intval($atts['columns_tablet']),
            'spaceBetween'  => ghb_get_gap_value($atts['gap'])
        ),
        1024 => array(
            'slidesPerView' => intval($atts['columns']) - 1,
            'spaceBetween'  => ghb_get_gap_value($atts['gap'])
        ),
        1280 => array(
            'slidesPerView' => intval($atts['columns']),
            'spaceBetween'  => ghb_get_gap_value($atts['gap'])
        )
    );

    // Generate JavaScript
    $json_config = wp_json_encode($config, JSON_UNESCAPED_SLASHES);
    $js = "var swiper_{$carousel_id} = new Swiper('#{$carousel_id}', {$json_config});";

    // Fraction pagination update
    if ($atts['pagination'] === 'fraction') {
        $js .= "
        swiper_{$carousel_id}.on('slideChange', function() {
            var container = document.querySelector('[data-carousel-id=\"{$carousel_id}\"]');
            var current = container.querySelector('.ghb-carousel__fraction-current');
            if (current) current.textContent = this.realIndex + 1;
        });";
    }

    // Autoplay progress bar
    if ($atts['autoplay'] === 'true' && $atts['autoplay_bar'] === 'true') {
        $js .= "
        swiper_{$carousel_id}.on('autoplayTimeLeft', function(s, time, progress) {
            var bar = document.querySelector('#{$carousel_id} .ghb-carousel__autoplay-progress-bar');
            if (bar) bar.style.width = ((1 - progress) * 100) + '%';
        });";
    }

    return $js;
}

/**
 * Helper: Get gap pixel value
 */
function ghb_get_gap_value($gap) {
    $gaps = array(
        'none' => 0,
        'sm'   => 8,
        'md'   => 16,
        'lg'   => 24,
        'xl'   => 32
    );
    return isset($gaps[$gap]) ? $gaps[$gap] : 16;
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 5. PRODUCT QUERY BUILDER
 * ═══════════════════════════════════════════════════════════════
 */
function ghb_get_carousel_products($atts) {
    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => intval($atts['limit']),
        'post_status'    => 'publish',
    );

    $tax_query = array();

    $tax_query[] = array(
        'taxonomy' => 'product_visibility',
        'field'    => 'name',
        'terms'    => 'exclude-from-catalog',
        'operator' => 'NOT IN',
    );

    switch ($atts['type']) {
        case 'best_selling':
            $args['meta_key'] = 'total_sales';
            $args['orderby']  = 'meta_value_num';
            $args['order']    = 'DESC';
            break;
        case 'featured':
            $tax_query[] = array(
                'taxonomy' => 'product_visibility',
                'field'    => 'name',
                'terms'    => 'featured',
            );
            break;
        case 'sale':
            $args['meta_query'][] = array(
                'key'     => '_sale_price',
                'value'   => '',
                'compare' => '!=',
            );
            break;
        case 'top_rated':
            $args['meta_key'] = '_wc_average_rating';
            $args['orderby']  = 'meta_value_num';
            $args['order']    = 'DESC';
            break;
        case 'recent':
        default:
            $args['orderby'] = 'date';
            $args['order']   = 'DESC';
            break;
    }

    if (!empty($atts['category'])) {
        $tax_query[] = array(
            'taxonomy' => 'product_cat',
            'field'    => 'slug',
            'terms'    => array_map('trim', explode(',', $atts['category'])),
        );
    }

    if (!empty($atts['tag'])) {
        $tax_query[] = array(
            'taxonomy' => 'product_tag',
            'field'    => 'slug',
            'terms'    => array_map('trim', explode(',', $atts['tag'])),
        );
    }

    if (!empty($atts['brand'])) {
        // Support multiple brand taxonomies
        $brand_taxonomies = array('pa_brand', 'pwb-brand', 'product_brand');
        foreach ($brand_taxonomies as $tax) {
            if (taxonomy_exists($tax)) {
                $tax_query[] = array(
                    'taxonomy' => $tax,
                    'field'    => 'slug',
                    'terms'    => array_map('trim', explode(',', $atts['brand'])),
                );
                break;
            }
        }
    }

    if (!empty($tax_query)) {
        $args['tax_query'] = array_merge(array('relation' => 'AND'), $tax_query);
    }

    if (!empty($atts['ids'])) {
        $args['post__in'] = array_map('intval', explode(',', $atts['ids']));
        $args['orderby']  = 'post__in';
    }

    return new WP_Query($args);
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 6. PRODUCT CARD RENDERER
 * ═══════════════════════════════════════════════════════════════
 */
function ghb_render_product_card($product, $atts) {
    $product_id = $product->get_id();
    $permalink  = get_permalink($product_id);
    $title      = $product->get_name();
    $image_id   = $product->get_image_id();
    $image_url  = $image_id ? wp_get_attachment_image_url($image_id, 'woocommerce_thumbnail') : wc_placeholder_img_src();
    $image_alt  = get_post_meta($image_id, '_wp_attachment_image_alt', true) ?: $title;

    // Card classes
    $card_classes = array(
        'ghb-product-card',
        'ghb-product-card--' . $atts['card_style'],
        'ghb-product-card--radius-' . $atts['card_radius'],
        'ghb-product-card--hover-' . $atts['card_hover'],
        'ghb-product-card--text-' . $atts['card_text'],
    );

    // Brand
    $brand = '';
    if ($atts['show_brand'] === 'true') {
        // Support multiple brand taxonomies
        $brand_taxonomies = array('pa_brand', 'pwb-brand', 'product_brand');
        foreach ($brand_taxonomies as $tax) {
            $brand_terms = get_the_terms($product_id, $tax);
            if ($brand_terms && !is_wp_error($brand_terms)) {
                $brand = $brand_terms[0]->name;
                break;
            }
        }
    }

    // Prices
    $regular_price = $product->get_regular_price();
    $sale_price    = $product->get_sale_price();
    $is_on_sale    = $product->is_on_sale();
    $discount_pct  = 0;

    if ($is_on_sale && $regular_price && $sale_price) {
        $discount_pct = round((($regular_price - $sale_price) / $regular_price) * 100);
    }

    // Badges
    $badges = array();
    if ($atts['show_badges'] === 'true') {
        if (!$product->is_in_stock()) {
            $badges = array(array('type' => 'out', 'text' => 'Esaurito'));
        } else {
            if ($is_on_sale && $discount_pct > 0) {
                $badges[] = array('type' => 'sale', 'text' => "-{$discount_pct}%");
            }

            $post_date = get_the_date('U', $product_id);
            if ((time() - $post_date) < (30 * DAY_IN_SECONDS)) {
                $badges[] = array('type' => 'new', 'text' => 'New');
            }

            if ($product->is_featured()) {
                $badges[] = array('type' => 'featured', 'text' => 'Featured');
            }
        }
    }

    // Rating
    $rating       = 0;
    $rating_count = 0;
    if ($atts['show_rating'] === 'true') {
        $rating       = $product->get_average_rating();
        $rating_count = $product->get_rating_count();
    }

    // Sizes
    $sizes       = array();
    $total_sizes = 0;
    if ($atts['show_sizes'] === 'true' && $product->is_type('variable')) {
        $size_attribute = $product->get_attribute('pa_misura') ?: $product->get_attribute('pa_size') ?: $product->get_attribute('pa_taglia');
        if ($size_attribute) {
            $all_sizes   = explode(', ', $size_attribute);
            $sizes       = array_slice($all_sizes, 0, 4);
            $total_sizes = count($all_sizes);
        }
    }

    ob_start();
    ?>
    <a href="<?php echo esc_url($permalink); ?>" class="<?php echo esc_attr(implode(' ', $card_classes)); ?>">

        <div class="ghb-product-card__image-wrapper">
            <img
                src="<?php echo esc_url($image_url); ?>"
                alt="<?php echo esc_attr($image_alt); ?>"
                class="ghb-product-card__image"
                loading="lazy"
            />

            <?php if (!empty($badges)) : ?>
                <div class="ghb-product-card__badges">
                    <?php foreach ($badges as $badge) : ?>
                        <span class="ghb-product-card__badge ghb-product-card__badge--<?php echo esc_attr($badge['type']); ?>">
                            <?php echo esc_html($badge['text']); ?>
                        </span>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <?php if ($atts['card_style'] !== 'overlay') : ?>
                <div class="ghb-product-card__actions">
                    <span class="ghb-product-card__action-btn">Vedi Dettagli</span>
                </div>
            <?php endif; ?>
        </div>

        <div class="ghb-product-card__content">

            <?php if ($brand) : ?>
                <span class="ghb-product-card__brand"><?php echo esc_html($brand); ?></span>
            <?php endif; ?>

            <h3 class="ghb-product-card__title"><?php echo esc_html($title); ?></h3>

            <?php if ($atts['show_rating'] === 'true' && $rating > 0) : ?>
                <div class="ghb-product-card__rating">
                    <div class="ghb-product-card__stars">
                        <?php for ($i = 1; $i <= 5; $i++) : ?>
                            <svg class="ghb-product-card__star <?php echo $i <= round($rating) ? 'ghb-product-card__star--filled' : ''; ?>" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        <?php endfor; ?>
                    </div>
                    <span class="ghb-product-card__rating-count">(<?php echo esc_html($rating_count); ?>)</span>
                </div>
            <?php endif; ?>

            <div class="ghb-product-card__price-wrapper">
                <?php if ($is_on_sale && $sale_price) : ?>
                    <span class="ghb-product-card__price ghb-product-card__price--sale">
                        <?php echo wc_price($sale_price); ?>
                    </span>
                    <span class="ghb-product-card__price ghb-product-card__price--regular">
                        <?php echo wc_price($regular_price); ?>
                    </span>
                    <?php if ($atts['show_discount'] === 'true' && $discount_pct > 0) : ?>
                        <span class="ghb-product-card__discount-tag">-<?php echo esc_html($discount_pct); ?>%</span>
                    <?php endif; ?>
                <?php else : ?>
                    <span class="ghb-product-card__price">
                        <?php echo $product->get_price_html(); ?>
                    </span>
                <?php endif; ?>
            </div>

            <?php if (!empty($sizes)) : ?>
                <div class="ghb-product-card__sizes">
                    <?php foreach ($sizes as $size) : ?>
                        <span class="ghb-product-card__size"><?php echo esc_html($size); ?></span>
                    <?php endforeach; ?>
                    <?php if ($total_sizes > 4) : ?>
                        <span class="ghb-product-card__size">+<?php echo ($total_sizes - 4); ?></span>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if ($atts['show_cart_btn'] === 'true' && $product->is_in_stock()) : ?>
                <button type="button" class="ghb-product-card__cart-btn" onclick="event.preventDefault();">
                    Aggiungi al Carrello
                </button>
            <?php endif; ?>

        </div>
    </a>
    <?php
    return ob_get_clean();
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 7. CONVENIENCE SHORTCODES
 * ═══════════════════════════════════════════════════════════════
 */

// Best Sellers
add_shortcode('bestsellers', function($atts) {
    $atts = shortcode_atts(array('limit' => 8, 'title' => 'Best Sellers', 'style' => 'default'), $atts);
    return do_shortcode("[carousel_section title=\"{$atts['title']}\" type=\"best_selling\" limit=\"{$atts['limit']}\" style=\"{$atts['style']}\" link=\"/shop?orderby=popularity\"]");
});

// New Arrivals
add_shortcode('new_arrivals', function($atts) {
    $atts = shortcode_atts(array('limit' => 8, 'title' => 'Nuovi Arrivi', 'style' => 'default'), $atts);
    return do_shortcode("[carousel_section title=\"{$atts['title']}\" type=\"recent\" limit=\"{$atts['limit']}\" style=\"{$atts['style']}\" link=\"/shop?orderby=date\"]");
});

// On Sale
add_shortcode('on_sale', function($atts) {
    $atts = shortcode_atts(array('limit' => 8, 'title' => 'In Saldo', 'style' => 'default'), $atts);
    return do_shortcode("[carousel_section title=\"{$atts['title']}\" type=\"sale\" limit=\"{$atts['limit']}\" style=\"{$atts['style']}\" link=\"/shop?on_sale=1\"]");
});

// Featured
add_shortcode('featured_products', function($atts) {
    $atts = shortcode_atts(array('limit' => 8, 'title' => 'In Evidenza', 'effect' => 'coverflow'), $atts);
    return do_shortcode("[carousel_section title=\"{$atts['title']}\" type=\"featured\" limit=\"{$atts['limit']}\" effect=\"{$atts['effect']}\" nav_style=\"sides\" link=\"/shop\"]");
});

/**
 * ═══════════════════════════════════════════════════════════════
 * 8. PRESET GALLERY SHORTCODE
 * ═══════════════════════════════════════════════════════════════
 */
add_shortcode('carousel_presets', 'ghb_carousel_presets_shortcode');

function ghb_carousel_presets_shortcode($atts) {
    $atts = shortcode_atts(array('show' => 'all'), $atts);

    $presets = array(
        'classic' => array(
            'name'   => 'Classic',
            'config' => 'style="default" nav_style="bottom" pagination="dots" card_style="default"'
        ),
        'modern' => array(
            'name'   => 'Modern',
            'config' => 'style="minimal" nav_style="top-right" pagination="fraction" card_style="minimal" card_hover="zoom"'
        ),
        'dark_luxury' => array(
            'name'   => 'Dark Luxury',
            'config' => 'style="dark" nav_style="sides" pagination="progressbar" card_style="overlay" card_radius="lg"'
        ),
        'showcase' => array(
            'name'   => 'Showcase',
            'config' => 'style="default" effect="coverflow" nav_style="bottom" layout="centered"'
        ),
        'grid' => array(
            'name'   => 'Grid View',
            'config' => 'style="minimal" rows="2" columns="4" pagination="none" card_style="detailed"'
        ),
        'editorial' => array(
            'name'   => 'Editorial',
            'config' => 'style="default" card_style="horizontal" columns="2" columns_mobile="1" gap="lg"'
        ),
    );

    $output = '<div style="display:grid;gap:3rem;">';

    foreach ($presets as $key => $preset) {
        if ($atts['show'] !== 'all' && $atts['show'] !== $key) {
            continue;
        }

        $output .= '<div>';
        $output .= '<h3 style="margin-bottom:0.5rem;">' . esc_html($preset['name']) . ' Preset</h3>';
        $output .= '<code style="display:block;padding:0.5rem;background:#f5f5f5;border-radius:4px;margin-bottom:1rem;font-size:0.75rem;overflow-x:auto;">[carousel_section ' . esc_html($preset['config']) . ']</code>';
        $output .= do_shortcode('[carousel_section title="' . esc_attr($preset['name']) . '" type="recent" limit="6" ' . $preset['config'] . ']');
        $output .= '</div>';
    }

    $output .= '</div>';

    return $output;
}
