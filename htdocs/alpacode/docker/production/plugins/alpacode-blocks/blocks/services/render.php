<?php
/**
 * Services Block - Server Side Render
 */

defined('ABSPATH') || exit;

$heading = esc_html($attributes['heading'] ?? '');
$subheading = esc_html($attributes['subheading'] ?? '');
$services = $attributes['services'] ?? array();

$icons = array(
    'code' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    'server' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>',
    'lightbulb' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2z"></path></svg>',
    'shield' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
    'zap' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    'users' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
);

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => 'alpacode-services',
));
?>

<section <?php echo $wrapper_attributes; ?>>
    <?php if ($heading || $subheading) : ?>
        <div class="alpacode-services__header">
            <?php if ($subheading) : ?>
                <span class="alpacode-services__subheading"><?php echo $subheading; ?></span>
            <?php endif; ?>
            <?php if ($heading) : ?>
                <h2 class="alpacode-services__heading"><?php echo $heading; ?></h2>
            <?php endif; ?>
        </div>
    <?php endif; ?>
    
    <?php if (!empty($services)) : ?>
        <div class="alpacode-services__grid">
            <?php foreach ($services as $index => $service) : 
                $icon_key = $service['icon'] ?? 'code';
                $icon_svg = $icons[$icon_key] ?? $icons['code'];
            ?>
                <div class="alpacode-services__card" style="--delay: <?php echo $index * 0.1; ?>s">
                    <div class="alpacode-services__icon">
                        <?php echo $icon_svg; ?>
                    </div>
                    <h3 class="alpacode-services__title"><?php echo esc_html($service['title'] ?? ''); ?></h3>
                    <p class="alpacode-services__description"><?php echo esc_html($service['description'] ?? ''); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>
