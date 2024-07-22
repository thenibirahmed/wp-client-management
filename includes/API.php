<?php

namespace WpClientManagement;

use WpClientManagement\API\Posts\GetPosts;
use WpClientManagement\API\Users\GetUsers;
use WpClientManagement\API\Clients\GetClients;
use WpClientManagement\API\Posts\GetSinglePost;

class API {
    /**
     * Operates all the API functionalities
     */
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        new GetPosts();
        new GetUsers();
        new GetSinglePost();
        new GetClients();
    }
}