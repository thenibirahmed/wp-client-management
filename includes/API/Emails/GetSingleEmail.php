<?php 

namespace WpClientManagement\API\Emails;

class GetSingleEmail {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/email/(?P<id>\d+)';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_email'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_email(\WP_REST_Request $request) {
        $data = $request->get_params();

        if(!isset($data['id'])) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $email = get_email($data['id']);

        if(!$email) {
            return new \WP_REST_Response([
                'error' => 'No Email found',
            ]);
        }

        $response = [
            'data' => $email,
        ];

        return new \WP_REST_Response($response);
    }
}