<?php

namespace WpClientManagement\Admin;

class PageTemplate {

    public function __construct() {
        add_filter('theme_page_templates', [$this, 'add_page_template']);
    }

    public function add_page_template($templates) {
        $customTemplates = ['client-management' => 'WP Client Management'];
        $allTemplates = array_merge($templates, $customTemplates);
        return $allTemplates;
    }
}
