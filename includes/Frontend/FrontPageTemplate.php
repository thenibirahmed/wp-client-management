<?php

namespace WpClientManagement\Frontend;

/**
 * Basic Shortcode
 */
class FrontPageTemplate {
    public function __construct()
    {
        add_filter('template_include', [$this, 'load_page_template']);   
    }

    public function load_page_template($template) {
        global $post;

        if (!$post) {
            error_log('No post found');
            return $template;
        }

        $template_name = get_post_meta($post->ID, '_wp_page_template', true);

        if ( ! $template_name || 'client-management' !== $template_name) {
            return $template;
        }

        wp_enqueue_script('wp-client-management-frontend');
        $file = WP_CLIENT_MANAGEMENT_PATH . '/includes/Frontend/views/index.php';

        if (file_exists($file)) {
            return $file;
        } else {
            wp_die($file . ' Template not Found');
        }
    }
}