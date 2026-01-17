<?php
/**
 * Product Showcase Block - Server-side render
 */

$brand = esc_html($attributes['brand'] ?? 'Nike');
$name = esc_html($attributes['name'] ?? 'Air Jordan 1 Retro High OG');
$colorway = esc_html($attributes['colorway'] ?? '');
$style_code = esc_html($attributes['styleCode'] ?? '');
$price = esc_html($attributes['price'] ?? '180');
$original_price = esc_html($attributes['originalPrice'] ?? '');
$currency = esc_html($attributes['currency'] ?? '$');
$badge = esc_attr($attributes['badge'] ?? '');
$description = esc_html($attributes['description'] ?? '');
$main_image = esc_url($attributes['mainImage'] ?? '');
$gallery_images = $attributes['galleryImages'] ?? array();
$sizes = $attributes['sizes'] ?? array();
$unavailable_sizes = $attributes['unavailableSizes'] ?? array();
$button_text = esc_html($attributes['buttonText'] ?? 'Add to Cart');
$button_url = esc_url($attributes['buttonUrl'] ?? '#');
$show_size_selector = $attributes['showSizeSelector'] ?? true;
$show_gallery = $attributes['showGallery'] ?? true;

$classes = array('ss-block', 'ss-product-showcase');

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
    <div class="ss-container ss-product-showcase__container">
        <div class="ss-product-showcase__gallery" data-ss-animate="slide-right" <?php echo $show_gallery ? 'data-ss-gallery data-ss-gallery-zoom' : ''; ?>>
            <?php if ($badge && isset($badge_labels[$badge])) : ?>
                <span class="ss-badge ss-badge--<?php echo $badge; ?> ss-product-showcase__badge">
                    <?php echo $badge_labels[$badge]; ?>
                </span>
            <?php endif; ?>

            <div class="ss-product-showcase__main-image">
                <?php if ($main_image) : ?>
                    <img src="<?php echo $main_image; ?>" alt="<?php echo $name; ?>" data-ss-gallery-main />
                <?php else : ?>
                    <div class="ss-product-showcase__placeholder">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                    </div>
                <?php endif; ?>
            </div>

            <?php if ($show_gallery && !empty($gallery_images)) : ?>
                <div class="ss-product-showcase__thumbnails">
                    <?php if ($main_image) : ?>
                        <button class="ss-product-showcase__thumb ss-gallery__thumb--active" data-ss-gallery-thumb="<?php echo $main_image; ?>">
                            <img src="<?php echo $main_image; ?>" alt="<?php echo $name; ?> - Main" />
                        </button>
                    <?php endif; ?>
                    <?php foreach ($gallery_images as $index => $image) : ?>
                        <button class="ss-product-showcase__thumb" data-ss-gallery-thumb="<?php echo esc_url($image['url'] ?? ''); ?>">
                            <img src="<?php echo esc_url($image['url'] ?? ''); ?>" alt="<?php echo $name; ?> - View <?php echo $index + 2; ?>" />
                        </button>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>

        <div class="ss-product-showcase__details" data-ss-animate="slide-left">
            <div class="ss-product-showcase__header">
                <?php if ($brand) : ?>
                    <span class="ss-label ss-product-showcase__brand"><?php echo $brand; ?></span>
                <?php endif; ?>

                <h2 class="ss-heading ss-heading--2 ss-product-showcase__name"><?php echo $name; ?></h2>

                <?php if ($colorway) : ?>
                    <p class="ss-text ss-product-showcase__colorway"><?php echo $colorway; ?></p>
                <?php endif; ?>

                <?php if ($style_code) : ?>
                    <p class="ss-text ss-text--sm ss-product-showcase__style-code">Style: <?php echo $style_code; ?></p>
                <?php endif; ?>
            </div>

            <div class="ss-price ss-product-showcase__price">
                <span class="ss-price__current"><?php echo $currency . $price; ?></span>
                <?php if ($original_price) : ?>
                    <span class="ss-price__original"><?php echo $currency . $original_price; ?></span>
                    <?php
                    $discount = round((($original_price - $price) / $original_price) * 100);
                    ?>
                    <span class="ss-price__discount">-<?php echo $discount; ?>%</span>
                <?php endif; ?>
            </div>

            <?php if ($description) : ?>
                <p class="ss-text ss-product-showcase__description"><?php echo $description; ?></p>
            <?php endif; ?>

            <?php if ($show_size_selector && !empty($sizes)) : ?>
                <div class="ss-product-showcase__sizes" data-ss-size-selector>
                    <div class="ss-product-showcase__sizes-header">
                        <span class="ss-label">Select Size</span>
                        <span class="ss-text ss-text--sm" data-ss-size-selected>-</span>
                    </div>
                    <div class="ss-sizes">
                        <?php foreach ($sizes as $size) : ?>
                            <?php
                            $is_unavailable = in_array($size, $unavailable_sizes);
                            $size_class = 'ss-size';
                            if ($is_unavailable) {
                                $size_class .= ' ss-size--disabled';
                            }
                            ?>
                            <button class="<?php echo $size_class; ?>" data-ss-size="<?php echo esc_attr($size); ?>" <?php echo $is_unavailable ? 'disabled' : ''; ?>>
                                <?php echo esc_html($size); ?>
                            </button>
                        <?php endforeach; ?>
                    </div>
                    <input type="hidden" name="selected_size" value="" />
                </div>
            <?php endif; ?>

            <div class="ss-product-showcase__actions">
                <a href="<?php echo $button_url; ?>" class="ss-button ss-button--primary ss-button--large ss-product-showcase__add-to-cart">
                    <?php echo $button_text; ?>
                </a>
            </div>
        </div>
    </div>
</section>
