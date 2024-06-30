<?php

namespace WpClientManagement;

use WpClientManagement\Admin\PageTemplate;

class Admin {
    /**
     * Operates all the admin functionalities
     */
    public function __construct() {
        new PageTemplate();
    }
}
