<?php

namespace WpClientManagement\API\Schedules;

use WpClientManagement\Models\Schedule;

class GetSingleSchedule {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/schedule/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_schedules,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The schedule ID is required.',
        'id.integer' => 'The schedule ID must be an integer.',
        'id.exists' => 'The schedule does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_schedule'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_schedule(\WP_REST_Request $request) {
        global $validator;

        $schedule_id = $request->get_param('id');

        if(!isset($schedule_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $schedule_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $schedule = Schedule::find($data['id']);

        if(!$schedule) {
            return new \WP_REST_Response([
                'error' => 'No Schedule found',
            ]);
        }

        $response = [
            'data' => $schedule,
            'eic_crm_user' => $schedule->eic_crm_user,
            'client' => $schedule->client,
        ];

        return new \WP_REST_Response($response);
    }
}