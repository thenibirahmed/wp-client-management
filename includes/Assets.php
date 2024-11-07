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
        add_action("wp_enqueue_scripts", [$this, "enqueue_frontend_scripts"], 20);
        add_action("admin_enqueue_scripts", [$this, "enqueue_admin_scripts"]);
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

        if (is_page_template('client-management')) {
            global $wp_styles;
            
            foreach ($wp_styles->registered as $handle => $style) {
                if(in_array($handle, [
                    'wp-client-management-frontend', 
                    'media-views', 
                    'wp-mediaelement', 
                    'mediaelement', 
                    'imgareaselect', 
                    'thickbox', 
                    'buttons', 
                    'dashicons', 
                    'admin-bar', 
                    'common', 
                    'forms', 
                    'media', 
                    'wp-pointer',
                    'wp-block-library'
                ])) {
                    continue;
                }

                wp_dequeue_style($handle);
                wp_deregister_style($handle);
            }
        }

        if (!wp_style_is('common', 'enqueued')) {
            wp_enqueue_style('wp-common', includes_url('/css/common.css'), [], null);
        }
    }

    /**
     * Enqueueing scripts
     *
     * @return void
     */
    public function enqueue_scripts() {
        wp_register_script('wp-client-management-frontend', WP_CLIENT_MANAGEMENT_ASSETS . '/frontend.js', ['wp-element'], filemtime(WP_CLIENT_MANAGEMENT_PATH . '/build/frontend.js'), true);

        wp_enqueue_media();

        wp_localize_script('wp-client-management-frontend', 'eicApiSettings', array(
            'rest_url' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest'),
        ));
    }

    /**
     * Enqueueing admin scripts
     *
     * @return void
     */
    public function enqueue_admin_scripts($currentPage) {
        if($currentPage === 'toplevel_page_wp-client-management') {
            wp_enqueue_script('wp-client-management-admin', WP_CLIENT_MANAGEMENT_ASSETS . '/index.js', ['wp-element'], filemtime(WP_CLIENT_MANAGEMENT_PATH . '/build/index.js'), true);
            
            wp_localize_script('wp-client-management-admin', 'eicApiSettings', array(
                'rest_url' => esc_url_raw(rest_url()),
                'nonce' => wp_create_nonce('wp_rest'),
            ));
        }

    }
}