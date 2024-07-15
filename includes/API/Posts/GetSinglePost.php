<?php 

namespace WpClientManagement\API\Posts;

class GetSinglePost {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/post/(?P<id>\d+)';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_post'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_post(\WP_REST_Request $request) {
        $data = $request->get_params();

        if(!isset($data['id'])) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $post = get_post($data['id']);
        // $post = Client::find($data['id']);

        if(!$post) {
            return new \WP_REST_Response([
                'error' => 'No Post found',
            ]);
        }

        $response = [
            'data' => $post,
        ];

        return new \WP_REST_Response($response);
    }
}