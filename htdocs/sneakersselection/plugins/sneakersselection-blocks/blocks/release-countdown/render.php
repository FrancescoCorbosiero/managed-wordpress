<?php
/**
 * Release Countdown Block - Server-side render
 */

$heading = esc_html($attributes['heading'] ?? 'Dropping Soon');
$product_name = esc_html($attributes['productName'] ?? '');
$release_date = esc_attr($attributes['releaseDate'] ?? '');
$expired_text = esc_attr($attributes['expiredText'] ?? 'Available Now!');
$background_color = esc_attr($attributes['backgroundColor'] ?? '#000000');
$text_color = esc_attr($attributes['textColor'] ?? '#ffffff');
$accent_color = esc_attr($attributes['accentColor'] ?? '#ff3c00');
$image_url = esc_url($attributes['imageUrl'] ?? '');
$button_text = esc_html($attributes['buttonText'] ?? 'Notify Me');
$button_url = esc_url($attributes['buttonUrl'] ?? '#');
$show_days = $attributes['showDays'] ?? true;
$show_hours = $attributes['showHours'] ?? true;
$show_minutes = $attributes['showMinutes'] ?? true;
$show_seconds = $attributes['showSeconds'] ?? true;

$classes = array('ss-block', 'ss-release-countdown');

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'style' => sprintf(
        '--ss-countdown-bg: %s; --ss-countdown-text: %s; --ss-countdown-accent: %s;',
        $background_color,
        $text_color,
        $accent_color
    ),
));
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="ss-container ss-release-countdown__container">
        <?php if ($image_url) : ?>
            <div class="ss-release-countdown__image" data-ss-animate="scale" data-ss-float>
                <img src="<?php echo $image_url; ?>" alt="<?php echo $product_name; ?>" />
            </div>
        <?php endif; ?>

        <div class="ss-release-countdown__content" data-ss-animate>
            <?php if ($heading) : ?>
                <span class="ss-label ss-release-countdown__eyebrow"><?php echo $heading; ?></span>
            <?php endif; ?>

            <?php if ($product_name) : ?>
                <h2 class="ss-heading ss-heading--1 ss-release-countdown__title"><?php echo $product_name; ?></h2>
            <?php endif; ?>

            <?php if ($release_date) : ?>
                <div
                    class="ss-countdown ss-release-countdown__timer"
                    data-ss-countdown="<?php echo $release_date; ?>"
                    data-ss-countdown-expired="<?php echo $expired_text; ?>"
                >
                    <?php if ($show_days) : ?>
                        <div class="ss-countdown__item">
                            <span class="ss-countdown__value" data-ss-countdown-days>00</span>
                            <span class="ss-countdown__label"><?php _e('Days', 'sneakersselection-blocks'); ?></span>
                        </div>
                    <?php endif; ?>

                    <?php if ($show_hours) : ?>
                        <div class="ss-countdown__item">
                            <span class="ss-countdown__value" data-ss-countdown-hours>00</span>
                            <span class="ss-countdown__label"><?php _e('Hours', 'sneakersselection-blocks'); ?></span>
                        </div>
                    <?php endif; ?>

                    <?php if ($show_minutes) : ?>
                        <div class="ss-countdown__item">
                            <span class="ss-countdown__value" data-ss-countdown-minutes>00</span>
                            <span class="ss-countdown__label"><?php _e('Minutes', 'sneakersselection-blocks'); ?></span>
                        </div>
                    <?php endif; ?>

                    <?php if ($show_seconds) : ?>
                        <div class="ss-countdown__item">
                            <span class="ss-countdown__value" data-ss-countdown-seconds>00</span>
                            <span class="ss-countdown__label"><?php _e('Seconds', 'sneakersselection-blocks'); ?></span>
                        </div>
                    <?php endif; ?>
                </div>
            <?php else : ?>
                <p class="ss-text ss-release-countdown__no-date"><?php _e('Set a release date to display the countdown', 'sneakersselection-blocks'); ?></p>
            <?php endif; ?>

            <?php if ($button_text) : ?>
                <a href="<?php echo $button_url; ?>" class="ss-button ss-button--accent ss-button--large">
                    <?php echo $button_text; ?>
                </a>
            <?php endif; ?>
        </div>
    </div>
</section>
