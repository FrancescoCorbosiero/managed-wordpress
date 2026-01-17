<?php
/**
 * Size Chart Block - Server-side render
 */

$heading = esc_html($attributes['heading'] ?? 'Size Guide');
$description = esc_html($attributes['description'] ?? '');
$gender = esc_attr($attributes['gender'] ?? 'mens');
$show_us = $attributes['showUS'] ?? true;
$show_uk = $attributes['showUK'] ?? true;
$show_eu = $attributes['showEU'] ?? true;
$show_cm = $attributes['showCM'] ?? true;
$highlight_size = esc_attr($attributes['highlightSize'] ?? '');

$classes = array('ss-block', 'ss-size-chart');

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
));

// Size conversion data
$mens_sizes = array(
    array('us' => '6', 'uk' => '5.5', 'eu' => '38.5', 'cm' => '24'),
    array('us' => '6.5', 'uk' => '6', 'eu' => '39', 'cm' => '24.5'),
    array('us' => '7', 'uk' => '6', 'eu' => '40', 'cm' => '25'),
    array('us' => '7.5', 'uk' => '6.5', 'eu' => '40.5', 'cm' => '25.5'),
    array('us' => '8', 'uk' => '7', 'eu' => '41', 'cm' => '26'),
    array('us' => '8.5', 'uk' => '7.5', 'eu' => '42', 'cm' => '26.5'),
    array('us' => '9', 'uk' => '8', 'eu' => '42.5', 'cm' => '27'),
    array('us' => '9.5', 'uk' => '8.5', 'eu' => '43', 'cm' => '27.5'),
    array('us' => '10', 'uk' => '9', 'eu' => '44', 'cm' => '28'),
    array('us' => '10.5', 'uk' => '9.5', 'eu' => '44.5', 'cm' => '28.5'),
    array('us' => '11', 'uk' => '10', 'eu' => '45', 'cm' => '29'),
    array('us' => '11.5', 'uk' => '10.5', 'eu' => '45.5', 'cm' => '29.5'),
    array('us' => '12', 'uk' => '11', 'eu' => '46', 'cm' => '30'),
    array('us' => '13', 'uk' => '12', 'eu' => '47.5', 'cm' => '31'),
    array('us' => '14', 'uk' => '13', 'eu' => '48.5', 'cm' => '32'),
);

$womens_sizes = array(
    array('us' => '5', 'uk' => '2.5', 'eu' => '35.5', 'cm' => '22'),
    array('us' => '5.5', 'uk' => '3', 'eu' => '36', 'cm' => '22.5'),
    array('us' => '6', 'uk' => '3.5', 'eu' => '36.5', 'cm' => '23'),
    array('us' => '6.5', 'uk' => '4', 'eu' => '37.5', 'cm' => '23.5'),
    array('us' => '7', 'uk' => '4.5', 'eu' => '38', 'cm' => '24'),
    array('us' => '7.5', 'uk' => '5', 'eu' => '38.5', 'cm' => '24.5'),
    array('us' => '8', 'uk' => '5.5', 'eu' => '39', 'cm' => '25'),
    array('us' => '8.5', 'uk' => '6', 'eu' => '40', 'cm' => '25.5'),
    array('us' => '9', 'uk' => '6.5', 'eu' => '40.5', 'cm' => '26'),
    array('us' => '9.5', 'uk' => '7', 'eu' => '41', 'cm' => '26.5'),
    array('us' => '10', 'uk' => '7.5', 'eu' => '42', 'cm' => '27'),
    array('us' => '10.5', 'uk' => '8', 'eu' => '42.5', 'cm' => '27.5'),
    array('us' => '11', 'uk' => '8.5', 'eu' => '43', 'cm' => '28'),
    array('us' => '12', 'uk' => '9.5', 'eu' => '44', 'cm' => '29'),
);

$kids_sizes = array(
    array('us' => '3.5Y', 'uk' => '3', 'eu' => '35.5', 'cm' => '22.5'),
    array('us' => '4Y', 'uk' => '3.5', 'eu' => '36', 'cm' => '23'),
    array('us' => '4.5Y', 'uk' => '4', 'eu' => '36.5', 'cm' => '23.5'),
    array('us' => '5Y', 'uk' => '4.5', 'eu' => '37.5', 'cm' => '24'),
    array('us' => '5.5Y', 'uk' => '5', 'eu' => '38', 'cm' => '24.5'),
    array('us' => '6Y', 'uk' => '5.5', 'eu' => '38.5', 'cm' => '25'),
    array('us' => '6.5Y', 'uk' => '6', 'eu' => '39', 'cm' => '25.5'),
    array('us' => '7Y', 'uk' => '6', 'eu' => '40', 'cm' => '26'),
);

$sizes = $mens_sizes;
if ($gender === 'womens') {
    $sizes = $womens_sizes;
} elseif ($gender === 'kids') {
    $sizes = $kids_sizes;
}

$gender_labels = array(
    'mens' => __("Men's", 'sneakersselection-blocks'),
    'womens' => __("Women's", 'sneakersselection-blocks'),
    'kids' => __("Kids'", 'sneakersselection-blocks'),
);
?>

<div <?php echo $wrapper_attributes; ?> data-ss-animate>
    <?php if ($heading || $description) : ?>
        <div class="ss-size-chart__header">
            <?php if ($heading) : ?>
                <h3 class="ss-heading ss-heading--4 ss-size-chart__heading"><?php echo $heading; ?></h3>
            <?php endif; ?>
            <?php if ($description) : ?>
                <p class="ss-text ss-size-chart__description"><?php echo $description; ?></p>
            <?php endif; ?>
        </div>
    <?php endif; ?>

    <div class="ss-size-chart__tabs" data-ss-tabs>
        <div class="ss-size-chart__tab-list" role="tablist">
            <button
                class="ss-size-chart__tab ss-tab--active"
                data-ss-tab-trigger="mens"
                role="tab"
                aria-selected="<?php echo $gender === 'mens' ? 'true' : 'false'; ?>"
            >
                <?php echo $gender_labels['mens']; ?>
            </button>
            <button
                class="ss-size-chart__tab"
                data-ss-tab-trigger="womens"
                role="tab"
                aria-selected="<?php echo $gender === 'womens' ? 'true' : 'false'; ?>"
            >
                <?php echo $gender_labels['womens']; ?>
            </button>
            <button
                class="ss-size-chart__tab"
                data-ss-tab-trigger="kids"
                role="tab"
                aria-selected="<?php echo $gender === 'kids' ? 'true' : 'false'; ?>"
            >
                <?php echo $gender_labels['kids']; ?>
            </button>
        </div>

        <?php foreach (array('mens' => $mens_sizes, 'womens' => $womens_sizes, 'kids' => $kids_sizes) as $type => $type_sizes) : ?>
            <div
                class="ss-size-chart__panel ss-tab-panel--active"
                data-ss-tab-panel="<?php echo $type; ?>"
                role="tabpanel"
                <?php echo $type !== $gender ? 'hidden' : ''; ?>
            >
                <div class="ss-size-chart__table-wrapper">
                    <table class="ss-size-chart__table">
                        <thead>
                            <tr>
                                <?php if ($show_us) : ?><th>US</th><?php endif; ?>
                                <?php if ($show_uk) : ?><th>UK</th><?php endif; ?>
                                <?php if ($show_eu) : ?><th>EU</th><?php endif; ?>
                                <?php if ($show_cm) : ?><th>CM</th><?php endif; ?>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($type_sizes as $size) : ?>
                                <?php $is_highlighted = $highlight_size && $size['us'] === $highlight_size; ?>
                                <tr class="<?php echo $is_highlighted ? 'ss-size-chart__row--highlight' : ''; ?>">
                                    <?php if ($show_us) : ?><td><?php echo esc_html($size['us']); ?></td><?php endif; ?>
                                    <?php if ($show_uk) : ?><td><?php echo esc_html($size['uk']); ?></td><?php endif; ?>
                                    <?php if ($show_eu) : ?><td><?php echo esc_html($size['eu']); ?></td><?php endif; ?>
                                    <?php if ($show_cm) : ?><td><?php echo esc_html($size['cm']); ?></td><?php endif; ?>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>
