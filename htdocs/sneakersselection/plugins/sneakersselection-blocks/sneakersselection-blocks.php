<?php
/**
 * Plugin Name:       Sneaker Selection Blocks
 * Description:       Premium Gutenberg blocks for sneaker e-commerce websites. Features product showcases, size selectors, release countdowns, and more.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Author:            Sneaker Selection
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       sneakersselection-blocks
 */

if (!defined('ABSPATH')) {
    exit;
}

define('SNEAKERSSELECTION_BLOCKS_VERSION', '1.0.0');
define('SNEAKERSSELECTION_BLOCKS_PATH', plugin_dir_path(__FILE__));
define('SNEAKERSSELECTION_BLOCKS_URL', plugin_dir_url(__FILE__));

/**
 * Enqueue frontend scripts and styles
 */
function sneakersselection_blocks_enqueue_assets(): void {
    wp_enqueue_script(
        'sneakersselection-animations',
        SNEAKERSSELECTION_BLOCKS_URL . 'js/animations.js',
        array(),
        SNEAKERSSELECTION_BLOCKS_VERSION,
        true
    );

    wp_enqueue_style(
        'sneakersselection-blocks-style',
        SNEAKERSSELECTION_BLOCKS_URL . 'style.css',
        array(),
        SNEAKERSSELECTION_BLOCKS_VERSION
    );
}
add_action('wp_enqueue_scripts', 'sneakersselection_blocks_enqueue_assets');

/**
 * Enqueue editor-specific assets
 */
function sneakersselection_blocks_editor_assets(): void {
    wp_enqueue_style(
        'sneakersselection-blocks-editor',
        SNEAKERSSELECTION_BLOCKS_URL . 'editor.css',
        array(),
        SNEAKERSSELECTION_BLOCKS_VERSION
    );
}
add_action('enqueue_block_editor_assets', 'sneakersselection_blocks_editor_assets');

/**
 * Register all blocks from the blocks directory
 */
function sneakersselection_blocks_register(): void {
    $blocks_dir = SNEAKERSSELECTION_BLOCKS_PATH . 'blocks/';

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
add_action('init', 'sneakersselection_blocks_register');

/**
 * Add custom block category for Sneaker Selection blocks
 */
function sneakersselection_blocks_category(array $categories): array {
    return array_merge(
        array(
            array(
                'slug'  => 'sneakersselection',
                'title' => __('Sneaker Selection', 'sneakersselection-blocks'),
                'icon'  => 'products',
            ),
        ),
        $categories
    );
}
add_filter('block_categories_all', 'sneakersselection_blocks_category');

/**
 * Load plugin textdomain for translations
 */
function sneakersselection_blocks_load_textdomain(): void {
    load_plugin_textdomain(
        'sneakersselection-blocks',
        false,
        dirname(plugin_basename(__FILE__)) . '/languages'
    );
}
add_action('plugins_loaded', 'sneakersselection_blocks_load_textdomain');
