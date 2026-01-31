<?php
/**
 * Category Slider Block - Render lato server
 * Shopify-style horizontal scrollable category showcase
 */

$title = $attributes['title'] ?? '';
$categories = $attributes['categories'] ?? [];

if (empty($categories)) {
    return;
}

$block_id = 'gh-cat-slider-' . wp_unique_id();
?>
<section class="gh-block gh-category-slider" id="<?php echo esc_attr($block_id); ?>">
    <div class="gh-category-slider__container">
        <?php if (!empty($title)) : ?>
            <header class="gh-category-slider__header">
                <h2 class="gh-category-slider__title"><?php echo esc_html($title); ?></h2>
            </header>
        <?php endif; ?>

        <div class="gh-category-slider__wrapper">
            <div class="gh-category-slider__track" data-gh-slider-track>
                <?php foreach ($categories as $index => $category) : ?>
                    <a href="<?php echo esc_url($category['url'] ?? '#'); ?>"
                       class="gh-category-slider__item">
                        <div class="gh-category-slider__image-wrapper">
                            <?php if (!empty($category['image'])) : ?>
                                <img src="<?php echo esc_url($category['image']); ?>"
                                     alt="<?php echo esc_attr($category['name'] ?? ''); ?>"
                                     class="gh-category-slider__image"
                                     loading="<?php echo $index < 4 ? 'eager' : 'lazy'; ?>">
                            <?php endif; ?>
                        </div>
                        <?php if (!empty($category['name'])) : ?>
                            <p class="gh-category-slider__name"><?php echo esc_html($category['name']); ?></p>
                        <?php endif; ?>
                    </a>
                <?php endforeach; ?>
            </div>

            <div class="gh-category-slider__nav">
                <button class="gh-category-slider__arrow gh-category-slider__arrow--prev"
                        data-gh-slider-prev
                        aria-label="Precedente">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>
                <button class="gh-category-slider__arrow gh-category-slider__arrow--next"
                        data-gh-slider-next
                        aria-label="Seguente">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</section>
