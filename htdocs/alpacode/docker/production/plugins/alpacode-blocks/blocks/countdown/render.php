<?php
/**
 * Countdown Block - Server Side Render
 */
defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? '');
$description = esc_html($attributes['description'] ?? '');
$target_date = esc_attr($attributes['targetDate'] ?? '');
$show_days = $attributes['showDays'] ?? true;
$show_hours = $attributes['showHours'] ?? true;
$show_minutes = $attributes['showMinutes'] ?? true;
$show_seconds = $attributes['showSeconds'] ?? true;
$expired_message = esc_html($attributes['expiredMessage'] ?? 'This offer has expired');
$show_spots = $attributes['showSpots'] ?? true;
$spots_remaining = intval($attributes['spotsRemaining'] ?? 7);
$spots_label = esc_html($attributes['spotsLabel'] ?? 'spots remaining');
$button_text = esc_html($attributes['buttonText'] ?? '');
$button_url = esc_url($attributes['buttonUrl'] ?? '#');
$style = esc_attr($attributes['style'] ?? 'default');
$layout = esc_attr($attributes['layout'] ?? 'center');

// Default to 7 days from now if no date set
if (empty($target_date)) {
    $target_date = date('Y-m-d\TH:i:s', strtotime('+7 days'));
}

$classes = array('alpacode-countdown');
$classes[] = 'alpacode-countdown--' . $style;
$classes[] = 'alpacode-countdown--' . $layout;

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'data-target-date' => $target_date,
    'data-expired-message' => $expired_message,
));
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-countdown__container">
        <div class="alpacode-countdown__content" data-alpacode-animate="fade-up">
            <?php if ($eyebrow) : ?>
                <span class="alpacode-countdown__eyebrow"><?php echo $eyebrow; ?></span>
            <?php endif; ?>

            <?php if ($heading) : ?>
                <h2 class="alpacode-countdown__heading"><?php echo $heading; ?></h2>
            <?php endif; ?>

            <?php if ($description) : ?>
                <p class="alpacode-countdown__description"><?php echo $description; ?></p>
            <?php endif; ?>

            <!-- Timer -->
            <div class="alpacode-countdown__timer">
                <?php if ($show_days) : ?>
                    <div class="alpacode-countdown__unit">
                        <span class="alpacode-countdown__value" data-unit="days">00</span>
                        <span class="alpacode-countdown__label">Days</span>
                    </div>
                    <span class="alpacode-countdown__separator">:</span>
                <?php endif; ?>

                <?php if ($show_hours) : ?>
                    <div class="alpacode-countdown__unit">
                        <span class="alpacode-countdown__value" data-unit="hours">00</span>
                        <span class="alpacode-countdown__label">Hours</span>
                    </div>
                    <span class="alpacode-countdown__separator">:</span>
                <?php endif; ?>

                <?php if ($show_minutes) : ?>
                    <div class="alpacode-countdown__unit">
                        <span class="alpacode-countdown__value" data-unit="minutes">00</span>
                        <span class="alpacode-countdown__label">Minutes</span>
                    </div>
                    <?php if ($show_seconds) : ?>
                        <span class="alpacode-countdown__separator">:</span>
                    <?php endif; ?>
                <?php endif; ?>

                <?php if ($show_seconds) : ?>
                    <div class="alpacode-countdown__unit">
                        <span class="alpacode-countdown__value" data-unit="seconds">00</span>
                        <span class="alpacode-countdown__label">Seconds</span>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Expired message (hidden by default) -->
            <div class="alpacode-countdown__expired" hidden>
                <?php echo $expired_message; ?>
            </div>

            <!-- Spots remaining -->
            <?php if ($show_spots && $spots_remaining > 0) : ?>
                <div class="alpacode-countdown__spots">
                    <span class="alpacode-countdown__spots-pulse"></span>
                    <span class="alpacode-countdown__spots-count"><?php echo $spots_remaining; ?></span>
                    <span class="alpacode-countdown__spots-label"><?php echo $spots_label; ?></span>
                </div>
            <?php endif; ?>

            <!-- CTA Button -->
            <?php if ($button_text && $button_url) : ?>
                <a href="<?php echo $button_url; ?>" class="alpacode-countdown__button" data-alpacode-magnetic>
                    <?php echo $button_text; ?>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            <?php endif; ?>
        </div>
    </div>

    <!-- Background glow -->
    <div class="alpacode-countdown__glow"></div>
</section>
