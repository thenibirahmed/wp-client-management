<?php

namespace WpClientManagement\API;

use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Project;
use WpClientManagement\Models\Task;
use WpClientManagement\Models\WpUser;

class TestApi {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/test';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'test'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function test(\WP_REST_Request $request) {

        $crm_user = EicCrmUser::find(1);
        $wp_user = $crm_user->wp_user;
        
        return new \WP_REST_Response([
            'data' => $wp_user
        ]);
    }
}