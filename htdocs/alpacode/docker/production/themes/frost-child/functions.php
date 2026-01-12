<?php
/**
 * Frost Child Theme - Alpacode
 *
 * @package FrostChildAlpacode
 * @version 0.0.2
 */

defined('ABSPATH') || exit;

/**
 * Enqueue parent theme styles
 */
function frost_child_enqueue_styles() {
    wp_enqueue_style(
        'frost-style',
        get_template_directory_uri() . '/style.css',
        array(),
        wp_get_theme('frost')->get('Version')
    );
    
    wp_enqueue_style(
        'frost-child-style',
        get_stylesheet_uri(),
        array('frost-style'),
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'frost_child_enqueue_styles');

/**
 * Register block patterns category
 */
function frost_child_register_pattern_category() {
    register_block_pattern_category(
        'alpacode',
        array(
            'label' => __('Alpacode', 'frost-child-alpacode')
        )
    );
}
add_action('init', 'frost_child_register_pattern_category');
