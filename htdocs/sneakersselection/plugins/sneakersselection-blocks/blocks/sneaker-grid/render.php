<?php
/**
 * Sneaker Grid Block - Server-side render
 */

$heading = esc_html($attributes['heading'] ?? '');
$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$columns = intval($attributes['columns'] ?? 4);
$products = $attributes['products'] ?? array();
$currency = esc_html($attributes['currency'] ?? '$');
$show_brand = $attributes['showBrand'] ?? true;
$show_price = $attributes['showPrice'] ?? true;
$enable_hover = $attributes['enableHoverEffect'] ?? true;
$view_all_text = esc_html($attributes['viewAllText'] ?? '');
$view_all_url = esc_url($attributes['viewAllUrl'] ?? '#');

$classes = array('ss-block', 'ss-sneaker-grid');
if ($enable_hover) {
    $classes[] = 'ss-sneaker-grid--hover-enabled';
}

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
));

$badge_labels = array(
    'new' => __('New', 'sneakersselection-blocks'),
    'sale' => __('Sale', 'sneakersselection-blocks'),
    'limited' => __('Limited', 'sneakersselection-blocks'),
    'soldout' => __('Sold Out', 'sneakersselection-blocks'),
);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="ss-container">
        <?php if ($eyebrow || $heading || $view_all_text) : ?>
            <div class="ss-section__header ss-sneaker-grid__header">
                <div class="ss-sneaker-grid__header-content">
                    <?php if ($eyebrow) : ?>
                        <span class="ss-section__eyebrow"><?php echo $eyebrow; ?></span>
                    <?php endif; ?>
                    <?php if ($heading) : ?>
                        <h2 class="ss-heading ss-heading--2"><?php echo $heading; ?></h2>
                    <?php endif; ?>
                </div>
                <?php if ($view_all_text) : ?>
                    <a href="<?php echo $view_all_url; ?>" class="ss-button ss-button--secondary">
                        <?php echo $view_all_text; ?>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <div class="ss-grid ss-grid--<?php echo $columns; ?> ss-sneaker-grid__grid" data-ss-stagger>
            <?php foreach ($products as $index => $product) : ?>
                <?php
                $product_name = esc_html($product['name'] ?? '');
                $product_brand = esc_html($product['brand'] ?? '');
                $product_price = esc_html($product['price'] ?? '');
                $product_original_price = esc_html($product['originalPrice'] ?? '');
                $product_image = esc_url($product['image'] ?? '');
                $product_url = esc_url($product['url'] ?? '#');
                $product_badge = esc_attr($product['badge'] ?? '');
                ?>
                <a href="<?php echo $product_url; ?>" class="ss-card ss-sneaker-grid__item" data-ss-animate <?php echo $enable_hover ? 'data-ss-tilt="5"' : ''; ?>>
                    <div class="ss-card__image">
                        <?php if ($product_badge && isset($badge_labels[$product_badge])) : ?>
                            <div class="ss-card__badges">
                                <span class="ss-badge ss-badge--<?php echo $product_badge; ?>">
                                    <?php echo $badge_labels[$product_badge]; ?>
                                </span>
                            </div>
                        <?php endif; ?>

                        <?php if ($product_image) : ?>
                            <img src="<?php echo $product_image; ?>" alt="<?php echo $product_name; ?>" loading="lazy" />
                        <?php else : ?>
                            <div class="ss-sneaker-grid__placeholder">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                                </svg>
                            </div>
                        <?php endif; ?>
                    </div>

                    <div class="ss-card__content">
                        <?php if ($show_brand && $product_brand) : ?>
                            <span class="ss-card__brand"><?php echo $product_brand; ?></span>
                        <?php endif; ?>

                        <h3 class="ss-card__title"><?php echo $product_name; ?></h3>

                        <?php if ($show_price && $product_price) : ?>
                            <div class="ss-price">
                                <span class="ss-price__current"><?php echo $currency . $product_price; ?></span>
                                <?php if ($product_original_price) : ?>
                                    <span class="ss-price__original"><?php echo $currency . $product_original_price; ?></span>
                                <?php endif; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>
