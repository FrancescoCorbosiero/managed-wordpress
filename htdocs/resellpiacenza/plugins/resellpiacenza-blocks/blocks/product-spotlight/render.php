<?php
/**
 * Product Spotlight Block - Server-side render
 */

$image_url = $attributes['imageUrl'] ?? '';
$category = $attributes['category'] ?? '';
$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$condition = $attributes['condition'] ?? '';
$size = $attributes['size'] ?? '';
$authenticity = $attributes['authenticity'] ?? '';
$current_price = $attributes['currentPrice'] ?? '';
$original_price = $attributes['originalPrice'] ?? '';
$button_text = $attributes['buttonText'] ?? 'View Product';
$button_url = $attributes['buttonUrl'] ?? '';

if (empty($title)) {
    return;
}
?>
<section class="rp-block rp-product-spotlight">
    <div class="rp-product-spotlight__bg-pattern" aria-hidden="true"></div>

    <div class="rp-product-spotlight__container">
        <div class="rp-product-spotlight__image-wrapper" data-rp-reveal="left">
            <div class="rp-product-spotlight__image">
                <?php if (!empty($image_url)) : ?>
                    <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>" loading="lazy">
                <?php endif; ?>

                <?php if (!empty($authenticity)) : ?>
                    <span class="rp-product-spotlight__verified">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 12l2 2 4-4"/>
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        <?php echo esc_html($authenticity); ?>
                    </span>
                <?php endif; ?>
            </div>
        </div>

        <div class="rp-product-spotlight__content" data-rp-reveal="right">
            <?php if (!empty($category)) : ?>
                <span class="rp-product-spotlight__category"><?php echo esc_html($category); ?></span>
            <?php endif; ?>

            <h2 class="rp-product-spotlight__title"><?php echo esc_html($title); ?></h2>

            <?php if (!empty($description)) : ?>
                <p class="rp-product-spotlight__description"><?php echo esc_html($description); ?></p>
            <?php endif; ?>

            <?php if (!empty($condition) || !empty($size) || !empty($authenticity)) : ?>
                <div class="rp-product-spotlight__meta">
                    <?php if (!empty($condition)) : ?>
                        <div class="rp-product-spotlight__meta-item">
                            <span class="rp-product-spotlight__meta-label">Condition</span>
                            <span class="rp-product-spotlight__meta-value"><?php echo esc_html($condition); ?></span>
                        </div>
                    <?php endif; ?>

                    <?php if (!empty($size)) : ?>
                        <div class="rp-product-spotlight__meta-item">
                            <span class="rp-product-spotlight__meta-label">Size</span>
                            <span class="rp-product-spotlight__meta-value"><?php echo esc_html($size); ?></span>
                        </div>
                    <?php endif; ?>

                    <?php if (!empty($authenticity)) : ?>
                        <div class="rp-product-spotlight__meta-item">
                            <span class="rp-product-spotlight__meta-label">Status</span>
                            <span class="rp-product-spotlight__meta-value"><?php echo esc_html($authenticity); ?></span>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($current_price)) : ?>
                <div class="rp-product-spotlight__price">
                    <span class="rp-product-spotlight__price-current"><?php echo esc_html($current_price); ?></span>
                    <?php if (!empty($original_price)) : ?>
                        <span class="rp-product-spotlight__price-original"><?php echo esc_html($original_price); ?></span>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($button_url)) : ?>
                <a href="<?php echo esc_url($button_url); ?>" class="rp-btn rp-btn--primary rp-btn--large">
                    <?php echo esc_html($button_text); ?>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            <?php endif; ?>
        </div>
    </div>
</section>
