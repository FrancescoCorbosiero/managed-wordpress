<?php
/**
 * Stats Block - Premium Server Side Render
 */

defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? '');
$stats = $attributes['stats'] ?? array();
$layout = esc_attr($attributes['layout'] ?? 'grid');
$animation_duration = intval($attributes['animationDuration'] ?? 2000);
$enable_stagger = $attributes['enableStagger'] ?? true;

$classes = array('alpacode-stats');
$classes[] = 'alpacode-stats--' . $layout;

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
));
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-stats__container">
        <!-- Header -->
        <?php if ($eyebrow || $heading) : ?>
            <div class="alpacode-stats__header" data-alpacode-animate="fade-up">
                <?php if ($eyebrow) : ?>
                    <span class="alpacode-stats__eyebrow"><?php echo $eyebrow; ?></span>
                <?php endif; ?>
                <?php if ($heading) : ?>
                    <h2 class="alpacode-stats__heading"><?php echo $heading; ?></h2>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <!-- Stats Grid -->
        <?php if (!empty($stats)) : ?>
            <div class="alpacode-stats__grid" <?php echo $enable_stagger ? 'data-alpacode-stagger="0.15"' : ''; ?>>
                <?php foreach ($stats as $index => $stat) :
                    $number = esc_html($stat['number'] ?? '0');
                    $prefix = esc_html($stat['prefix'] ?? '');
                    $suffix = esc_html($stat['suffix'] ?? '');
                    $label = esc_html($stat['label'] ?? '');
                    $show_progress = $stat['showProgress'] ?? false;
                    $progress_value = intval($stat['progressValue'] ?? 0);
                ?>
                    <div class="alpacode-stats__item">
                        <div class="alpacode-stats__value">
                            <?php if ($prefix) : ?>
                                <span class="alpacode-stats__prefix"><?php echo $prefix; ?></span>
                            <?php endif; ?>
                            <span
                                class="alpacode-stats__number"
                                data-alpacode-count="<?php echo $number; ?>"
                                data-count-duration="<?php echo $animation_duration; ?>"
                                data-prefix="<?php echo $prefix; ?>"
                                data-suffix="<?php echo $suffix; ?>"
                            >
                                0
                            </span>
                            <?php if ($suffix) : ?>
                                <span class="alpacode-stats__suffix"><?php echo $suffix; ?></span>
                            <?php endif; ?>
                        </div>

                        <?php if ($label) : ?>
                            <div class="alpacode-stats__label"><?php echo $label; ?></div>
                        <?php endif; ?>

                        <?php if ($show_progress && $progress_value > 0) : ?>
                            <div class="alpacode-stats__progress" data-alpacode-progress="<?php echo $progress_value; ?>">
                                <div class="alpacode-stats__progress-bar"></div>
                            </div>
                        <?php endif; ?>

                        <div class="alpacode-stats__decoration"></div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
