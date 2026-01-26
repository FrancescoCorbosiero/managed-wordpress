<?php
/**
 * Shoptimizer Translation Support
 *
 * This file enables translation of customizer text fields with popular WordPress
 * translation plugins including Polylang and WPML. It works by:
 *
 * 1. Defining an array of customizer field keys that should be translatable
 * 2. Registering these strings with the active translation plugin on init
 * 3. Filtering theme_mod() calls to return translated versions of these strings
 * 4. Supporting multiple translation plugins: Polylang, WPML (new API), and legacy WPML
 *
 * Supported translation plugins:
 * - Polylang (recommended)
 * - WPML (newer API with wpml_register_single_string)
 * - Legacy WPML (deprecated icl_ functions, but still functional)
 *
 * Usage:
 * - Add new translatable fields to the $shoptimizer_translatable_fields array
 * - The translation plugin will automatically pick up these strings
 * - Frontend calls to get_theme_mod() will return translated versions
 *
 * @package shoptimizer
 * @since 1.0.0
 * @author CommerceGurus
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Define translatable customizer fields
 * 
 * Add new field keys to this array to make them translatable.
 * These should be the exact keys used in your customizer settings.
 */
global $shoptimizer_translatable_fields;
$shoptimizer_translatable_fields = array(
	'shoptimizer_mobile_menu_text',
	'shoptimizer_cross_sells_carousel_heading',
	'shoptimizer_layout_floating_button_text',
	'shoptimizer_upsells_title_text',
	'shoptimizer_layout_search_title',
	'shoptimizer_cart_title',
	'shoptimizer_cart_below_text',
);

/**
 * Register translatable strings with translation plugins
 *
 * This function runs on init and registers all translatable strings
 * with the active translation plugin (Polylang or WPML).
 */
if ( ! function_exists( 'register_shoptimizer_translatable_strings' ) ) {
	function register_shoptimizer_translatable_strings() {
		global $shoptimizer_translatable_fields;
		
		if ( function_exists( 'pll_register_string' ) ) {
			// Polylang support - most efficient method
			foreach ( $shoptimizer_translatable_fields as $key ) {
				$slug = str_replace( '_', '-', $key );
				pll_register_string( $slug, get_theme_mod( $key ), 'shoptimizer' );
			}
		} elseif ( has_action( 'wpml_register_single_string' ) ) {
			// WPML support (newer API) - recommended for WPML users
			foreach ( $shoptimizer_translatable_fields as $key ) {
				$value = get_theme_mod( $key );
				do_action( 'wpml_register_single_string', 'shoptimizer', $value, $value );
			}
		} elseif ( function_exists( 'icl_register_string' ) ) {
			// Legacy WPML support (deprecated but still functional)
			foreach ( $shoptimizer_translatable_fields as $key ) {
				$value = get_theme_mod( $key );
				icl_register_string( 'shoptimizer', $value, $value );
			}
		}
	}
	add_action( 'init', 'register_shoptimizer_translatable_strings' );
}

/**
 * Filter theme mod values to return translated strings
 *
 * This function is hooked to theme_mod_{field_name} filters and
 * returns the translated version of the string when a translation
 * plugin is active and we're on the frontend.
 *
 * @param string $value The original value from the customizer
 * @return string The translated value or original if no translation available
 */
if ( ! function_exists( 'get_shoptimizer_translated_string' ) ) {
	function get_shoptimizer_translated_string( $value ) {
		if ( ! is_admin() ) {
			if ( function_exists( 'pll__' ) ) {
				// Polylang support - most efficient method
				return pll__( $value );
			} elseif ( has_filter( 'wpml_translate_single_string' ) ) {
				// WPML support (newer API) - recommended for WPML users
				return apply_filters( 'wpml_translate_single_string', $value, 'shoptimizer', $value );
			} elseif ( function_exists( 'icl_translate' ) ) {
				// Legacy WPML support (deprecated but still functional)
				return icl_translate( 'shoptimizer', $value );
			}
		}
		return $value;
	}
}

/**
 * Apply translation filters to all translatable fields
 *
 * This loop hooks the translation function to each translatable field
 * so that get_theme_mod() calls return translated versions automatically.
 */
foreach ( $shoptimizer_translatable_fields as $key ) {
	add_filter( 'theme_mod_' . $key, 'get_shoptimizer_translated_string', 10, 1 );
}

/**
 * Translations Handler for automatic translation file downloads.
 *
 * @class   Shoptimizer_Translations
 * @package Shoptimizer
 */
if ( ! class_exists( 'Shoptimizer_Translations' ) ) {

	/**
	 * Class Shoptimizer_Translations
	 *
	 * Manages translation file downloads and updates.
	 */
	class Shoptimizer_Translations {

		/**
		 * Instance of this class.
		 *
		 * @var Shoptimizer_Translations|null
		 */
		private static $instance = null;

		/**
		 * Hosted translation files root URL.
		 *
		 * @var string
		 */
		private $hosted_url = 'https://pub-9e9eb702506f486f9bb6126591a12373.r2.dev/shoptimizer/';

		/**
		 * Theme text domain.
		 *
		 * @var string
		 */
		private $text_domain = 'shoptimizer';

		/**
		 * Current theme version.
		 *
		 * @var string
		 */
		private $version = '2.9.0';

		/**
		 * Transient key for hourly check.
		 *
		 * @var string
		 */
		private $transient_key = 'shoptimizer-translation-';

		/**
		 * Languages directory path.
		 *
		 * @var string
		 */
		private $lang_dir;

		/**
		 * Shoptimizer_Translations constructor.
		 */
		private function __construct() {
			// Get theme data to retrieve version and text domain dynamically.
			$theme         = wp_get_theme();
			$theme_version = $theme->get( 'Version' );
			$text_domain   = $theme->get( 'TextDomain' );

			// Set text domain from theme data.
			if ( ! empty( $text_domain ) ) {
				$this->text_domain = $text_domain;
			}

			// Set version from theme data (first 3 numbers only).
			if ( ! empty( $theme_version ) ) {
				$version_parts = explode( '-', $theme_version );
				if ( isset( $version_parts[0] ) && ! empty( $version_parts[0] ) ) {
					$this->version = $version_parts[0];
				}
			}

			$this->lang_dir = WP_CONTENT_DIR . '/languages/themes/';

			$this->init_hooks();
		}

		/**
		 * Get singleton instance.
		 *
		 * @return Shoptimizer_Translations
		 */
		public static function get_instance() {
			if ( null === self::$instance ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		/**
		 * Initialize WordPress hooks.
		 *
		 * @return void
		 */
		private function init_hooks() {
			add_action( 'upgrader_process_complete', array( $this, 'process' ), 10, 2 );
			add_action( 'init', array( $this, 'loaded' ) );
		}

		/**
		 * Process translation download after theme upgrade.
		 *
		 * @param WP_Upgrader $upgrader WP_Upgrader instance.
		 * @param array       $options  Array of bulk item update data.
		 *
		 * @return void
		 */
		public function process( $upgrader, $options ) { // phpcs:ignore
			$this->download_translations( 'upgrader_process_complete' );
		}

		/**
		 * Check and download translations on init (once per hour).
		 *
		 * @return void
		 */
		public function loaded() {
			// Check if locale is supported.
			$locale = determine_locale();
			if ( ! $this->supported_locale( $locale ) ) {
				return;
			}

			// Check if transient exists.
			if ( false !== get_transient( $this->transient_key . $locale ) ) {
				return;
			}

			// Download translations if needed.
			$this->download_translations( 'init' );

			// Set transient for 1 hour.
			set_transient( $this->transient_key . $locale, true, HOUR_IN_SECONDS );
		}

		/**
		 * Download translation files if needed.
		 *
		 * @param string $hook Triggered hook.
		 *
		 * @return void
		 */
		private function download_translations( $hook ) {
			// Check if locale is supported.
			$locale = determine_locale();
			if ( ! $this->supported_locale( $locale ) ) {
				$this->log( 'Info: Not supported locale: ' . $locale . ', hook: ' . $hook );
				return;
			}

			// Check if download is needed.
			if ( ! $this->should_download( $locale ) ) {
				$this->log( 'Info: No need to download, locale: ' . $locale . ', hook: ' . $hook );
				return;
			}

			// Build translation file URLs.
			$po_file = $this->text_domain . '-' . $locale . '.po';
			$mo_file = $this->text_domain . '-' . $locale . '.mo';

			$po_url = $this->hosted_url . $this->version . '/' . $po_file;
			$mo_url = $this->hosted_url . $this->version . '/' . $mo_file;

			// Ensure languages directory exists.
			if ( ! file_exists( $this->lang_dir ) ) {
				wp_mkdir_p( $this->lang_dir );
			}

			// Download .po file.
			$po_downloaded = $this->download_file( $po_url, $this->lang_dir . $po_file );

			// Download .mo file.
			$mo_downloaded = $this->download_file( $mo_url, $this->lang_dir . $mo_file );

			// If at least one file was downloaded, update version file.
			if ( $po_downloaded || $mo_downloaded ) {
				$this->log( 'Downloaded translation file ' . $po_file . ' by ' . $hook . ' hook' );
				$this->update_version_file( $locale );
			}
		}

		/**
		 * Check if locale in supported locales.
		 *
		 * @param string $locale Locale name.
		 *
		 * @return bool
		 */
		private function supported_locale( $locale ) {
			// Supported locales.
			$supported_locales = array( 'es_ES', 'fr_FR', 'de_DE', 'ru_RU', 'zh_CN', 'ja', 'ar', 'pt_BR', 'it_IT', 'nl_NL', 'pl_PL', 'tr_TR', 'ko_KR', 'id_ID', 'sv_SE', 'hi_IN', 'pt_PT', 'hu_HU', 'fa_IR', 'cs_CZ', 'he_IL', 'ro_RO', 'el', 'da_DK', 'no_NO', 'bg_BG', 'sl_SI', 'lt_LT', 'fi', 'sk_SK', 'vi', 'th', 'ms_MY', 'uk' );
			if ( in_array( $locale, $supported_locales, true ) ) {
				return true;
			}

			return false;
		}

		/**
		 * Check if translation download is needed.
		 *
		 * @param string $locale Current locale.
		 *
		 * @return bool
		 */
		private function should_download( $locale ) {
			$version_file = $this->get_version_file_path( $locale );
			$po_file      = $this->lang_dir . $this->text_domain . '-' . $locale . '.po';
			$mo_file      = $this->lang_dir . $this->text_domain . '-' . $locale . '.mo';

			$po_exists = file_exists( $po_file );
			$mo_exists = file_exists( $mo_file );

			// If version file doesn't exist but translation files exist, don't download.
			// This respects manually created files (e.g., via Loco Translate).
			if ( ! file_exists( $version_file ) && ( $po_exists || $mo_exists ) ) {
				$this->log( 'Info: Translation files exist without version file. Skipping download to preserve manual customizations.' );
				return false;
			}

			// If no version file and no translation files, download is needed.
			if ( ! file_exists( $version_file ) ) {
				return true;
			}

			// Read version file.
			$version_data = $this->read_version_file( $locale );

			// Check if version matches.
			if ( ! isset( $version_data['version'] ) || $version_data['version'] !== $this->version ) {
				return true;
			}

			// Check if files were modified after our download.
			// This prevents overwriting manual edits made via Loco Translate or other tools.
			if ( isset( $version_data['last_modified'] ) ) {
				$last_modified_time = $version_data['last_modified'];

				// Check .po file modification time.
				if ( $po_exists ) {
					$po_mtime = filemtime( $po_file ); // phpcs:ignore
					if ( $po_mtime && $po_mtime > $last_modified_time ) {
						$this->log( 'Info: PO file modified after download. Skipping to preserve manual changes.' );
						return false;
					}
				}
			}

			// Check if translation files exist for current version.
			$po_exists_with_version = $po_exists && isset( $version_data['version'] ) && $version_data['version'] === $this->version;
			$mo_exists_with_version = $mo_exists && isset( $version_data['version'] ) && $version_data['version'] === $this->version;

			// Download if files don't exist and version doesn't match.
			return ! ( $po_exists_with_version || $mo_exists_with_version );
		}

		/**
		 * Download a file from URL to destination.
		 *
		 * @param string $url  Source URL.
		 * @param string $dest Destination file path.
		 *
		 * @return bool True on success, false on failure.
		 */
		private function download_file( $url, $dest ) {
			// Download file.
			$response = wp_remote_get(
				$url,
				array(
					'timeout' => 30,
				)
			);

			// Check for errors.
			if ( is_wp_error( $response ) ) {
				$this->log( 'Error: Unable to download from URL: ' . $url . ', Message:' . $response->get_error_message() );
				return false;
			}

			// Check response code.
			$response_code = wp_remote_retrieve_response_code( $response );
			if ( 200 !== $response_code ) {
				$this->log( 'Error: Invalid response code: ' . $response_code . ', URL:' . $url );
				return false;
			}

			// Get file content.
			$content = wp_remote_retrieve_body( $response );

			// Save file.
			$saved = file_put_contents( $dest, $content ); // phpcs:ignore

			return false !== $saved;
		}

		/**
		 * Get version file path for specific locale.
		 *
		 * @param string $locale Locale name.
		 *
		 * @return string
		 */
		private function get_version_file_path( $locale ) {
			return $this->lang_dir . $this->text_domain . '-' . $locale . '.json';
		}

		/**
		 * Read version file for specific locale.
		 *
		 * @param string $locale Locale name.
		 *
		 * @return array
		 */
		private function read_version_file( $locale ) {
			$version_file = $this->get_version_file_path( $locale );

			if ( ! file_exists( $version_file ) ) {
				return array();
			}

			$content = file_get_contents( $version_file ); // phpcs:ignore

			if ( false === $content ) {
				return array();
			}

			$data = json_decode( $content, true );

			return is_array( $data ) ? $data : array();
		}

		/**
		 * Update version file with current version and last modified timestamp.
		 *
		 * @param string $locale Locale name.
		 *
		 * @return void
		 */
		private function update_version_file( $locale ) {
			$version_file = $this->get_version_file_path( $locale );
			$po_file      = $this->lang_dir . $this->text_domain . '-' . $locale . '.po';
			$mo_file      = $this->lang_dir . $this->text_domain . '-' . $locale . '.mo';

			// Get the actual file modification time from downloaded files.
			$last_modified = 0;
			if ( file_exists( $po_file ) ) {
				$last_modified = filemtime( $po_file ); // phpcs:ignore
			}

			// Fallback to current time if no files exist.
			if ( ! $last_modified ) {
				$last_modified = time();
			}

			$data = array(
				'version'       => $this->version,
				'locale'        => $locale,
				'last_modified' => $last_modified,
				'updated_at'    => current_time( 'mysql' ),
			);

			file_put_contents( // phpcs:ignore
				$version_file,
				wp_json_encode( $data, JSON_PRETTY_PRINT )
			);
		}

		/**
		 * Log debug information.
		 *
		 * @param string $message debug message.
		 *
		 * @return void
		 */
		private function log( $message ) {
			if ( function_exists( 'wc_get_logger' ) ) {
				$options = get_option( 'commercekit', array() );
				$enabled = isset( $options['as_logger'] ) && 1 === (int) $options['as_logger'] ? true : false;
				if ( $enabled ) {
					$logger = wc_get_logger();
					$logger->info( $message, array( 'source' => 'shoptimizer-translations' ) );
				}
			}
		}
	}

	if ( 1 === (int) apply_filters( 'shoptimizer_auto_download_translation', 0 ) || ( defined( 'SHOPTIMIZER_AUTO_DOWNLOAD_TRANSLATION' ) && true === SHOPTIMIZER_AUTO_DOWNLOAD_TRANSLATION ) ) {
		// Initialize the class.
		Shoptimizer_Translations::get_instance();
	}
}
