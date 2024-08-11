<?php

namespace WpClientManagement\API\Schedules;

class GetSingleSchedule {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/schedule/(?P<id>\d+)';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_schedule'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_schedule(\WP_REST_Request $request) {
        $data = $request->get_params();

        if(!isset($data['id'])) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $schedule = get_schedule($data['id']);

        if(!$schedule) {
            return new \WP_REST_Response([
                'error' => 'No Schedule found',
            ]);
        }

        $response = [
            'data' => $schedule,
        ];

        return new \WP_REST_Response($response);
    }
}