<?php

namespace WpClientManagement\API;

use WpClientManagement\Models\Project;

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

        $page = $request->get_params('page');

        $project = Project::find(2);

        $data = $project->eicCrmUsers;

        return new \WP_REST_Response([
            'data' => $data
        ]);
    }
}