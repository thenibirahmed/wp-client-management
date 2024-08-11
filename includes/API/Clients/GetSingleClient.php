<?php 

namespace WpClientManagement\API\Clients;

class GetSingleClient {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/client/(?P<id>\d+)';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_client'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_client(\WP_REST_Request $request) {
        $data = $request->get_params();

        if(!isset($data['id'])) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $client = get_client($data['id']);

        if(!$client) {
            return new \WP_REST_Response([
                'error' => 'No Client found',
            ]);
        }

        $response = [
            'data' => $client,
        ];

        return new \WP_REST_Response($response);
    }
}