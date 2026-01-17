<?php
/**
 * Brand Carousel Block - Server-side render
 */

$heading = esc_html($attributes['heading'] ?? '');
$brands = $attributes['brands'] ?? array();
$speed = intval($attributes['speed'] ?? 30);
$direction = esc_attr($attributes['direction'] ?? 'left');
$pause_on_hover = $attributes['pauseOnHover'] ?? true;
$show_brand_names = $attributes['showBrandNames'] ?? false;
$grayscale = $attributes['grayscale'] ?? true;
$background_color = esc_attr($attributes['backgroundColor'] ?? '#ffffff');

$classes = array('ss-block', 'ss-brand-carousel');
if ($grayscale) {
    $classes[] = 'ss-brand-carousel--grayscale';
}
if ($pause_on_hover) {
    $classes[] = 'ss-brand-carousel--pause-hover';
}

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'style' => sprintf('--ss-carousel-bg: %s;', $background_color),
));
?>

<section <?php echo $wrapper_attributes; ?>>
    <?php if ($heading) : ?>
        <div class="ss-container">
            <h2 class="ss-heading ss-heading--5 ss-brand-carousel__heading"><?php echo $heading; ?></h2>
        </div>
    <?php endif; ?>

    <div
        class="ss-brand-carousel__marquee"
        data-ss-marquee
        data-ss-marquee-speed="<?php echo $speed; ?>"
        data-ss-marquee-direction="<?php echo $direction; ?>"
    >
        <div class="ss-brand-carousel__track" data-ss-marquee-track>
            <?php foreach ($brands as $brand) : ?>
                <?php
                $brand_name = esc_html($brand['name'] ?? '');
                $brand_logo = esc_url($brand['logo'] ?? '');
                $brand_url = esc_url($brand['url'] ?? '#');
                ?>
                <a href="<?php echo $brand_url; ?>" class="ss-brand-carousel__item" title="<?php echo $brand_name; ?>">
                    <?php if ($brand_logo) : ?>
                        <img src="<?php echo $brand_logo; ?>" alt="<?php echo $brand_name; ?>" loading="lazy" />
                    <?php else : ?>
                        <span class="ss-brand-carousel__placeholder"><?php echo $brand_name; ?></span>
                    <?php endif; ?>
                    <?php if ($show_brand_names) : ?>
                        <span class="ss-brand-carousel__name"><?php echo $brand_name; ?></span>
                    <?php endif; ?>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>
