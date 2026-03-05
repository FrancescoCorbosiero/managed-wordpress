<?php
/**
 * FAQ Block - Server Side Render
 */
defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? '');
$description = esc_html($attributes['description'] ?? '');
$items = $attributes['items'] ?? array();
$allow_multiple = $attributes['allowMultiple'] ?? false;
$default_open = intval($attributes['defaultOpen'] ?? -1);
$style = esc_attr($attributes['style'] ?? 'default');
$icon_position = esc_attr($attributes['iconPosition'] ?? 'right');
$columns = intval($attributes['columns'] ?? 1);

$classes = array('alpacode-faq');
$classes[] = 'alpacode-faq--' . $style;
$classes[] = 'alpacode-faq--icon-' . $icon_position;
$classes[] = 'alpacode-faq--cols-' . $columns;

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'data-allow-multiple' => $allow_multiple ? 'true' : 'false',
));
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-faq__container">
        <?php if ($eyebrow || $heading || $description) : ?>
            <div class="alpacode-faq__header" data-alpacode-animate="fade-up">
                <?php if ($eyebrow) : ?>
                    <span class="alpacode-faq__eyebrow"><?php echo $eyebrow; ?></span>
                <?php endif; ?>
                <?php if ($heading) : ?>
                    <h2 class="alpacode-faq__heading"><?php echo $heading; ?></h2>
                <?php endif; ?>
                <?php if ($description) : ?>
                    <p class="alpacode-faq__description"><?php echo $description; ?></p>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($items)) : ?>
            <div class="alpacode-faq__list" data-alpacode-stagger="0.1">
                <?php foreach ($items as $index => $item) :
                    $question = esc_html($item['question'] ?? '');
                    $answer = wp_kses_post($item['answer'] ?? '');
                    $is_open = $index === $default_open;
                ?>
                    <div class="alpacode-faq__item <?php echo $is_open ? 'alpacode-faq__item--open' : ''; ?>">
                        <button
                            class="alpacode-faq__question"
                            type="button"
                            aria-expanded="<?php echo $is_open ? 'true' : 'false'; ?>"
                            aria-controls="faq-answer-<?php echo $index; ?>"
                        >
                            <span class="alpacode-faq__question-text"><?php echo $question; ?></span>
                            <span class="alpacode-faq__icon" aria-hidden="true">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path class="alpacode-faq__icon-h" d="M4 10h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    <path class="alpacode-faq__icon-v" d="M10 4v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </span>
                        </button>
                        <div
                            class="alpacode-faq__answer"
                            id="faq-answer-<?php echo $index; ?>"
                            role="region"
                            <?php echo $is_open ? '' : 'hidden'; ?>
                        >
                            <div class="alpacode-faq__answer-content">
                                <?php echo $answer; ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
