<?php
/**
 * Logo Carousel Block - Premium Server Side Render
 */

defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? '');
$logos = $attributes['logos'] ?? array();
$layout = esc_attr($attributes['layout'] ?? 'infinite');
$scroll_speed = intval($attributes['scrollSpeed'] ?? 25);
$scroll_direction = esc_attr($attributes['scrollDirection'] ?? 'left');
$pause_on_hover = $attributes['pauseOnHover'] ?? true;
$show_fade_edges = $attributes['showFadeEdges'] ?? true;
$grayscale = $attributes['grayscale'] ?? true;
$logo_size = esc_attr($attributes['logoSize'] ?? 'medium');
$rows = intval($attributes['rows'] ?? 1);
$columns = intval($attributes['columns'] ?? 5);
$variant = esc_attr($attributes['variant'] ?? 'default');

$classes = array('alpacode-logos');
$classes[] = 'alpacode-logos--' . $layout;
$classes[] = 'alpacode-logos--' . $variant;
$classes[] = 'alpacode-logos--size-' . $logo_size;

if ($grayscale) {
    $classes[] = 'alpacode-logos--grayscale';
}
if ($show_fade_edges && $layout === 'infinite') {
    $classes[] = 'alpacode-logos--fade-edges';
}
if ($pause_on_hover) {
    $classes[] = 'alpacode-logos--pause-hover';
}

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'data-layout' => $layout,
    'data-speed' => $scroll_speed,
    'data-direction' => $scroll_direction,
));

// Empty state for editor preview
if (empty($logos)) {
    $logos = array(
        array('name' => 'Company 1', 'url' => '', 'image' => ''),
        array('name' => 'Company 2', 'url' => '', 'image' => ''),
        array('name' => 'Company 3', 'url' => '', 'image' => ''),
        array('name' => 'Company 4', 'url' => '', 'image' => ''),
        array('name' => 'Company 5', 'url' => '', 'image' => ''),
        array('name' => 'Company 6', 'url' => '', 'image' => ''),
    );
}

/**
 * Render a single logo item
 */
function render_logo_item($logo) {
    $name = esc_html($logo['name'] ?? '');
    $url = esc_url($logo['url'] ?? '');
    $image = esc_url($logo['image'] ?? '');

    ob_start();
    ?>
    <div class="alpacode-logos__item">
        <?php if ($url) : ?>
            <a href="<?php echo $url; ?>"
               class="alpacode-logos__link"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="<?php echo $name; ?>">
        <?php endif; ?>

        <?php if ($image) : ?>
            <img src="<?php echo $image; ?>"
                 alt="<?php echo $name; ?>"
                 class="alpacode-logos__image"
                 loading="lazy"
                 decoding="async" />
        <?php else : ?>
            <div class="alpacode-logos__placeholder">
                <span><?php echo $name ?: 'Logo'; ?></span>
            </div>
        <?php endif; ?>

        <?php if ($url) : ?>
            </a>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-logos__container">
        <!-- Header -->
        <?php if ($eyebrow || $heading) : ?>
            <div class="alpacode-logos__header" data-alpacode-animate="fade-up">
                <?php if ($eyebrow) : ?>
                    <span class="alpacode-logos__eyebrow"><?php echo $eyebrow; ?></span>
                <?php endif; ?>
                <?php if ($heading) : ?>
                    <h2 class="alpacode-logos__heading"><?php echo $heading; ?></h2>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <!-- Logos -->
        <?php if (!empty($logos)) : ?>
            <?php if ($layout === 'grid') : ?>
                <!-- Grid Layout -->
                <div class="alpacode-logos__grid"
                     style="--columns: <?php echo $columns; ?>;"
                     data-alpacode-stagger="0.05">
                    <?php foreach ($logos as $logo) : ?>
                        <?php echo render_logo_item($logo); ?>
                    <?php endforeach; ?>
                </div>

            <?php elseif ($layout === 'static') : ?>
                <!-- Static Row Layout -->
                <div class="alpacode-logos__static">
                    <?php foreach ($logos as $logo) : ?>
                        <?php echo render_logo_item($logo); ?>
                    <?php endforeach; ?>
                </div>

            <?php else : ?>
                <!-- Infinite Scroll Layout -->
                <div class="alpacode-logos__marquee-wrapper">
                    <?php if ($show_fade_edges) : ?>
                        <div class="alpacode-logos__fade alpacode-logos__fade--left"></div>
                        <div class="alpacode-logos__fade alpacode-logos__fade--right"></div>
                    <?php endif; ?>

                    <?php for ($row = 0; $row < $rows; $row++) : ?>
                        <div class="alpacode-logos__marquee"
                             style="--scroll-speed: <?php echo $scroll_speed; ?>s; --scroll-direction: <?php echo $scroll_direction === 'right' ? 'reverse' : 'normal'; ?>;">
                            <div class="alpacode-logos__track">
                                <!-- Original set -->
                                <?php foreach ($logos as $logo) : ?>
                                    <?php echo render_logo_item($logo); ?>
                                <?php endforeach; ?>
                                <!-- Duplicate for seamless loop -->
                                <?php foreach ($logos as $logo) : ?>
                                    <?php echo render_logo_item($logo); ?>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php endfor; ?>
                </div>
            <?php endif; ?>
        <?php endif; ?>
    </div>

    <!-- Background line decoration -->
    <?php if ($variant !== 'minimal') : ?>
        <div class="alpacode-logos__decoration">
            <div class="alpacode-logos__line"></div>
        </div>
    <?php endif; ?>
</section>
