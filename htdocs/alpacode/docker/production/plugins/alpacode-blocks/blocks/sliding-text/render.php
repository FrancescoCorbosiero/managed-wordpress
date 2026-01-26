<?php
/**
 * Sliding Text Block - Server Side Render
 */
defined('ABSPATH') || exit;

$items = $attributes['items'] ?? array();
$separator = esc_attr($attributes['separator'] ?? 'star');
$speed = intval($attributes['speed'] ?? 30);
$direction = esc_attr($attributes['direction'] ?? 'left');
$pause_on_hover = $attributes['pauseOnHover'] ?? true;
$size = esc_attr($attributes['size'] ?? 'large');
$variant = esc_attr($attributes['variant'] ?? 'default');
$show_border = $attributes['showBorder'] ?? true;

$classes = array('alpacode-sliding-text');
$classes[] = 'alpacode-sliding-text--' . $size;
$classes[] = 'alpacode-sliding-text--' . $variant;
$classes[] = 'alpacode-sliding-text--' . $direction;
if ($pause_on_hover) {
    $classes[] = 'alpacode-sliding-text--pause-hover';
}
if ($show_border) {
    $classes[] = 'alpacode-sliding-text--bordered';
}

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'style' => '--slide-duration: ' . $speed . 's;',
));

$separators = array(
    'star' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z"/></svg>',
    'dot' => '<span class="alpacode-sliding-text__dot"></span>',
    'dash' => '<span class="alpacode-sliding-text__dash">—</span>',
    'slash' => '<span class="alpacode-sliding-text__slash">/</span>',
    'none' => '',
);

$sep_html = $separators[$separator] ?? '';
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-sliding-text__track">
        <?php for ($i = 0; $i < 3; $i++) : ?>
            <div class="alpacode-sliding-text__content" aria-hidden="<?php echo $i > 0 ? 'true' : 'false'; ?>">
                <?php foreach ($items as $index => $item) :
                    $text = esc_html($item['text'] ?? '');
                    $highlight = $item['highlight'] ?? false;
                ?>
                    <?php if ($index > 0 && $sep_html) : ?>
                        <span class="alpacode-sliding-text__separator"><?php echo $sep_html; ?></span>
                    <?php endif; ?>
                    <span class="alpacode-sliding-text__item <?php echo $highlight ? 'alpacode-sliding-text__item--highlight' : ''; ?>">
                        <?php echo $text; ?>
                    </span>
                <?php endforeach; ?>
                <?php if ($sep_html) : ?>
                    <span class="alpacode-sliding-text__separator"><?php echo $sep_html; ?></span>
                <?php endif; ?>
            </div>
        <?php endfor; ?>
    </div>
</div>
