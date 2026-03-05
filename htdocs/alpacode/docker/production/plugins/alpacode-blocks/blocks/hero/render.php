<?php
/**
 * Hero Block - Premium Server Side Render
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 */

defined('ABSPATH') || exit;

// Extract attributes with defaults
$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? '');
$description = esc_html($attributes['description'] ?? '');
$show_buttons = $attributes['showButtons'] ?? true;
$primary_text = esc_html($attributes['primaryButtonText'] ?? '');
$primary_url = esc_url($attributes['primaryButtonUrl'] ?? '#');
$secondary_text = esc_html($attributes['secondaryButtonText'] ?? '');
$secondary_url = esc_url($attributes['secondaryButtonUrl'] ?? '#');

// Premium features
$background_type = esc_attr($attributes['backgroundType'] ?? 'gradient');
$video_url = esc_url($attributes['videoUrl'] ?? '');
$particle_density = intval($attributes['particleDensity'] ?? 30);
$enable_parallax = $attributes['enableParallax'] ?? true;
$enable_text_animation = $attributes['enableTextAnimation'] ?? true;
$show_scroll_indicator = $attributes['showScrollIndicator'] ?? true;
$alignment = esc_attr($attributes['alignment'] ?? 'center');

// Build classes
$classes = array('alpacode-hero');
$classes[] = 'alpacode-hero--bg-' . $background_type;
$classes[] = 'alpacode-hero--align-' . $alignment;

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
));

// Data attributes for JS animations
$data_attrs = array();
if ($background_type === 'particles') {
    $data_attrs[] = 'data-alpacode-particles';
    $data_attrs[] = 'data-particle-count="' . $particle_density . '"';
    $data_attrs[] = 'data-particle-color="var(--wp--preset--color--accent)"';
}
?>

<section <?php echo $wrapper_attributes; ?> <?php echo implode(' ', $data_attrs); ?>>
    <!-- Background Layer -->
    <div class="alpacode-hero__bg">
        <?php if ($background_type === 'video' && $video_url) : ?>
            <video class="alpacode-hero__video" autoplay muted loop playsinline>
                <source src="<?php echo $video_url; ?>" type="video/mp4">
            </video>
            <div class="alpacode-hero__video-overlay"></div>
        <?php endif; ?>

        <!-- Parallax Gradient Orbs -->
        <?php if ($enable_parallax) : ?>
            <div class="alpacode-hero__orb alpacode-hero__orb--1" data-alpacode-parallax="0.3"></div>
            <div class="alpacode-hero__orb alpacode-hero__orb--2" data-alpacode-parallax="0.5"></div>
            <div class="alpacode-hero__orb alpacode-hero__orb--3" data-alpacode-parallax="0.2"></div>
        <?php endif; ?>

        <!-- Grid Pattern -->
        <div class="alpacode-hero__grid"></div>
    </div>

    <!-- Main Content -->
    <div class="alpacode-hero__content">
        <?php if ($eyebrow) : ?>
            <span
                class="alpacode-hero__eyebrow"
                <?php if ($enable_text_animation) : ?>
                    data-alpacode-animate="fade-up"
                    data-delay="0"
                <?php endif; ?>
            >
                <?php echo $eyebrow; ?>
            </span>
        <?php endif; ?>

        <?php if ($heading) : ?>
            <h1
                class="alpacode-hero__heading"
                <?php if ($enable_text_animation) : ?>
                    data-alpacode-split="words"
                    data-split-delay="0.05"
                <?php endif; ?>
            >
                <?php echo $heading; ?>
            </h1>
        <?php endif; ?>

        <?php if ($description) : ?>
            <p
                class="alpacode-hero__description"
                <?php if ($enable_text_animation) : ?>
                    data-alpacode-animate="fade-up"
                    data-delay="0.4"
                <?php endif; ?>
            >
                <?php echo $description; ?>
            </p>
        <?php endif; ?>

        <?php if ($show_buttons && ($primary_text || $secondary_text)) : ?>
            <div
                class="alpacode-hero__buttons"
                <?php if ($enable_text_animation) : ?>
                    data-alpacode-animate="fade-up"
                    data-delay="0.6"
                <?php endif; ?>
            >
                <?php if ($primary_text) : ?>
                    <a
                        href="<?php echo $primary_url; ?>"
                        class="alpacode-hero__btn alpacode-hero__btn--primary"
                        data-alpacode-magnetic
                        data-alpacode-ripple
                    >
                        <span class="alpacode-hero__btn-text"><?php echo $primary_text; ?></span>
                        <span class="alpacode-hero__btn-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </a>
                <?php endif; ?>
                <?php if ($secondary_text) : ?>
                    <a
                        href="<?php echo $secondary_url; ?>"
                        class="alpacode-hero__btn alpacode-hero__btn--secondary"
                        data-alpacode-magnetic
                        data-magnetic-strength="0.2"
                    >
                        <span class="alpacode-hero__btn-text"><?php echo $secondary_text; ?></span>
                    </a>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>

    <!-- Scroll Indicator -->
    <?php if ($show_scroll_indicator) : ?>
        <div class="alpacode-hero__scroll-indicator" aria-hidden="true">
            <div class="alpacode-hero__scroll-mouse">
                <div class="alpacode-hero__scroll-wheel"></div>
            </div>
            <span class="alpacode-hero__scroll-text">Scroll</span>
        </div>
    <?php endif; ?>

    <!-- Floating Elements -->
    <?php if ($enable_parallax) : ?>
        <div class="alpacode-hero__floating">
            <div class="alpacode-hero__floating-shape alpacode-hero__floating-shape--1" data-alpacode-parallax="0.4"></div>
            <div class="alpacode-hero__floating-shape alpacode-hero__floating-shape--2" data-alpacode-parallax="-0.3"></div>
            <div class="alpacode-hero__floating-shape alpacode-hero__floating-shape--3" data-alpacode-parallax="0.6"></div>
        </div>
    <?php endif; ?>
</section>
