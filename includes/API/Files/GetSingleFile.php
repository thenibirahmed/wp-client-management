<?php 

namespace WpClientManagement\API\Files;

class GetSingleFile {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/file/(?P<id>\d+)';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_file'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_file(\WP_REST_Request $request) {
        $data = $request->get_params();

        if(!isset($data['id'])) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $file = get_file($data['id']);

        if(!$file) {
            return new \WP_REST_Response([
                'error' => 'No File found',
            ]);
        }

        $response = [
            'data' => $file,
        ];

        return new \WP_REST_Response($response);
    }
}