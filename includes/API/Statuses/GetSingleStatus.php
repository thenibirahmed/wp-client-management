<?php
namespace WpClientManagement\API\Statuses;

class GetSingleStatus {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/status/(?P<id>\d+)';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_status'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_status(\WP_REST_Request $request) {
        $data = $request->get_params();

        if(!isset($data['id'])) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $status = get_status($data['id']);

        if(!$status) {
            return new \WP_REST_Response([
                'error' => 'No Status found',
            ]);
        }

        $response = [
            'data' => $status,
        ];

        return new \WP_REST_Response($response);
    }
}