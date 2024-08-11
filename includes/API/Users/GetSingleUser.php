<?php
namespace WpClientManagement\API\Users;

class GetSingleUser {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/user/(?P<id>\d+)';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_user'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_user(\WP_REST_Request $request) {
        $data = $request->get_params();

        if(!isset($data['id'])) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $user = get_user($data['id']);

        if(!$user) {
            return new \WP_REST_Response([
                'error' => 'No User found',
            ]);
        }

        $response = [
            'data' => $user,
        ];

        return new \WP_REST_Response($response);
    }
}