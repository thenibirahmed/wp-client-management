<?php

namespace WpClientManagement\Admin;

/**
 * Admin Installer Class
 */
class Installer {

    /**
     * Add versioning
     *
     * @return void
     */
    public function add_version() {
        update_option( 'wp_client_management_version', WP_CLIENT_MANAGEMENT_VERSION );

        $installed = get_option( 'wp_client_management_installed' );

        if ( ! $installed ) {
            update_option( 'wp_client_management_installed', time() );
        }

    }

    /**
     * Create Database tables when activating the plugin
     *
     * @return void
     */
    public function create_tables() {
        global $wpdb;

        $collate = $wpdb->get_charset_collate();

        $schema = "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}ce_addressess` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `name` varchar(100) NOT NULL,
            `address` varchar(255) DEFAULT NULL,
            `phone` varchar(255) DEFAULT NULL,
            `created_by` int(11) DEFAULT NULL,
            `created_at` datetime DEFAULT NULL,
            `updated_at` datetime DEFAULT NULL,
            PRIMARY KEY (`id`)
          ) {$collate}";

        if ( ! function_exists( "dbDelta" ) ) {
            require_once ABSPATH . "/wp-admin/includes/upgrade.php";
        }

        // dbDelta( $schema );
    }

    public function create_roles()
    {
        add_role('client', 'Client', ['read']);
    }

}
