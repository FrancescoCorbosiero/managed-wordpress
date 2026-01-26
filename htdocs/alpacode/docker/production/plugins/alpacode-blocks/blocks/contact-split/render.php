<?php
/**
 * Contact Split Block - Premium Server Side Render
 */

defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['eyebrow'] ?? '');
$heading = esc_html($attributes['heading'] ?? '');
$description = esc_html($attributes['description'] ?? '');
$layout = esc_attr($attributes['layout'] ?? 'left');
$split_ratio = esc_attr($attributes['splitRatio'] ?? '60-40');
$show_map = $attributes['showMap'] ?? true;
$map_embed = $attributes['mapEmbed'] ?? '';
$map_placeholder_text = esc_html($attributes['mapPlaceholderText'] ?? 'Our Location');
$contact_cards = $attributes['contactCards'] ?? array();
$form_type = esc_attr($attributes['formType'] ?? 'builtin');
$form_shortcode = $attributes['formShortcode'] ?? '';
$form_fields = $attributes['formFields'] ?? array();
$submit_button_text = esc_html($attributes['submitButtonText'] ?? 'Send Message');
$form_action = esc_url($attributes['formAction'] ?? '');
$card_style = esc_attr($attributes['cardStyle'] ?? 'default');
$show_social_links = $attributes['showSocialLinks'] ?? true;
$social_links = $attributes['socialLinks'] ?? array();

$classes = array('alpacode-contact-split');
$classes[] = 'alpacode-contact-split--layout-' . $layout;
$classes[] = 'alpacode-contact-split--ratio-' . $split_ratio;
$classes[] = 'alpacode-contact-split--card-' . $card_style;

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
));

// Icon SVGs
$icons = array(
    'email' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>',
    'phone' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>',
    'location' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    'clock' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    'twitter' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    'linkedin' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    'github' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>',
    'instagram' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    'facebook' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
);
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="alpacode-contact-split__container">
        <div class="alpacode-contact-split__content" data-alpacode-animate="fade-up">
            <!-- Header -->
            <div class="alpacode-contact-split__header">
                <?php if ($eyebrow) : ?>
                    <span class="alpacode-contact-split__eyebrow"><?php echo $eyebrow; ?></span>
                <?php endif; ?>
                <?php if ($heading) : ?>
                    <h2 class="alpacode-contact-split__heading"><?php echo $heading; ?></h2>
                <?php endif; ?>
                <?php if ($description) : ?>
                    <p class="alpacode-contact-split__description"><?php echo $description; ?></p>
                <?php endif; ?>
            </div>

            <!-- Contact Cards -->
            <?php if (!empty($contact_cards)) : ?>
                <div class="alpacode-contact-split__cards" data-alpacode-stagger="0.1">
                    <?php foreach ($contact_cards as $index => $card) :
                        $icon = esc_attr($card['icon'] ?? 'email');
                        $label = esc_html($card['label'] ?? '');
                        $value = esc_html($card['value'] ?? '');
                        $link = esc_url($card['link'] ?? '');
                        $icon_svg = $icons[$icon] ?? $icons['email'];
                    ?>
                        <div class="alpacode-contact-split__card">
                            <div class="alpacode-contact-split__card-icon">
                                <?php echo $icon_svg; ?>
                            </div>
                            <div class="alpacode-contact-split__card-content">
                                <span class="alpacode-contact-split__card-label"><?php echo $label; ?></span>
                                <?php if ($link) : ?>
                                    <a href="<?php echo $link; ?>" class="alpacode-contact-split__card-value">
                                        <?php echo $value; ?>
                                    </a>
                                <?php else : ?>
                                    <span class="alpacode-contact-split__card-value"><?php echo $value; ?></span>
                                <?php endif; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <!-- Social Links -->
            <?php if ($show_social_links && !empty($social_links)) : ?>
                <div class="alpacode-contact-split__social">
                    <span class="alpacode-contact-split__social-label">Follow Us</span>
                    <div class="alpacode-contact-split__social-links">
                        <?php foreach ($social_links as $social) :
                            $platform = esc_attr($social['platform'] ?? '');
                            $url = esc_url($social['url'] ?? '#');
                            $icon_svg = $icons[$platform] ?? '';
                            if (!$icon_svg || !$url) continue;
                        ?>
                            <a href="<?php echo $url; ?>"
                               class="alpacode-contact-split__social-link"
                               target="_blank"
                               rel="noopener noreferrer"
                               aria-label="<?php echo ucfirst($platform); ?>">
                                <?php echo $icon_svg; ?>
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>

            <!-- Map -->
            <?php if ($show_map) : ?>
                <div class="alpacode-contact-split__map" data-alpacode-animate="fade-up">
                    <?php if ($map_embed) : ?>
                        <div class="alpacode-contact-split__map-embed">
                            <?php echo $map_embed; ?>
                        </div>
                    <?php else : ?>
                        <div class="alpacode-contact-split__map-placeholder">
                            <div class="alpacode-contact-split__map-placeholder-icon">
                                <?php echo $icons['location']; ?>
                            </div>
                            <span class="alpacode-contact-split__map-placeholder-text"><?php echo $map_placeholder_text; ?></span>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>

        <div class="alpacode-contact-split__form-wrapper" data-alpacode-animate="fade-up" data-alpacode-delay="0.2">
            <?php if ($form_type === 'shortcode' && $form_shortcode) : ?>
                <!-- Shortcode Form -->
                <div class="alpacode-contact-split__form-shortcode">
                    <?php echo do_shortcode($form_shortcode); ?>
                </div>
            <?php elseif ($form_type === 'builtin') : ?>
                <!-- Built-in Form -->
                <form class="alpacode-contact-split__form" <?php echo $form_action ? 'action="' . $form_action . '"' : ''; ?> method="post">
                    <?php foreach ($form_fields as $field) :
                        $name = esc_attr($field['name'] ?? '');
                        $label = esc_html($field['label'] ?? '');
                        $type = esc_attr($field['type'] ?? 'text');
                        $required = $field['required'] ?? false;
                        $placeholder = esc_attr($field['placeholder'] ?? '');
                    ?>
                        <div class="alpacode-contact-split__field">
                            <label for="contact-<?php echo $name; ?>" class="alpacode-contact-split__label">
                                <?php echo $label; ?>
                                <?php if ($required) : ?>
                                    <span class="alpacode-contact-split__required">*</span>
                                <?php endif; ?>
                            </label>
                            <?php if ($type === 'textarea') : ?>
                                <textarea
                                    id="contact-<?php echo $name; ?>"
                                    name="<?php echo $name; ?>"
                                    class="alpacode-contact-split__input alpacode-contact-split__textarea"
                                    placeholder="<?php echo $placeholder; ?>"
                                    rows="5"
                                    <?php echo $required ? 'required' : ''; ?>
                                ></textarea>
                            <?php else : ?>
                                <input
                                    type="<?php echo $type; ?>"
                                    id="contact-<?php echo $name; ?>"
                                    name="<?php echo $name; ?>"
                                    class="alpacode-contact-split__input"
                                    placeholder="<?php echo $placeholder; ?>"
                                    <?php echo $required ? 'required' : ''; ?>
                                />
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>

                    <button type="submit" class="alpacode-contact-split__submit" data-alpacode-magnetic>
                        <span><?php echo $submit_button_text; ?></span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </form>
            <?php else : ?>
                <!-- No Form -->
                <div class="alpacode-contact-split__no-form">
                    <p>Contact form not configured.</p>
                </div>
            <?php endif; ?>

            <!-- Form decoration -->
            <div class="alpacode-contact-split__form-decoration">
                <div class="alpacode-contact-split__form-glow"></div>
            </div>
        </div>
    </div>

    <!-- Background decoration -->
    <div class="alpacode-contact-split__bg-decoration">
        <div class="alpacode-contact-split__bg-gradient"></div>
        <div class="alpacode-contact-split__bg-grid"></div>
    </div>
</section>
