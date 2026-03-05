<?php
/**
 * Size Chart Modal Block - Server-side render
 */

$modal_id = $attributes['modalId'] ?? 'size-chart';
$title = $attributes['title'] ?? 'Size Guide';
$description = $attributes['description'] ?? 'Find your perfect fit';
$trigger_text = $attributes['triggerText'] ?? 'Size Guide';
$show_trigger = $attributes['showTrigger'] ?? true;

// Sneaker size conversion data
$sizes = [
    ['us' => '6', 'uk' => '5.5', 'eu' => '38.5', 'cm' => '24'],
    ['us' => '6.5', 'uk' => '6', 'eu' => '39', 'cm' => '24.5'],
    ['us' => '7', 'uk' => '6', 'eu' => '40', 'cm' => '25'],
    ['us' => '7.5', 'uk' => '6.5', 'eu' => '40.5', 'cm' => '25.5'],
    ['us' => '8', 'uk' => '7', 'eu' => '41', 'cm' => '26'],
    ['us' => '8.5', 'uk' => '7.5', 'eu' => '42', 'cm' => '26.5'],
    ['us' => '9', 'uk' => '8', 'eu' => '42.5', 'cm' => '27'],
    ['us' => '9.5', 'uk' => '8.5', 'eu' => '43', 'cm' => '27.5'],
    ['us' => '10', 'uk' => '9', 'eu' => '44', 'cm' => '28'],
    ['us' => '10.5', 'uk' => '9.5', 'eu' => '44.5', 'cm' => '28.5'],
    ['us' => '11', 'uk' => '10', 'eu' => '45', 'cm' => '29'],
    ['us' => '11.5', 'uk' => '10.5', 'eu' => '45.5', 'cm' => '29.5'],
    ['us' => '12', 'uk' => '11', 'eu' => '46', 'cm' => '30'],
    ['us' => '13', 'uk' => '12', 'eu' => '47.5', 'cm' => '31'],
];
?>

<?php if ($show_trigger) : ?>
<button class="ss-size-guide-trigger" data-ss-modal-trigger="<?php echo esc_attr($modal_id); ?>">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10H3M21 6H3M21 14H3M21 18H3"/>
    </svg>
    <?php echo esc_html($trigger_text); ?>
</button>
<?php endif; ?>

<div class="ss-block ss-modal" data-ss-modal="<?php echo esc_attr($modal_id); ?>" role="dialog" aria-modal="true" aria-labelledby="<?php echo esc_attr($modal_id); ?>-title">
    <div class="ss-modal__backdrop"></div>
    <div class="ss-modal__container">
        <div class="ss-modal__header">
            <h2 class="ss-modal__title" id="<?php echo esc_attr($modal_id); ?>-title"><?php echo esc_html($title); ?></h2>
            <button class="ss-modal__close" data-ss-modal-close aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
        </div>
        <div class="ss-modal__body">
            <?php if (!empty($description)) : ?>
                <p style="margin-bottom: 1.5rem; color: #737373;"><?php echo esc_html($description); ?></p>
            <?php endif; ?>

            <table class="ss-size-chart">
                <thead>
                    <tr>
                        <th>US</th>
                        <th>UK</th>
                        <th>EU</th>
                        <th>CM</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($sizes as $size) : ?>
                        <tr>
                            <td><?php echo esc_html($size['us']); ?></td>
                            <td><?php echo esc_html($size['uk']); ?></td>
                            <td><?php echo esc_html($size['eu']); ?></td>
                            <td><?php echo esc_html($size['cm']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>

            <p style="margin-top: 1.5rem; font-size: 0.875rem; color: #a3a3a3;">
                Tip: If you're between sizes, we recommend sizing up for a more comfortable fit.
            </p>
        </div>
    </div>
</div>

<style>
.ss-size-guide-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0;
    background: none;
    border: none;
    font-size: 0.875rem;
    color: #525252;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
    transition: color 0.2s;
}
.ss-size-guide-trigger:hover {
    color: #000;
}
</style>
