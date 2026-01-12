<?php
/**
 * Hero Block - Server Side Render
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 */

defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? '');
$description = esc_html($attributes['description'] ?? '');
$show_buttons = $attributes['showButtons'] ?? true;
$primary_text = esc_html($attributes['primaryButtonText'] ?? '');
$primary_url = esc_url($attributes['primaryButtonUrl'] ?? '#');
$secondary_text = esc_html($attributes['secondaryButtonText'] ?? '');
$secondary_url = esc_url($attributes['secondaryButtonUrl'] ?? '#');

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => 'alpacode-hero',
));
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-hero__bg"></div>
    <div class="alpacode-hero__content">
        <?php if ($eyebrow) : ?>
            <span class="alpacode-hero__eyebrow"><?php echo $eyebrow; ?></span>
        <?php endif; ?>
        
        <?php if ($heading) : ?>
            <h1 class="alpacode-hero__heading"><?php echo $heading; ?></h1>
        <?php endif; ?>
        
        <?php if ($description) : ?>
            <p class="alpacode-hero__description"><?php echo $description; ?></p>
        <?php endif; ?>
        
        <?php if ($show_buttons && ($primary_text || $secondary_text)) : ?>
            <div class="alpacode-hero__buttons">
                <?php if ($primary_text) : ?>
                    <a href="<?php echo $primary_url; ?>" class="alpacode-hero__btn alpacode-hero__btn--primary">
                        <?php echo $primary_text; ?>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                <?php endif; ?>
                <?php if ($secondary_text) : ?>
                    <a href="<?php echo $secondary_url; ?>" class="alpacode-hero__btn alpacode-hero__btn--secondary">
                        <?php echo $secondary_text; ?>
                    </a>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
