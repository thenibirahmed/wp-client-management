<?php

namespace WpClientManagement\API\Tasks;

use WpClientManagement\Models\Task;

class DeleteTask {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/task/delete/(?P<id>\d+)';

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
            'methods' => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_task'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function delete_task(\WP_REST_Request $request) {
        global $validator;

        $task_id = $request->get_param('id');

        $data = ['id' => $task_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $task = Task::find($task_id);

        if (!$task) {
            return new \WP_REST_Response([
                'message' => 'Task not found.',
            ], 404);
        }

        $task->delete();

        return new \WP_REST_Response([
            'message' => 'Task deleted successfully.',
        ], 200);
    }
}