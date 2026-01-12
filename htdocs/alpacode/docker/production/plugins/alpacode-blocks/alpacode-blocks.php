<?php
/**
 * Plugin Name: Alpacode Blocks
 * Plugin URI: https://alpacode.studio
 * Description: Professional Gutenberg blocks for IT consulting, software development, and digital services.
 * Version: 0.0.3
 * Requires at least: 6.4
 * Requires PHP: 8.0
 * Author: Alpacode Studio
 * Author URI: https://alpacode.studio
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: alpacode-blocks
 */

defined('ABSPATH') || exit;

define('ALPACODE_BLOCKS_VERSION', '1.0.0');
define('ALPACODE_BLOCKS_PATH', plugin_dir_path(__FILE__));
define('ALPACODE_BLOCKS_URL', plugin_dir_url(__FILE__));

/**
 * Enqueue frontend scripts and styles
 */
function alpacode_blocks_enqueue_assets()
{
    // Enqueue animation library
    wp_enqueue_script(
        'alpacode-animations',
        ALPACODE_BLOCKS_URL . 'js/animations.js',
        array(),
        ALPACODE_BLOCKS_VERSION,
        true
    );

    // Enqueue global styles
    wp_enqueue_style(
        'alpacode-blocks-global',
        ALPACODE_BLOCKS_URL . 'style.css',
        array(),
        ALPACODE_BLOCKS_VERSION
    );
}
add_action('wp_enqueue_scripts', 'alpacode_blocks_enqueue_assets');

/**
 * Enqueue editor assets
 */
function alpacode_blocks_editor_assets()
{
    wp_enqueue_style(
        'alpacode-blocks-editor',
        ALPACODE_BLOCKS_URL . 'editor.css',
        array(),
        ALPACODE_BLOCKS_VERSION
    );
}
add_action('enqueue_block_editor_assets', 'alpacode_blocks_editor_assets');

/**
 * Register all blocks from the blocks directory
 */
function alpacode_blocks_register()
{
    $blocks_dir = ALPACODE_BLOCKS_PATH . 'blocks/';

    if (!is_dir($blocks_dir)) {
        return;
    }

    $blocks = array_filter(glob($blocks_dir . '*'), 'is_dir');

    foreach ($blocks as $block) {
        $block_json = $block . '/block.json';

        if (file_exists($block_json)) {
            register_block_type($block);
        }
    }
}
add_action('init', 'alpacode_blocks_register');

/**
 * Register block category
 */
function alpacode_blocks_category($categories)
{
    return array_merge(
        array(
            array(
                'slug' => 'alpacode',
                'title' => __('Alpacode', 'alpacode-blocks'),
                'icon' => 'star-filled',
            ),
        ),
        $categories
    );
}
add_filter('block_categories_all', 'alpacode_blocks_category', 10, 1);