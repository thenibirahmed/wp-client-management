<?php

namespace WpClientManagement;

/**
 * Asset loading
 */
class Assets {

    /**
     * Calling the hook to enqueue
     */
    public function __construct() {
        add_action("wp_enqueue_scripts",[$this, "enqueue_frontend_scripts"]);
        add_action("admin_enqueue_scripts",[$this, "enqueue_admin_scripts"]);
    }

    /**
     * Calling the script and style enqueuer
     */
    public function enqueue_frontend_scripts() {
        $this->enqueue_styles();
        $this->enqueue_scripts();
    }

    /**
     * Enqueueing styles
     *
     * @return void
     */
    public function enqueue_styles() {
        wp_enqueue_style('wp-client-management-frontend', WP_CLIENT_MANAGEMENT_ASSETS . '/frontend.css', [], filemtime(WP_CLIENT_MANAGEMENT_PATH . '/build/frontend.css'));
    }

    /**
     * Enqueueing scripts
     *
     * @return void
     */
    public function enqueue_scripts() {
        wp_register_script('wp-client-management-frontend', WP_CLIENT_MANAGEMENT_ASSETS . '/frontend.js', ['wp-element'], filemtime(WP_CLIENT_MANAGEMENT_PATH . '/build/frontend.js'), true);

        wp_localize_script('wp-client-management-frontend', 'wpApiSettings', array(
            'root' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest'),
        ))
    }

    /**
     * Enqueueing admin scripts
     *
     * @return void
     */
    public function enqueue_admin_scripts($currentPage) {
        if($currentPage === 'toplevel_page_wp-client-management') {
            wp_enqueue_script('wp-client-management-admin', WP_CLIENT_MANAGEMENT_ASSETS . '/index.js', ['wp-element'], filemtime(WP_CLIENT_MANAGEMENT_PATH . '/build/index.js'), true);
            
            wp_localize_script('wp-client-management-admin', 'wpApiSettings', array(
                'root' => esc_url_raw(rest_url()),
                'nonce' => wp_create_nonce('wp_rest'),
            ));
        }

    }
}