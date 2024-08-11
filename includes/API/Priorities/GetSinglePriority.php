<?php

namespace WpClientManagement\API\Priorities;

class GetSinglePriority {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/priority/(?P<id>\d+)';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_priority'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_priority(\WP_REST_Request $request) {
        $data = $request->get_params();

        if(!isset($data['id'])) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $priority = get_priority($data['id']);

        if(!$priority) {
            return new \WP_REST_Response([
                'error' => 'No Priority found',
            ]);
        }

        $response = [
            'data' => $priority,
        ];

        return new \WP_REST_Response($response);
    }
}