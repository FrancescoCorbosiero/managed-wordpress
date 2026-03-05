<?php
/**
 * Book Grid Block - Server-side render
 * Container for book cards with section title
 */

$section_title = $attributes['sectionTitle'] ?? '';
?>
<div class="er-main">
    <?php if (!empty($section_title)) : ?>
        <h2 class="er-section-title"><?php echo esc_html($section_title); ?></h2>
    <?php endif; ?>

    <div class="er-books">
        <?php echo $content; ?>
    </div>
</div>
