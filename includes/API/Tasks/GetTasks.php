<?php

namespace WpClientManagement\API\Tasks;

use WpClientManagement\Models\Task;

class GetTasks {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/tasks';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_tasks'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_tasks(\WP_REST_Request $request) {

        $page = $request->get_params('page');

        $tasks = Task::paginate(20, ['*'], 'page', $page);

        $data = [];
        foreach ($tasks as $task) {
            $data[] = [
                'id' => $task->id,
                'eic_crm_user' => $task->eic_crm_user,
                'assigned_to' => $task->assigned_to,
                'project' => $task->project,
                'title' => $task->title,
                'start_date' => $task->start_date,
                'due_date' => $task->due_date,
                'status' => $task->status->name,
                'priority' => $task->priority->name,
                'description' => $task->description,
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $tasks->total(),
                'per_page' => $tasks->perPage(),
                'current_page' => $tasks->currentPage(),
                'last_page' => $tasks->lastPage(),
                'next_page_url' => $tasks->nextPageUrl(),
                'prev_page_url' => $tasks->previousPageUrl(),
            ],
        ]);
    }
}