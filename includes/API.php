<?php

namespace WpClientManagement;

use WpClientManagement\API\Users\GetUsers;

class API {
    /**
     * Operates all the API functionalities
     */
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        new GetUsers();
    }

    
}