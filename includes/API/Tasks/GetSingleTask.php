<?php
namespace WpClientManagement\API\Tasks;

class GetSingleTask {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/task/(?P<id>\d+)';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_task'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_task(\WP_REST_Request $request) {
        $data = $request->get_params();

        if(!isset($data['id'])) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $task = get_task($data['id']);

        if(!$task) {
            return new \WP_REST_Response([
                'error' => 'No Task found',
            ]);
        }

        $response = [
            'data' => $task,
        ];

        return new \WP_REST_Response($response);
    }
}