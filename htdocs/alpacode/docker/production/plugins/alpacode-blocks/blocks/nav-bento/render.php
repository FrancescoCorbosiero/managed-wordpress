<?php
/**
 * Navigation Bento Block - Bento Grid Style Menu
 *
 * A creative fullscreen navigation using bento-grid layout.
 * Each menu item is a visually distinct tile with hover effects.
 */

defined('ABSPATH') || exit;

$menu_items = $attributes['menuItems'] ?? [];
$trigger_id = esc_attr($attributes['triggerId'] ?? 'nav-bento-trigger');
$color_scheme = esc_attr($attributes['colorScheme'] ?? 'dark');
$show_icons = $attributes['showIcons'] ?? true;
$show_descriptions = $attributes['showDescriptions'] ?? true;
$show_child_previews = $attributes['showChildPreviews'] ?? true;
$enable_hover_expand = $attributes['enableHoverExpand'] ?? true;
$footer_text = esc_html($attributes['footerText'] ?? '');

$classes = array('alpacode-nav-bento');
$classes[] = 'alpacode-nav-bento--' . $color_scheme;
if ($enable_hover_expand) $classes[] = 'alpacode-nav-bento--hover-expand';

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'id' => 'alpacode-nav-bento',
    'data-trigger' => $trigger_id,
    'aria-hidden' => 'true',
    'role' => 'dialog',
    'aria-modal' => 'true',
    'aria-label' => 'Navigation menu',
));

// Icons
$icons = array(
    'globe' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
    'smartphone' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    'camera' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    'eye' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    'file-text' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>',
    'mail' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>',
    'arrow' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>',
);
?>

<div <?php echo $wrapper_attributes; ?>>
    <!-- Background -->
    <div class="alpacode-nav-bento__bg">
        <div class="alpacode-nav-bento__bg-overlay"></div>
        <div class="alpacode-nav-bento__bg-grid"></div>
    </div>

    <!-- Close button -->
    <button class="alpacode-nav-bento__close" aria-label="Close menu">
        <span></span>
        <span></span>
    </button>

    <!-- Main Grid -->
    <div class="alpacode-nav-bento__container">
        <div class="alpacode-nav-bento__grid">
            <?php foreach ($menu_items as $index => $item):
                $label = esc_html($item['label'] ?? '');
                $url = esc_url($item['url'] ?? '#');
                $description = esc_html($item['description'] ?? '');
                $size = esc_attr($item['size'] ?? 'medium');
                $icon = esc_attr($item['icon'] ?? 'globe');
                $color = esc_attr($item['color'] ?? '#6366f1');
                $children = $item['children'] ?? [];
                $has_children = !empty($children);

                // Convert hex to RGB
                $rgb = sscanf($color, "#%02x%02x%02x");
                $rgb_str = $rgb ? implode(',', $rgb) : '99,102,241';
            ?>
            <div class="alpacode-nav-bento__tile alpacode-nav-bento__tile--<?php echo $size; ?> <?php echo $has_children ? 'has-children' : ''; ?>"
                 data-index="<?php echo $index; ?>"
                 style="--tile-color: <?php echo $color; ?>; --tile-color-rgb: <?php echo $rgb_str; ?>; --tile-index: <?php echo $index; ?>">

                <a href="<?php echo $url; ?>" class="alpacode-nav-bento__tile-link">
                    <!-- Tile background effects -->
                    <div class="alpacode-nav-bento__tile-bg">
                        <div class="alpacode-nav-bento__tile-glow"></div>
                        <div class="alpacode-nav-bento__tile-pattern"></div>
                    </div>

                    <!-- Tile content -->
                    <div class="alpacode-nav-bento__tile-content">
                        <?php if ($show_icons && isset($icons[$icon])): ?>
                        <div class="alpacode-nav-bento__tile-icon">
                            <?php echo $icons[$icon]; ?>
                        </div>
                        <?php endif; ?>

                        <div class="alpacode-nav-bento__tile-text">
                            <h3 class="alpacode-nav-bento__tile-label"><?php echo $label; ?></h3>
                            <?php if ($show_descriptions && !empty($description)): ?>
                            <p class="alpacode-nav-bento__tile-desc"><?php echo $description; ?></p>
                            <?php endif; ?>
                        </div>

                        <!-- Child preview tags -->
                        <?php if ($show_child_previews && $has_children): ?>
                        <div class="alpacode-nav-bento__tile-children">
                            <?php foreach (array_slice($children, 0, 4) as $child): ?>
                            <span class="alpacode-nav-bento__tile-child"><?php echo esc_html($child['label'] ?? ''); ?></span>
                            <?php endforeach; ?>
                            <?php if (count($children) > 4): ?>
                            <span class="alpacode-nav-bento__tile-child alpacode-nav-bento__tile-child--more">+<?php echo count($children) - 4; ?></span>
                            <?php endif; ?>
                        </div>
                        <?php endif; ?>
                    </div>

                    <!-- Arrow indicator -->
                    <div class="alpacode-nav-bento__tile-arrow">
                        <?php echo $icons['arrow']; ?>
                    </div>

                    <!-- Number badge -->
                    <div class="alpacode-nav-bento__tile-num">
                        <?php echo str_pad($index + 1, 2, '0', STR_PAD_LEFT); ?>
                    </div>
                </a>

                <!-- Expanded submenu (on hover/click) -->
                <?php if ($has_children): ?>
                <div class="alpacode-nav-bento__tile-submenu">
                    <div class="alpacode-nav-bento__tile-submenu-inner">
                        <?php foreach ($children as $ci => $child): ?>
                        <a href="<?php echo esc_url($child['url'] ?? '#'); ?>"
                           class="alpacode-nav-bento__tile-submenu-link"
                           style="--child-index: <?php echo $ci; ?>">
                            <span class="alpacode-nav-bento__tile-submenu-dot"></span>
                            <span><?php echo esc_html($child['label'] ?? ''); ?></span>
                            <span class="alpacode-nav-bento__tile-submenu-arrow"><?php echo $icons['arrow']; ?></span>
                        </a>
                        <?php endforeach; ?>
                    </div>
                </div>
                <?php endif; ?>
            </div>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- Footer -->
    <?php if (!empty($footer_text)): ?>
    <div class="alpacode-nav-bento__footer">
        <span><?php echo $footer_text; ?></span>
    </div>
    <?php endif; ?>
</div>
