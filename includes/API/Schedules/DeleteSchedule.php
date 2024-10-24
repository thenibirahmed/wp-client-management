<?php

namespace WpClientManagement\API\Schedules;

use WpClientManagement\Middlewares\AuthMiddleware;
use WpClientManagement\Models\Schedule;

class DeleteSchedule {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/schedule/delete/(?P<id>\d+)';

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
            'methods'  => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_schedule'),
            'permission_callback' => [AuthMiddleware::class, 'admin'],
        ]);
    }

    public function delete_schedule(\WP_REST_Request $request) {
        global $validator;

        $schedule_id = $request->get_param('id');

        $data = ['id' => $schedule_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $schedule = Schedule::find($schedule_id);

        if (!$schedule) {
            return new \WP_REST_Response([
                'message' => 'Schedule not found.',
            ], 404);
        }

        $schedule->delete();

        return new \WP_REST_Response([
            'message' => 'Schedule deleted successfully.',
        ], 200);
    }
}