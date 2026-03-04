<?php
/**
 * Site Header Block - Server-side render
 * Sticky header with logo and navigation
 */

$logo_url  = $attributes['logoUrl'] ?? '';
$site_name = $attributes['siteName'] ?? 'Edizioni Rosi';
$nav_items = $attributes['navItems'] ?? [];

$current_path = wp_parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
?>
<header class="er-header">
    <div class="er-header__container">
        <a href="/" class="er-logo">
            <?php if (!empty($logo_url)) : ?>
                <span class="er-logo__glow"></span>
                <img class="er-logo__img"
                     src="<?php echo esc_url($logo_url); ?>"
                     alt="<?php echo esc_attr($site_name); ?>"
                     loading="eager">
            <?php else : ?>
                <span class="er-logo__text"><?php echo esc_html($site_name); ?></span>
            <?php endif; ?>
        </a>

        <?php if (!empty($nav_items)) : ?>
            <nav class="er-nav" aria-label="Navigazione principale">
                <?php foreach ($nav_items as $item) :
                    $is_active = ($current_path === ($item['href'] ?? ''));
                    $classes   = 'er-nav__link' . ($is_active ? ' er-nav__link--active' : '');
                ?>
                    <a href="<?php echo esc_url($item['href'] ?? '#'); ?>"
                       class="<?php echo esc_attr($classes); ?>"
                       <?php echo $is_active ? 'aria-current="page"' : ''; ?>>
                        <?php echo esc_html($item['label'] ?? ''); ?>
                    </a>
                <?php endforeach; ?>
            </nav>
        <?php endif; ?>
    </div>
</header>
