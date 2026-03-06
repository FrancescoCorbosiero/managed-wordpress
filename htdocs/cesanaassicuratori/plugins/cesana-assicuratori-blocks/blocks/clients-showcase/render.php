<?php
/**
 * Clients Showcase Block — Server-side render
 * Logo grid showcasing clients/partners
 */

$eyebrow   = $attributes['eyebrow'] ?? '';
$title     = $attributes['title'] ?? '';
$images    = $attributes['images'] ?? array();
$columns   = $attributes['columns'] ?? 4;
$grayscale = $attributes['grayscale'] ?? true;

if (empty($images)) {
    return;
}

$col_class = 'ca-clients-showcase__grid--' . intval($columns) . 'col';
$gray_class = $grayscale ? ' ca-clients-showcase--grayscale' : '';
?>
<section class="ca-block ca-clients-showcase<?php echo esc_attr($gray_class); ?>">
    <div class="ca-clients-showcase__container">

        <?php if (!empty($title) || !empty($eyebrow)) : ?>
            <div class="ca-clients-showcase__header" data-ca-reveal="up">
                <?php if (!empty($eyebrow)) : ?>
                    <span class="ca-clients-showcase__eyebrow"><?php echo esc_html($eyebrow); ?></span>
                <?php endif; ?>
                <?php if (!empty($title)) : ?>
                    <h2 class="ca-clients-showcase__title"><?php echo esc_html($title); ?></h2>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <div class="ca-clients-showcase__grid <?php echo esc_attr($col_class); ?>" data-ca-stagger data-ca-stagger-delay="60">
            <?php foreach ($images as $image) :
                $url = $image['url'] ?? '';
                $alt = $image['alt'] ?? '';
                if (empty($url)) continue;
            ?>
                <div class="ca-clients-showcase__item">
                    <img src="<?php echo esc_url($url); ?>"
                         alt="<?php echo esc_attr($alt); ?>"
                         loading="lazy">
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
