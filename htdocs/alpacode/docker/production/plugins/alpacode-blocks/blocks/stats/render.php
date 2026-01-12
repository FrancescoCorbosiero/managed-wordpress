<?php
/**
 * Stats Counter Block - Server Side Render
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 */

defined('ABSPATH') || exit;

$stats = $attributes['stats'] ?? [];
$animation_duration = $attributes['animationDuration'] ?? 2000;

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'alpacode-stats',
    'data-duration' => $animation_duration,
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-stats__container">
        <div class="alpacode-stats__grid">
            <?php foreach ($stats as $index => $stat): ?>
                <div class="alpacode-stats__item" data-index="<?php echo $index; ?>">
                    <div class="alpacode-stats__icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="2" opacity="0.1" />
                            <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="2" stroke-dasharray="126"
                                stroke-dashoffset="126" class="alpacode-stats__circle"
                                style="animation-delay: <?php echo $index * 0.1; ?>s" />
                            <path d="M24 14v20m-10-10h20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                        </svg>
                    </div>

                    <div class="alpacode-stats__number-wrapper">
                        <span class="alpacode-stats__number" data-target="<?php echo esc_attr($stat['number']); ?>">
                            0
                        </span>
                        <span class="alpacode-stats__suffix"><?php echo esc_html($stat['suffix']); ?></span>
                    </div>

                    <h3 class="alpacode-stats__label"><?php echo esc_html($stat['label']); ?></h3>

                    <?php if (!empty($stat['description'])): ?>
                        <p class="alpacode-stats__description"><?php echo esc_html($stat['description']); ?></p>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>