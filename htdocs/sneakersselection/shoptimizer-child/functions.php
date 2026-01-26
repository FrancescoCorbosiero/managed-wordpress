<?php
/**
 * Shoptimizer Child Theme Functions
 * 
 * @package Shoptimizer Child
 * @author SneakersSelection
 * @version 1.0.0
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue parent and child theme styles
 */
function shoptimizer_child_enqueue_styles()
{
    // Enqueue parent theme stylesheet
    wp_enqueue_style(
        'shoptimizer-parent-style',
        get_template_directory_uri() . '/style.css',
        array(),
        wp_get_theme()->parent()->get('Version')
    );

    // Enqueue child theme stylesheet
    wp_enqueue_style(
        'shoptimizer-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array('shoptimizer-parent-style'),
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'shoptimizer_child_enqueue_styles', 15);

/**
 * =========================================================================
 * CUSTOM CODE STARTS HERE
 * =========================================================================
 */

// Add your custom functions below this line