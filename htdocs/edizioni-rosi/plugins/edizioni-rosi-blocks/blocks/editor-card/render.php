<?php
/**
 * Editor Card Block - Server-side render
 * Single author/editor entry with photo, name, role, bio and arrow
 */

$url   = $attributes['url'] ?? '';
$photo = $attributes['photo'] ?? '';
$name  = $attributes['name'] ?? '';
$role  = $attributes['role'] ?? '';
$bio   = $attributes['bio'] ?? '';

if (empty($name)) {
    return;
}

$tag       = !empty($url) ? 'a' : 'div';
$href_attr = !empty($url) ? ' href="' . esc_url($url) . '"' : '';

$arrow_svg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>';
?>
<<?php echo $tag; ?> class="er-editor"<?php echo $href_attr; ?>>
    <div class="er-editor__photo">
        <?php if (!empty($photo)) : ?>
            <img src="<?php echo esc_url($photo); ?>"
                 alt="<?php echo esc_attr($name); ?>"
                 loading="lazy">
        <?php endif; ?>
    </div>

    <div class="er-editor__info">
        <span class="er-editor__name"><?php echo esc_html($name); ?></span>
        <?php if (!empty($role)) : ?>
            <span class="er-editor__role"><?php echo esc_html($role); ?></span>
        <?php endif; ?>
        <?php if (!empty($bio)) : ?>
            <p class="er-editor__bio"><?php echo esc_html($bio); ?></p>
        <?php endif; ?>
    </div>

    <?php if (!empty($url)) : ?>
        <span class="er-editor__arrow"><?php echo $arrow_svg; ?></span>
    <?php endif; ?>
</<?php echo $tag; ?>>
