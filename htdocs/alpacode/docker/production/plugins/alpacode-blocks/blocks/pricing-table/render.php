<?php
/**
 * Pricing Block - Premium Server Side Render
 */

defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? $attributes['sectionTitle'] ?? '');
$description = esc_html($attributes['description'] ?? '');
$enable_toggle = $attributes['enableToggle'] ?? true;
$monthly_label = esc_html($attributes['monthlyLabel'] ?? 'Monthly');
$annual_label = esc_html($attributes['annualLabel'] ?? 'Annual');
$annual_discount = intval($attributes['annualDiscount'] ?? 20);
$plans = $attributes['plans'] ?? array();
$card_style = esc_attr($attributes['cardStyle'] ?? 'default');

$classes = array('alpacode-pricing');
$classes[] = 'alpacode-pricing--card-' . $card_style;

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'data-toggle' => $enable_toggle ? 'true' : 'false',
));
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-pricing__container">
        <!-- Header -->
        <?php if ($eyebrow || $heading || $description || $enable_toggle) : ?>
            <div class="alpacode-pricing__header" data-alpacode-animate="fade-up">
                <?php if ($eyebrow) : ?>
                    <span class="alpacode-pricing__eyebrow"><?php echo $eyebrow; ?></span>
                <?php endif; ?>
                <?php if ($heading) : ?>
                    <h2 class="alpacode-pricing__heading"><?php echo $heading; ?></h2>
                <?php endif; ?>
                <?php if ($description) : ?>
                    <p class="alpacode-pricing__description"><?php echo $description; ?></p>
                <?php endif; ?>

                <?php if ($enable_toggle) : ?>
                    <div class="alpacode-pricing__toggle-wrapper">
                        <span class="alpacode-pricing__toggle-label alpacode-pricing__toggle-label--monthly alpacode-pricing__toggle-label--active">
                            <?php echo $monthly_label; ?>
                        </span>
                        <button class="alpacode-pricing__toggle" role="switch" aria-checked="false" aria-label="Toggle annual pricing">
                            <span class="alpacode-pricing__toggle-slider"></span>
                        </button>
                        <span class="alpacode-pricing__toggle-label alpacode-pricing__toggle-label--annual">
                            <?php echo $annual_label; ?>
                            <?php if ($annual_discount > 0) : ?>
                                <span class="alpacode-pricing__discount-badge">-<?php echo $annual_discount; ?>%</span>
                            <?php endif; ?>
                        </span>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <!-- Pricing Cards -->
        <?php if (!empty($plans)) : ?>
            <div class="alpacode-pricing__grid" data-alpacode-stagger="0.1">
                <?php foreach ($plans as $index => $plan) :
                    $is_featured = $plan['featured'] ?? false;
                    $name = esc_html($plan['name'] ?? '');
                    $monthly_price = esc_html($plan['monthlyPrice'] ?? $plan['price'] ?? '0');
                    $annual_price = esc_html($plan['annualPrice'] ?? $monthly_price);
                    $currency = esc_html($plan['currency'] ?? '$');
                    $plan_description = esc_html($plan['description'] ?? '');
                    $features = $plan['features'] ?? array();
                    $button_text = esc_html($plan['buttonText'] ?? 'Get Started');
                    $button_url = esc_url($plan['buttonUrl'] ?? '#');
                    $badge = esc_html($plan['badge'] ?? ($is_featured ? 'Most Popular' : ''));

                    $card_classes = array('alpacode-pricing__card');
                    if ($is_featured) {
                        $card_classes[] = 'alpacode-pricing__card--featured';
                    }
                ?>
                    <div class="<?php echo implode(' ', $card_classes); ?>">
                        <!-- Glow effect -->
                        <div class="alpacode-pricing__card-glow"></div>

                        <!-- Badge -->
                        <?php if ($badge) : ?>
                            <div class="alpacode-pricing__badge"><?php echo $badge; ?></div>
                        <?php endif; ?>

                        <!-- Card Header -->
                        <div class="alpacode-pricing__card-header">
                            <h3 class="alpacode-pricing__plan-name"><?php echo $name; ?></h3>
                            <?php if ($plan_description) : ?>
                                <p class="alpacode-pricing__plan-description"><?php echo $plan_description; ?></p>
                            <?php endif; ?>
                        </div>

                        <!-- Price -->
                        <div class="alpacode-pricing__price-wrapper">
                            <div class="alpacode-pricing__price-container">
                                <span class="alpacode-pricing__price alpacode-pricing__price--monthly alpacode-pricing__price--active">
                                    <span class="alpacode-pricing__currency"><?php echo $currency; ?></span>
                                    <span class="alpacode-pricing__amount"><?php echo $monthly_price; ?></span>
                                </span>
                                <span class="alpacode-pricing__price alpacode-pricing__price--annual">
                                    <span class="alpacode-pricing__currency"><?php echo $currency; ?></span>
                                    <span class="alpacode-pricing__amount"><?php echo $annual_price; ?></span>
                                </span>
                            </div>
                            <span class="alpacode-pricing__period">/month</span>
                        </div>

                        <!-- Features -->
                        <ul class="alpacode-pricing__features">
                            <?php foreach ($features as $feature) :
                                // Handle both old string format and new object format
                                if (is_array($feature)) {
                                    $feature_text = esc_html($feature['text'] ?? '');
                                    $feature_included = $feature['included'] ?? true;
                                } else {
                                    $feature_text = esc_html($feature);
                                    $feature_included = true;
                                }
                                $feature_class = 'alpacode-pricing__feature';
                                if (!$feature_included) {
                                    $feature_class .= ' alpacode-pricing__feature--disabled';
                                }
                            ?>
                                <li class="<?php echo $feature_class; ?>">
                                    <?php if ($feature_included) : ?>
                                        <svg class="alpacode-pricing__check" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                            <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.15"/>
                                            <path d="M6 10l2.5 2.5L14 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    <?php else : ?>
                                        <svg class="alpacode-pricing__cross" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                            <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.1"/>
                                            <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        </svg>
                                    <?php endif; ?>
                                    <span><?php echo $feature_text; ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>

                        <!-- Button -->
                        <a href="<?php echo $button_url; ?>"
                           class="alpacode-pricing__button"
                           data-alpacode-magnetic>
                            <span><?php echo $button_text; ?></span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>

                        <!-- Border decoration -->
                        <?php if ($card_style !== 'default') : ?>
                            <div class="alpacode-pricing__card-border"></div>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>

    <!-- Background decoration -->
    <div class="alpacode-pricing__bg-decoration">
        <div class="alpacode-pricing__bg-gradient"></div>
    </div>
</section>
