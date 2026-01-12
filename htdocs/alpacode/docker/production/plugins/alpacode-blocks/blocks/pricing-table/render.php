<?php
/**
 * Pricing Block - Server Side Render
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 */

defined('ABSPATH') || exit;

$section_title = esc_html($attributes['sectionTitle'] ?? '');
$section_subtitle = esc_html($attributes['sectionSubtitle'] ?? '');
$plans = $attributes['plans'] ?? [];

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'alpacode-pricing',
]);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-pricing__container">
        <?php if ($section_title || $section_subtitle): ?>
            <div class="alpacode-pricing__header">
                <?php if ($section_subtitle): ?>
                    <span class="alpacode-pricing__subtitle">
                        <?php echo $section_subtitle; ?>
                    </span>
                <?php endif; ?>
                <?php if ($section_title): ?>
                    <h2 class="alpacode-pricing__title">
                        <?php echo $section_title; ?>
                    </h2>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <div class="alpacode-pricing__grid">
            <?php foreach ($plans as $index => $plan):
                $is_featured = $plan['featured'] ?? false;
                $card_class = 'alpacode-pricing__card';
                if ($is_featured) {
                    $card_class .= ' alpacode-pricing__card--featured';
                }
                ?>
                <div class="<?php echo $card_class; ?>">
                    <?php if ($is_featured): ?>
                        <div class="alpacode-pricing__badge">Most Popular</div>
                    <?php endif; ?>

                    <div class="alpacode-pricing__card-header">
                        <h3 class="alpacode-pricing__plan-name">
                            <?php echo esc_html($plan['name']); ?>
                        </h3>
                        <p class="alpacode-pricing__plan-description">
                            <?php echo esc_html($plan['description']); ?>
                        </p>
                    </div>

                    <div class="alpacode-pricing__price-wrapper">
                        <span class="alpacode-pricing__currency">$</span>
                        <span class="alpacode-pricing__price">
                            <?php echo esc_html($plan['price']); ?>
                        </span>
                        <span class="alpacode-pricing__period">/
                            <?php echo esc_html($plan['period']); ?>
                        </span>
                    </div>

                    <ul class="alpacode-pricing__features">
                        <?php foreach ($plan['features'] as $feature): ?>
                            <li class="alpacode-pricing__feature">
                                <svg class="alpacode-pricing__check" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.1" />
                                    <path d="M6 10l2.5 2.5L14 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <?php echo esc_html($feature); ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>

                    <a href="<?php echo esc_url($plan['buttonUrl']); ?>" class="alpacode-pricing__button">
                        <?php echo esc_html($plan['buttonText']); ?>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </a>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>