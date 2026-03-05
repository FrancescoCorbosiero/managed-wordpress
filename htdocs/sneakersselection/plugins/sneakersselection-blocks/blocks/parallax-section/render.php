<?php
/**
 * Parallax Section Block - Server-side render
 */

$background_image = $attributes['backgroundImage'] ?? '';
$foreground_image = $attributes['foregroundImage'] ?? '';
$title = $attributes['title'] ?? '';
$text = $attributes['text'] ?? '';
$button_text = $attributes['buttonText'] ?? '';
$button_url = $attributes['buttonUrl'] ?? '';
$enable_mouse = $attributes['enableMouseParallax'] ?? true;

$mouse_attr = $enable_mouse ? 'data-ss-mouse-parallax' : '';
?>
<section class="ss-block ss-parallax-section" <?php echo $mouse_attr; ?>>
    <?php if (!empty($background_image)) : ?>
        <div class="ss-parallax-section__layer ss-parallax-section__layer--bg" data-ss-mouse-layer="10" data-ss-depth="0.3">
            <img src="<?php echo esc_url($background_image); ?>" alt="" loading="lazy">
        </div>
    <?php endif; ?>

    <?php if (!empty($foreground_image)) : ?>
        <div class="ss-parallax-section__layer ss-parallax-section__layer--mid" data-ss-mouse-layer="40">
            <img src="<?php echo esc_url($foreground_image); ?>" alt="" loading="lazy" data-ss-depth="0.6">
        </div>
    <?php endif; ?>

    <div class="ss-parallax-section__particles" aria-hidden="true">
        <?php for ($i = 0; $i < 20; $i++) : ?>
            <div class="ss-parallax-section__particle" style="left: <?php echo rand(0, 100); ?>%; animation-delay: <?php echo rand(0, 20); ?>s;"></div>
        <?php endfor; ?>
    </div>

    <div class="ss-parallax-section__content" data-ss-mouse-layer="20">
        <?php if (!empty($title)) : ?>
            <h2 class="ss-parallax-section__title" data-ss-reveal="up"><?php echo esc_html($title); ?></h2>
        <?php endif; ?>

        <?php if (!empty($text)) : ?>
            <p class="ss-parallax-section__text" data-ss-reveal="up" data-ss-reveal-delay="200"><?php echo esc_html($text); ?></p>
        <?php endif; ?>

        <?php if (!empty($button_text) && !empty($button_url)) : ?>
            <div data-ss-reveal="up" data-ss-reveal-delay="400">
                <a href="<?php echo esc_url($button_url); ?>" class="ss-btn ss-btn--outline ss-btn--large" data-ss-magnetic="0.2">
                    <?php echo esc_html($button_text); ?>
                </a>
            </div>
        <?php endif; ?>
    </div>
</section>
