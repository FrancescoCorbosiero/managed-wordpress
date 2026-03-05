<?php
/**
 * CTA Block - Premium Server Side Render
 */

defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? '');
$description = esc_html($attributes['description'] ?? '');
$button_text = esc_html($attributes['buttonText'] ?? '');
$button_url = esc_url($attributes['buttonUrl'] ?? '#');
$secondary_button_text = esc_html($attributes['secondaryButtonText'] ?? '');
$secondary_button_url = esc_url($attributes['secondaryButtonUrl'] ?? '');
$variant = esc_attr($attributes['variant'] ?? 'gradient');
$enable_animated_gradient = $attributes['enableAnimatedGradient'] ?? true;
$enable_glow = $attributes['enableGlow'] ?? true;
$enable_text_scramble = $attributes['enableTextScramble'] ?? false;

$classes = array('alpacode-cta');
$classes[] = 'alpacode-cta--' . $variant;
if ($enable_animated_gradient) {
    $classes[] = 'alpacode-cta--animated-gradient';
}
if ($enable_glow) {
    $classes[] = 'alpacode-cta--glow';
}

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
));
?>

<section <?php echo $wrapper_attributes; ?>>
    <!-- Background Layer -->
    <div class="alpacode-cta__bg">
        <!-- Animated gradient orbs -->
        <div class="alpacode-cta__orb alpacode-cta__orb--1"></div>
        <div class="alpacode-cta__orb alpacode-cta__orb--2"></div>

        <!-- Grid pattern -->
        <div class="alpacode-cta__grid"></div>

        <!-- Glow effect -->
        <?php if ($enable_glow) : ?>
            <div class="alpacode-cta__glow" data-alpacode-glow></div>
        <?php endif; ?>
    </div>

    <!-- Border -->
    <div class="alpacode-cta__border"></div>

    <!-- Content -->
    <div class="alpacode-cta__content">
        <?php if ($eyebrow) : ?>
            <span class="alpacode-cta__eyebrow" data-alpacode-animate="fade-up" data-delay="0">
                <?php echo $eyebrow; ?>
            </span>
        <?php endif; ?>

        <?php if ($heading) : ?>
            <h2
                class="alpacode-cta__heading"
                <?php if ($enable_text_scramble) : ?>
                    data-alpacode-scramble
                    data-scramble-duration="1500"
                <?php else : ?>
                    data-alpacode-animate="fade-up"
                    data-delay="0.1"
                <?php endif; ?>
            >
                <?php echo $heading; ?>
            </h2>
        <?php endif; ?>

        <?php if ($description) : ?>
            <p class="alpacode-cta__description" data-alpacode-animate="fade-up" data-delay="0.2">
                <?php echo $description; ?>
            </p>
        <?php endif; ?>

        <?php if ($button_text || $secondary_button_text) : ?>
            <div class="alpacode-cta__buttons" data-alpacode-animate="fade-up" data-delay="0.3">
                <?php if ($button_text) : ?>
                    <a
                        href="<?php echo $button_url; ?>"
                        class="alpacode-cta__button alpacode-cta__button--primary"
                        data-alpacode-magnetic
                        data-alpacode-ripple
                    >
                        <span class="alpacode-cta__button-text"><?php echo $button_text; ?></span>
                        <span class="alpacode-cta__button-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span class="alpacode-cta__button-glow"></span>
                    </a>
                <?php endif; ?>
                <?php if ($secondary_button_text) : ?>
                    <a
                        href="<?php echo $secondary_button_url; ?>"
                        class="alpacode-cta__button alpacode-cta__button--secondary"
                        data-alpacode-magnetic
                        data-magnetic-strength="0.2"
                    >
                        <span class="alpacode-cta__button-text"><?php echo $secondary_button_text; ?></span>
                    </a>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>

    <!-- Decorative elements -->
    <div class="alpacode-cta__decoration">
        <div class="alpacode-cta__ring alpacode-cta__ring--1"></div>
        <div class="alpacode-cta__ring alpacode-cta__ring--2"></div>
    </div>
</section>
