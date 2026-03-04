<?php
/**
 * Plugin Name: Edizioni Rosi Blocks
 * Plugin URI: https://edizionirosi.it
 * Description: Blocchi Gutenberg per casa editrice. Design editoriale scuro con palette nero/oro.
 * Version: 1.0.0
 * Author: Edizioni Rosi
 * Author URI: https://edizionirosi.it
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: edizioni-rosi-blocks
 * Domain Path: /languages
 * Requires at least: 6.4
 * Requires PHP: 8.0
 */

if (!defined('ABSPATH')) {
    exit;
}

define('ER_BLOCKS_VERSION', '1.0.0');
define('ER_BLOCKS_PATH', plugin_dir_path(__FILE__));
define('ER_BLOCKS_URL', plugin_dir_url(__FILE__));

/**
 * Enqueue frontend assets
 */
function er_blocks_enqueue_assets()
{
    wp_enqueue_style(
        'er-blocks-fonts',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Sans:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    wp_enqueue_style(
        'er-blocks-style',
        ER_BLOCKS_URL . 'style.css',
        array('er-blocks-fonts'),
        ER_BLOCKS_VERSION
    );

    wp_enqueue_script(
        'er-animations',
        ER_BLOCKS_URL . 'js/animations.js',
        array(),
        ER_BLOCKS_VERSION,
        true
    );
}
add_action('wp_enqueue_scripts', 'er_blocks_enqueue_assets');

/**
 * Enqueue editor assets
 */
function er_blocks_editor_assets()
{
    wp_enqueue_style(
        'er-blocks-fonts',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Sans:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    wp_enqueue_style(
        'er-blocks-editor',
        ER_BLOCKS_URL . 'editor.css',
        array('er-blocks-fonts'),
        ER_BLOCKS_VERSION
    );
}
add_action('enqueue_block_editor_assets', 'er_blocks_editor_assets');

/**
 * Auto-register all blocks from blocks/ directory
 */
function er_blocks_register()
{
    $blocks_dir = ER_BLOCKS_PATH . 'blocks/';

    if (!is_dir($blocks_dir)) {
        return;
    }

    $block_folders = array_filter(glob($blocks_dir . '*'), 'is_dir');

    foreach ($block_folders as $block) {
        $block_json = $block . '/block.json';
        if (file_exists($block_json)) {
            register_block_type($block);
        }
    }
}
add_action('init', 'er_blocks_register');

/**
 * Register custom block category
 */
function er_blocks_category($categories)
{
    return array_merge(
        array(
            array(
                'slug'  => 'edizioni-rosi',
                'title' => __('Edizioni Rosi', 'edizioni-rosi-blocks'),
                'icon'  => 'book-alt',
            ),
        ),
        $categories
    );
}
add_filter('block_categories_all', 'er_blocks_category', 10, 1);

/**
 * Load translations
 */
function er_blocks_load_textdomain()
{
    load_plugin_textdomain(
        'edizioni-rosi-blocks',
        false,
        dirname(plugin_basename(__FILE__)) . '/languages'
    );
}
add_action('plugins_loaded', 'er_blocks_load_textdomain');
