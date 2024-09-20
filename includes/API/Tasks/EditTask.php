<?php

namespace WpClientManagement\API\Tasks;

use WpClientManagement\Models\Task;

class EditTask {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/task/(?P<id>\d+)/edit';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'edit_task'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function edit_task(\WP_REST_Request $request) {

        $id = $request->get_param('id');

        if(!$id) {
            return new \WP_REST_Response([
                'error' => 'Id param required',
            ]);
        }

        $task = Task::find($id);

        if (!$task) {
            return new \WP_REST_Response([
                'message' => 'Task not found.',
            ], 404);
        }

        $taskResponse = [
            'id'            => $task->id,
            'assigned_to'   => $task->assigned_to,
            'title'         => $task->title,
            'start_date'    => $task->start_date,
            'end_date'      => $task->end_date,
            'status_id'     => $task->status_id,
            'priority_id'   => $task->priority_id,
            'description'   => $task->description,
        ];

        return new \WP_REST_Response([
            'task' => $taskResponse,
        ], 200);
    }
}