<?php
/**
 * Price Display Block - Server-side render
 */

$retail_price = esc_html($attributes['retailPrice'] ?? '180');
$resale_price = esc_html($attributes['resalePrice'] ?? '350');
$currency = esc_html($attributes['currency'] ?? '$');
$retail_label = esc_html($attributes['retailLabel'] ?? 'Retail');
$resale_label = esc_html($attributes['resaleLabel'] ?? 'Resale');
$show_resale = $attributes['showResale'] ?? true;
$show_difference = $attributes['showDifference'] ?? true;
$layout = esc_attr($attributes['layout'] ?? 'horizontal');
$highlight = esc_attr($attributes['highlightPrice'] ?? 'retail');

$classes = array('ss-block', 'ss-price-display');
$classes[] = 'ss-price-display--' . $layout;

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
));

// Calculate price difference
$retail_num = floatval(str_replace(',', '', $retail_price));
$resale_num = floatval(str_replace(',', '', $resale_price));
$difference = $resale_num - $retail_num;
$percentage = $retail_num > 0 ? round(($difference / $retail_num) * 100) : 0;
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="ss-price-display__prices">
        <div class="ss-price-display__item <?php echo $highlight === 'retail' ? 'ss-price-display__item--highlight' : ''; ?>">
            <span class="ss-label ss-price-display__label"><?php echo $retail_label; ?></span>
            <span class="ss-price-display__value" data-ss-counter="<?php echo intval($retail_num); ?>" data-ss-counter-prefix="<?php echo $currency; ?>">
                <?php echo $currency . number_format($retail_num); ?>
            </span>
        </div>

        <?php if ($show_resale) : ?>
            <div class="ss-price-display__separator">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </div>

            <div class="ss-price-display__item <?php echo $highlight === 'resale' ? 'ss-price-display__item--highlight' : ''; ?>">
                <span class="ss-label ss-price-display__label"><?php echo $resale_label; ?></span>
                <span class="ss-price-display__value" data-ss-counter="<?php echo intval($resale_num); ?>" data-ss-counter-prefix="<?php echo $currency; ?>">
                    <?php echo $currency . number_format($resale_num); ?>
                </span>
            </div>
        <?php endif; ?>
    </div>

    <?php if ($show_resale && $show_difference && $difference != 0) : ?>
        <div class="ss-price-display__difference <?php echo $difference > 0 ? 'ss-price-display__difference--up' : 'ss-price-display__difference--down'; ?>">
            <?php if ($difference > 0) : ?>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5H7z"/>
                </svg>
                <span>+<?php echo $currency . number_format($difference); ?></span>
                <span class="ss-price-display__percentage">(+<?php echo $percentage; ?>%)</span>
            <?php else : ?>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5H7z"/>
                </svg>
                <span><?php echo $currency . number_format($difference); ?></span>
                <span class="ss-price-display__percentage">(<?php echo $percentage; ?>%)</span>
            <?php endif; ?>
        </div>
    <?php endif; ?>
</div>
