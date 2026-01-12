<?php
/**
 * CTA Block - Server Side Render
 */

defined('ABSPATH') || exit;

$heading = esc_html($attributes['heading'] ?? '');
$description = esc_html($attributes['description'] ?? '');
$button_text = esc_html($attributes['buttonText'] ?? '');
$button_url = esc_url($attributes['buttonUrl'] ?? '#');
$variant = $attributes['variant'] ?? 'default';

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => 'alpacode-cta alpacode-cta--' . $variant,
));
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-cta__bg"></div>
    <div class="alpacode-cta__content">
        <?php if ($heading) : ?>
            <h2 class="alpacode-cta__heading"><?php echo $heading; ?></h2>
        <?php endif; ?>
        
        <?php if ($description) : ?>
            <p class="alpacode-cta__description"><?php echo $description; ?></p>
        <?php endif; ?>
        
        <?php if ($button_text) : ?>
            <a href="<?php echo $button_url; ?>" class="alpacode-cta__button">
                <?php echo $button_text; ?>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
        <?php endif; ?>
    </div>
</section>
