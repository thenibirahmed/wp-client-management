<?php
namespace WpClientManagement\API\Tasks;

use WpClientManagement\Models\Task;

class GetSingleTask {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/task/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_tasks,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The task ID is required.',
        'id.integer' => 'The task ID must be an integer.',
        'id.exists' => 'The task does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_task'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_task(\WP_REST_Request $request) {
        global $validator;

        $task_id = $request->get_param('id');

        if(!isset($task_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $task_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $task = Task::find($data['id']);

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