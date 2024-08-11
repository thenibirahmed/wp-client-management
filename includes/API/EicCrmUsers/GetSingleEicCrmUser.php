<?php 

namespace WpClientManagement\API\EicCrmUsers;

class GetSingleEicCrmUser {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/eic-crm-user/(?P<id>\d+)';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_crm_user'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_crm_user(\WP_REST_Request $request) {
        $data = $request->get_params();

        if(!isset($data['id'])) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $crm_user = get_crm_user($data['id']);

        if(!$crm_user) {
            return new \WP_REST_Response([
                'error' => 'No Crm user found',
            ]);
        }

        $response = [
            'data' => $crm_user,
        ];

        return new \WP_REST_Response($response);
    }
}