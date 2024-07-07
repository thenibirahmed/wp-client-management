<?php
/**
 * Plugin Name:       WP Client Management
 * Plugin URI:        https://eleganceincode.com
 * Description:       Handle the basics with this plugin.
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Elegance In Code
 * Author URI:        https://eleganceincode.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://eleganceincode.com
 * Text Domain:       wpclientmanagement
 * Domain Path:       /languages
 */

use WpClientManagement\API;
use WpClientManagement\Admin;
use WpClientManagement\Assets;
use WpClientManagement\Frontend;
use WpClientManagement\Admin\Installer;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once __DIR__ . "/bootstrap/bootstrap.php";

/**
 *
 * Main Plugin Class
 *
 */
final class WpClientManagement {
    /**
     * Plugin Version
     */
    const version = '1.0.0';

    /**
     * Constructor
     *
     * @return void
     */
    private function __construct() {
        $this->define_constants();

        register_activation_hook( __FILE__, [$this, 'activate'] );

        add_action( 'plugins_loaded', [$this, 'init_plugin'] );
    }

    /**
     * Initializes the plugin
     *
     * @return void
     */
    public function init_plugin() {

        new Assets();

        if ( is_admin() ) {
            new Admin();
        } else {
            new Frontend();
        }

        new API();
    }

    /**
     * Initializing the plugin singleton instance
     *
     * @return \WpClientManagement
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new self();
        }

        return $instance;
    }

    /**
     * Defining Constants
     *
     * @return void
     */
    public function define_constants() {
        define( 'WP_CLIENT_MANAGEMENT_VERSION', self::version );
        define( 'WP_CLIENT_MANAGEMENT_FILE', __FILE__ );
        define( 'WP_CLIENT_MANAGEMENT_PATH', __DIR__ );
        define( 'WP_CLIENT_MANAGEMENT_URL', plugins_url( '', WP_CLIENT_MANAGEMENT_FILE ) );
        define( 'WP_CLIENT_MANAGEMENT_ASSETS', WP_CLIENT_MANAGEMENT_URL . '/build' );
        define( 'WCM_TD', 'wpclientmanagement' );
    }

    /**
     * Do things while activating the plugin
     *
     * @return void
     */
    public function activate() {
        $installer = new Installer();

        $installer->add_version();
        $installer->create_tables();
    }

}

/**
 * Run the plugin
 *
 * @return void
 */
function wp_client_management() {
    return WpClientManagement::init();
}

// Kick start the plugin
wp_client_management();
