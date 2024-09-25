<?php

namespace WpClientManagement\API;

use WpClientManagement\Models\Client;
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

        $crm_user = Client::find(19);
        $crm_user = $crm_user->eic_crm_user;
        $data = $crm_user->wp_user;

        return new \WP_REST_Response([
            'data' => $data
        ]);
    }
}