<?php
/**
 * Business Card Block - Fullscreen Homepage Impact
 *
 * A dramatic, non-scrollable business card experience with
 * stunning animations designed to convert visitors.
 */

defined('ABSPATH') || exit;

// Extract attributes with defaults
$logo_square = esc_url($attributes['logoSquare'] ?? '');
$logo_rectangular = esc_url($attributes['logoRectangular'] ?? '');
$logo_style = esc_attr($attributes['logoStyle'] ?? 'square');
$tagline = esc_html($attributes['tagline'] ?? 'Crafting Digital Excellence');
$name = esc_html($attributes['name'] ?? '');
$title = esc_html($attributes['title'] ?? '');
$email = esc_html($attributes['email'] ?? '');
$phone = esc_html($attributes['phone'] ?? '');
$website = esc_url($attributes['website'] ?? '');
$address = esc_html($attributes['address'] ?? '');
$socials = $attributes['socials'] ?? [];
$variant = esc_attr($attributes['variant'] ?? 'elegant');
$color_scheme = esc_attr($attributes['colorScheme'] ?? 'dark');
$enable_particles = $attributes['enableParticles'] ?? true;
$enable_glow = $attributes['enableGlowEffect'] ?? true;
$enable_magnetic = $attributes['enableMagneticButtons'] ?? true;
$animation_intensity = esc_attr($attributes['animationIntensity'] ?? 'high');

// Build CSS classes
$classes = array('alpacode-business-card');
$classes[] = 'alpacode-business-card--' . $variant;
$classes[] = 'alpacode-business-card--' . $color_scheme;
$classes[] = 'alpacode-business-card--animation-' . $animation_intensity;

$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes),
    'data-variant' => $variant,
    'data-color-scheme' => $color_scheme,
    'data-animation-intensity' => $animation_intensity,
));

// Social icons SVG
$social_icons = array(
    'linkedin' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    'twitter' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    'instagram' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    'github' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    'facebook' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    'youtube' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    'dribbble' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/></svg>',
    'tiktok' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
);

// Determine which logo to use
$logo_url = $logo_style === 'rectangular' ? $logo_rectangular : $logo_square;
if (empty($logo_url)) {
    $logo_url = $logo_style === 'rectangular' ? $logo_square : $logo_rectangular;
}

// Filter active socials
$active_socials = array_filter($socials, function($social) {
    return !empty($social['url']);
});
?>

<section <?php echo $wrapper_attributes; ?>>
    <!-- Animated Background -->
    <div class="alpacode-business-card__background">
        <?php if ($enable_particles): ?>
        <div class="alpacode-business-card__particles" data-alpacode-particles></div>
        <?php endif; ?>

        <!-- Animated gradient orbs -->
        <div class="alpacode-business-card__orb alpacode-business-card__orb--1" data-alpacode-parallax="0.3"></div>
        <div class="alpacode-business-card__orb alpacode-business-card__orb--2" data-alpacode-parallax="0.5"></div>
        <div class="alpacode-business-card__orb alpacode-business-card__orb--3" data-alpacode-parallax="0.2"></div>

        <!-- Grid overlay -->
        <div class="alpacode-business-card__grid"></div>

        <!-- Scan line effect -->
        <div class="alpacode-business-card__scanline"></div>
    </div>

    <!-- Main Card Container -->
    <div class="alpacode-business-card__container">
        <div class="alpacode-business-card__card" <?php if ($enable_glow): ?>data-alpacode-glow<?php endif; ?>>
            <!-- Card inner glow border -->
            <div class="alpacode-business-card__card-border"></div>

            <!-- Logo Section -->
            <?php if (!empty($logo_url)): ?>
            <div class="alpacode-business-card__logo-wrapper" data-alpacode-animate="fade-scale" data-delay="0.2">
                <div class="alpacode-business-card__logo alpacode-business-card__logo--<?php echo $logo_style; ?>">
                    <img src="<?php echo $logo_url; ?>" alt="Logo" class="alpacode-business-card__logo-img">
                    <div class="alpacode-business-card__logo-glow"></div>
                </div>
            </div>
            <?php endif; ?>

            <!-- Tagline -->
            <?php if (!empty($tagline)): ?>
            <div class="alpacode-business-card__tagline-wrapper" data-alpacode-animate="fade-up" data-delay="0.4">
                <p class="alpacode-business-card__tagline" data-alpacode-split="chars">
                    <?php echo $tagline; ?>
                </p>
                <div class="alpacode-business-card__tagline-line"></div>
            </div>
            <?php endif; ?>

            <!-- Identity Section -->
            <?php if (!empty($name) || !empty($title)): ?>
            <div class="alpacode-business-card__identity" data-alpacode-animate="fade-up" data-delay="0.6">
                <?php if (!empty($name)): ?>
                <h1 class="alpacode-business-card__name" data-alpacode-split="chars"><?php echo $name; ?></h1>
                <?php endif; ?>
                <?php if (!empty($title)): ?>
                <p class="alpacode-business-card__title"><?php echo $title; ?></p>
                <?php endif; ?>
            </div>
            <?php endif; ?>

            <!-- Divider -->
            <div class="alpacode-business-card__divider" data-alpacode-animate="fade-scale" data-delay="0.8">
                <span class="alpacode-business-card__divider-line"></span>
                <span class="alpacode-business-card__divider-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                </span>
                <span class="alpacode-business-card__divider-line"></span>
            </div>

            <!-- Contact Information -->
            <div class="alpacode-business-card__contacts" data-alpacode-stagger="0.1">
                <?php if (!empty($email)): ?>
                <a href="mailto:<?php echo $email; ?>" class="alpacode-business-card__contact" data-alpacode-animate="fade-left" <?php if ($enable_magnetic): ?>data-alpacode-magnetic<?php endif; ?>>
                    <span class="alpacode-business-card__contact-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                    </span>
                    <span class="alpacode-business-card__contact-text"><?php echo $email; ?></span>
                </a>
                <?php endif; ?>

                <?php if (!empty($phone)): ?>
                <a href="tel:<?php echo preg_replace('/[^0-9+]/', '', $phone); ?>" class="alpacode-business-card__contact" data-alpacode-animate="fade-left" <?php if ($enable_magnetic): ?>data-alpacode-magnetic<?php endif; ?>>
                    <span class="alpacode-business-card__contact-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                    </span>
                    <span class="alpacode-business-card__contact-text"><?php echo $phone; ?></span>
                </a>
                <?php endif; ?>

                <?php if (!empty($website)): ?>
                <a href="<?php echo $website; ?>" target="_blank" rel="noopener noreferrer" class="alpacode-business-card__contact" data-alpacode-animate="fade-left" <?php if ($enable_magnetic): ?>data-alpacode-magnetic<?php endif; ?>>
                    <span class="alpacode-business-card__contact-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                    </span>
                    <span class="alpacode-business-card__contact-text"><?php echo str_replace(['https://', 'http://', 'www.'], '', $website); ?></span>
                </a>
                <?php endif; ?>

                <?php if (!empty($address)): ?>
                <div class="alpacode-business-card__contact alpacode-business-card__contact--address" data-alpacode-animate="fade-left">
                    <span class="alpacode-business-card__contact-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                    </span>
                    <span class="alpacode-business-card__contact-text"><?php echo $address; ?></span>
                </div>
                <?php endif; ?>
            </div>

            <!-- Social Links -->
            <?php if (!empty($active_socials)): ?>
            <div class="alpacode-business-card__socials" data-alpacode-animate="fade-up" data-delay="1.2">
                <?php foreach ($active_socials as $index => $social):
                    $platform = esc_attr($social['platform'] ?? '');
                    $url = esc_url($social['url'] ?? '');
                    if (empty($platform) || empty($url) || !isset($social_icons[$platform])) continue;
                ?>
                <a href="<?php echo $url; ?>"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="alpacode-business-card__social"
                   aria-label="<?php echo ucfirst($platform); ?>"
                   style="--social-delay: <?php echo 0.1 * $index; ?>s"
                   <?php if ($enable_magnetic): ?>data-alpacode-magnetic<?php endif; ?>
                   data-alpacode-ripple>
                    <span class="alpacode-business-card__social-icon">
                        <?php echo $social_icons[$platform]; ?>
                    </span>
                    <span class="alpacode-business-card__social-glow"></span>
                </a>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </div>

        <!-- Floating corner accents -->
        <div class="alpacode-business-card__corner alpacode-business-card__corner--tl" data-alpacode-animate="fade-right" data-delay="1.4"></div>
        <div class="alpacode-business-card__corner alpacode-business-card__corner--tr" data-alpacode-animate="fade-left" data-delay="1.4"></div>
        <div class="alpacode-business-card__corner alpacode-business-card__corner--bl" data-alpacode-animate="fade-right" data-delay="1.5"></div>
        <div class="alpacode-business-card__corner alpacode-business-card__corner--br" data-alpacode-animate="fade-left" data-delay="1.5"></div>
    </div>

    <!-- Scroll indicator (optional subtle hint) -->
    <div class="alpacode-business-card__scroll-hint" data-alpacode-animate="fade-up" data-delay="2">
        <span class="alpacode-business-card__scroll-text">Scroll to explore</span>
        <div class="alpacode-business-card__scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
        </div>
    </div>
</section>
