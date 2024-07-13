<?php

namespace WpClientManagement\Admin;

class MenuPage {
    public function __construct() {
        add_action('admin_menu', [$this, 'add_menu_page']);
    }

    public function add_menu_page() {
        add_menu_page(
            'WP Client Management',
            'WP Client Management',
            'manage_options',
            'wp-client-management',
            [$this, 'menu_page_template'],
            'dashicons-admin-site',
            6
        );
    
        add_submenu_page(
            'wp-client-management',
            'Dashboard',
            'Dashboard',
            'manage_options',
            'wp-client-management',
            [$this, 'menu_page_template']
        );
    
        add_submenu_page(
            'wp-client-management',
            'Clients',
            'Clients',
            'manage_options',
            'wp-client-management#clients',
            [$this, 'menu_page_template']
        );
    
        add_submenu_page(
            'wp-client-management',
            'Projects',
            'Projects',
            'manage_options',
            'wp-client-management#projects',
            [$this, 'menu_page_template']
        );
    
        add_submenu_page(
            'wp-client-management',
            'Invoices',
            'Invoices',
            'manage_options',
            'wp-client-management#invoices',
            [$this, 'menu_page_template']
        );
    
        add_submenu_page(
            'wp-client-management',
            'Schedules',
            'Schedules',
            'manage_options',
            'wp-client-management#schedules',
            [$this, 'menu_page_template']
        );
    
        add_submenu_page(
            'wp-client-management',
            'Reports',
            'Reports',
            'manage_options',
            'wp-client-management#reports',
            [$this, 'menu_page_template']
        );

        add_submenu_page(
            'wp-client-management',
            'Settings',
            'Settings',
            'manage_options',
            'wp-client-management#settings',
            [$this, 'menu_page_template']
        );

        add_submenu_page(
            'wp-client-management',
            'Play Ground',
            'Play Ground',
            'manage_options',
            'wp-client-management#playground',
            [$this, 'menu_page_template']
        );
    }

    public function menu_page_template() {
        echo '<div id="wp-client-management-root"></div>';
    }
}