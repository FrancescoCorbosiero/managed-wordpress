<?php
/**
 * Plugin Name:       Resell Piacenza Blocks
 * Description:       Premium Gutenberg blocks for luxury sneaker resale marketplace. Features authenticity badges, product spotlights, testimonials, and conversion-focused components.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Author:            Resell Piacenza
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       resellpiacenza-blocks
 */

if (!defined('ABSPATH')) {
    exit;
}

define('RESELLPIACENZA_BLOCKS_VERSION', '1.0.0');
define('RESELLPIACENZA_BLOCKS_PATH', plugin_dir_path(__FILE__));
define('RESELLPIACENZA_BLOCKS_URL', plugin_dir_url(__FILE__));

/**
 * Enqueue frontend scripts and styles
 */
function resellpiacenza_blocks_enqueue_assets(): void {
    wp_enqueue_script(
        'resellpiacenza-animations',
        RESELLPIACENZA_BLOCKS_URL . 'js/animations.js',
        array(),
        RESELLPIACENZA_BLOCKS_VERSION,
        true
    );

    wp_enqueue_style(
        'resellpiacenza-blocks-style',
        RESELLPIACENZA_BLOCKS_URL . 'style.css',
        array(),
        RESELLPIACENZA_BLOCKS_VERSION
    );
}
add_action('wp_enqueue_scripts', 'resellpiacenza_blocks_enqueue_assets');

/**
 * Enqueue editor-specific assets
 */
function resellpiacenza_blocks_editor_assets(): void {
    wp_enqueue_style(
        'resellpiacenza-blocks-editor',
        RESELLPIACENZA_BLOCKS_URL . 'editor.css',
        array(),
        RESELLPIACENZA_BLOCKS_VERSION
    );
}
add_action('enqueue_block_editor_assets', 'resellpiacenza_blocks_editor_assets');

/**
 * Register all blocks from the blocks directory
 */
function resellpiacenza_blocks_register(): void {
    $blocks_dir = RESELLPIACENZA_BLOCKS_PATH . 'blocks/';

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
add_action('init', 'resellpiacenza_blocks_register');

/**
 * Add custom block category for Resell Piacenza blocks
 */
function resellpiacenza_blocks_category(array $categories): array {
    return array_merge(
        array(
            array(
                'slug'  => 'resellpiacenza',
                'title' => __('Resell Piacenza', 'resellpiacenza-blocks'),
                'icon'  => 'shield',
            ),
        ),
        $categories
    );
}
add_filter('block_categories_all', 'resellpiacenza_blocks_category');

/**
 * Load plugin textdomain for translations
 */
function resellpiacenza_blocks_load_textdomain(): void {
    load_plugin_textdomain(
        'resellpiacenza-blocks',
        false,
        dirname(plugin_basename(__FILE__)) . '/languages'
    );
}
add_action('plugins_loaded', 'resellpiacenza_blocks_load_textdomain');
