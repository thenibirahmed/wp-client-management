<?php

namespace WpClientManagement\API\Projects;

class GetSingleProject {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/project/(?P<id>\d+)';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_project'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_project(\WP_REST_Request $request) {
        $data = $request->get_params();

        if(!isset($data['id'])) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $project = get_project($data['id']);

        if(!$project) {
            return new \WP_REST_Response([
                'error' => 'No Porject found',
            ]);
        }

        $response = [
            'data' => $project,
        ];

        return new \WP_REST_Response($response);
    }
}