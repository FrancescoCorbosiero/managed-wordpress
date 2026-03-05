<?php
/**
 * Brand Marquee Block - Server-side render
 */

$title = $attributes['title'] ?? 'Shop By Brand';
$brands = $attributes['brands'] ?? [];
$speed = $attributes['speed'] ?? 50;
$direction = $attributes['direction'] ?? 'left';
$pause_on_hover = $attributes['pauseOnHover'] ?? true;

if (empty($brands)) {
    return;
}

$pause_attr = $pause_on_hover ? '' : 'data-ss-marquee-pause="false"';
?>
<section class="ss-block ss-brand-marquee">
    <?php if (!empty($title)) : ?>
        <div class="ss-brand-marquee__header">
            <h2 class="ss-brand-marquee__title"><?php echo esc_html($title); ?></h2>
        </div>
    <?php endif; ?>

    <div class="ss-brand-marquee__track-wrapper" data-ss-marquee data-ss-marquee-speed="<?php echo esc_attr($speed); ?>" data-ss-marquee-direction="<?php echo esc_attr($direction); ?>" <?php echo $pause_attr; ?>>
        <div class="ss-brand-marquee__track" data-ss-marquee-track>
            <?php foreach ($brands as $brand) : ?>
                <?php if (!empty($brand['logo'])) : ?>
                    <a href="<?php echo esc_url($brand['url'] ?? '#'); ?>" class="ss-brand-marquee__item" title="<?php echo esc_attr($brand['name'] ?? ''); ?>">
                        <img src="<?php echo esc_url($brand['logo']); ?>" alt="<?php echo esc_attr($brand['name'] ?? 'Brand logo'); ?>" loading="lazy">
                    </a>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </div>
</section>
