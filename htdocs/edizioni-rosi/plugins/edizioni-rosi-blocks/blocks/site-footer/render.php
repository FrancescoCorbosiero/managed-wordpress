<?php
/**
 * Site Footer Block — Server-side render
 * Minimal editorial footer with nav, copyright and developer credit
 */

$copyright_text = $attributes['copyrightText'] ?? 'Edizioni Rosi';
$developer_name = $attributes['developerName'] ?? '';
$developer_url  = $attributes['developerUrl'] ?? '';
$nav_items      = $attributes['navItems'] ?? [];
$year           = gmdate('Y');
?>
<footer class="er-footer">
    <div class="er-footer__container">

        <?php if (!empty($nav_items)) : ?>
            <nav class="er-footer__nav" aria-label="Navigazione footer">
                <?php foreach ($nav_items as $item) : ?>
                    <a href="<?php echo esc_url($item['href'] ?? '#'); ?>" class="er-footer__link">
                        <?php echo esc_html($item['label'] ?? ''); ?>
                    </a>
                <?php endforeach; ?>
            </nav>
        <?php endif; ?>

        <div class="er-footer__line"></div>

        <p class="er-footer__copy">
            &copy; <?php echo esc_html($year . ' ' . $copyright_text); ?>. Tutti i diritti riservati.
        </p>

        <?php if (!empty($developer_name)) : ?>
            <div class="er-footer__dev">
                <span>{ }</span>
                Developed by
                <?php if (!empty($developer_url)) : ?>
                    <a href="<?php echo esc_url($developer_url); ?>" target="_blank" rel="noopener"><?php echo esc_html($developer_name); ?></a>
                <?php else : ?>
                    <?php echo esc_html($developer_name); ?>
                <?php endif; ?>
            </div>
        <?php endif; ?>

    </div>
</footer>
