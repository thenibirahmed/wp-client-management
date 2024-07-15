<?php

namespace WpClientManagement;

use WpClientManagement\Admin\MenuPage;
use WpClientManagement\Admin\PageTemplate;

class Admin {
    /**
     * Operates all the admin functionalities
     */
    public function __construct() {
        new MenuPage();
        new PageTemplate();
    }
}
