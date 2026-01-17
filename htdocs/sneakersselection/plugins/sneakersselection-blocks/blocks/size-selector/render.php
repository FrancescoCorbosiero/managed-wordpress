<?php
/**
 * Size Selector Block - Server-side render
 */

$label = esc_html($attributes['label'] ?? 'Select Size');
$size_type = esc_html($attributes['sizeType'] ?? 'US');
$sizes = $attributes['sizes'] ?? array();
$unavailable_sizes = $attributes['unavailableSizes'] ?? array();
$low_stock_sizes = $attributes['lowStockSizes'] ?? array();
$show_size_guide = $attributes['showSizeGuideLink'] ?? true;
$size_guide_url = esc_url($attributes['sizeGuideUrl'] ?? '#size-guide');
$layout = esc_attr($attributes['layout'] ?? 'grid');

$classes = array('ss-block', 'ss-size-selector');
$classes[] = 'ss-size-selector--' . $layout;

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
));
?>

<div <?php echo $wrapper_attributes; ?> data-ss-size-selector>
    <div class="ss-size-selector__header">
        <span class="ss-label ss-size-selector__label">
            <?php echo $label; ?>
            <span class="ss-size-selector__type">(<?php echo $size_type; ?>)</span>
        </span>

        <div class="ss-size-selector__actions">
            <span class="ss-text ss-text--sm ss-size-selector__selected" data-ss-size-selected>-</span>
            <?php if ($show_size_guide) : ?>
                <a href="<?php echo $size_guide_url; ?>" class="ss-size-selector__guide-link">
                    Size Guide
                </a>
            <?php endif; ?>
        </div>
    </div>

    <div class="ss-sizes ss-size-selector__sizes">
        <?php foreach ($sizes as $size) : ?>
            <?php
            $is_unavailable = in_array($size, $unavailable_sizes);
            $is_low_stock = in_array($size, $low_stock_sizes);

            $size_classes = array('ss-size');
            if ($is_unavailable) {
                $size_classes[] = 'ss-size--disabled';
            }
            if ($is_low_stock && !$is_unavailable) {
                $size_classes[] = 'ss-size--low-stock';
            }
            ?>
            <button
                class="<?php echo implode(' ', $size_classes); ?>"
                data-ss-size="<?php echo esc_attr($size); ?>"
                <?php echo $is_unavailable ? 'disabled aria-disabled="true"' : ''; ?>
                aria-label="<?php echo $is_unavailable ? sprintf(__('Size %s - Unavailable', 'sneakersselection-blocks'), $size) : sprintf(__('Size %s', 'sneakersselection-blocks'), $size); ?>"
            >
                <?php echo esc_html($size); ?>
                <?php if ($is_low_stock && !$is_unavailable) : ?>
                    <span class="ss-sr-only"><?php _e('- Low stock', 'sneakersselection-blocks'); ?></span>
                <?php endif; ?>
            </button>
        <?php endforeach; ?>
    </div>

    <input type="hidden" name="selected_size" value="" />
</div>
