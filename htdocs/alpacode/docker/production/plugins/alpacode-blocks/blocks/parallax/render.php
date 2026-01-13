<?php
/**
 * Parallax Section Block - Server Side Render
 */

defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? '');
$description = esc_html($attributes['description'] ?? '');
$background_image = esc_url($attributes['backgroundImage'] ?? '');
$background_position = esc_attr($attributes['backgroundPosition'] ?? 'center center');
$parallax_speed = floatval($attributes['parallaxSpeed'] ?? 0.5);
$min_height = intval($attributes['minHeight'] ?? 500);
$overlay_opacity = intval($attributes['overlayOpacity'] ?? 50);
$content_alignment = esc_attr($attributes['contentAlignment'] ?? 'center');
$vertical_alignment = esc_attr($attributes['verticalAlignment'] ?? 'center');
$show_button = $attributes['showButton'] ?? false;
$button_text = esc_html($attributes['buttonText'] ?? 'Learn More');
$button_url = esc_url($attributes['buttonUrl'] ?? '#');
$variant = esc_attr($attributes['variant'] ?? 'default');
$enable_parallax = $attributes['enableParallax'] ?? true;
$enable_zoom = $attributes['enableZoom'] ?? false;

$classes = array('alpacode-parallax');
$classes[] = 'alpacode-parallax--' . $variant;
$classes[] = 'alpacode-parallax--align-' . $content_alignment;
$classes[] = 'alpacode-parallax--valign-' . $vertical_alignment;

if ($enable_parallax) {
    $classes[] = 'alpacode-parallax--enabled';
}
if ($enable_zoom) {
    $classes[] = 'alpacode-parallax--zoom';
}

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'data-parallax-speed' => $parallax_speed,
    'data-parallax-enabled' => $enable_parallax ? 'true' : 'false',
    'style' => '--parallax-min-height: ' . $min_height . 'px; --parallax-overlay-opacity: ' . ($overlay_opacity / 100) . ';'
));

// Placeholder image for editor preview
$placeholder_svg = 'data:image/svg+xml,' . rawurlencode('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><rect fill="#1a1a2e" width="1920" height="1080"/><text x="50%" y="50%" font-family="system-ui" font-size="48" fill="#4a4a6a" text-anchor="middle" dy=".3em">Parallax Background</text></svg>');
$bg_image = $background_image ?: $placeholder_svg;
?>

<section <?php echo $wrapper_attributes; ?>>
    <!-- Background Layer -->
    <div class="alpacode-parallax__background"
         data-parallax-bg
         style="background-image: url('<?php echo $bg_image; ?>'); background-position: <?php echo $background_position; ?>;">
    </div>

    <!-- Overlay -->
    <div class="alpacode-parallax__overlay"></div>

    <!-- Content -->
    <div class="alpacode-parallax__container">
        <div class="alpacode-parallax__content" data-alpacode-animate="fade-up">
            <?php if ($eyebrow) : ?>
                <span class="alpacode-parallax__eyebrow"><?php echo $eyebrow; ?></span>
            <?php endif; ?>

            <?php if ($heading) : ?>
                <h2 class="alpacode-parallax__heading"><?php echo $heading; ?></h2>
            <?php endif; ?>

            <?php if ($description) : ?>
                <p class="alpacode-parallax__description"><?php echo $description; ?></p>
            <?php endif; ?>

            <?php if ($show_button && $button_text) : ?>
                <div class="alpacode-parallax__actions">
                    <a href="<?php echo $button_url; ?>" class="alpacode-parallax__button">
                        <span><?php echo $button_text; ?></span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <!-- Scroll indicator for fullscreen variant -->
    <?php if ($variant === 'fullscreen') : ?>
        <div class="alpacode-parallax__scroll-indicator">
            <span>Scroll</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </div>
    <?php endif; ?>
</section>
