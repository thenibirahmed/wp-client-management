<?php

namespace WpClientManagement\API\Tasks;

use WpClientManagement\Models\Status;
use WpClientManagement\Models\Task;

class TaskBulkComplete {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/tasks/bulk-complete';

    protected array $rules = [
        'bulk_ids' => 'nullable|array',
    ];

    protected array $validationMessages = [
        'bulk_ids.array'     => 'The bulk IDs must be an array.',
        'bulk_ids.*.integer' => 'The bulk IDs must be integers.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'bulk_complete_tasks'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function bulk_complete_tasks(\WP_REST_Request $request) {
        global $validator;

        $bulk_ids = is_string($request->get_param('bulk_ids')) ? explode(',', $request->get_param('bulk_ids')) : $request->get_param('bulk_ids');
        $bulk_ids = array_map('intval', $bulk_ids);

        $data = [];
        $data['bulk_ids'] = isset($bulk_ids) ? $bulk_ids : [];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);
        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        if (empty($bulk_ids)) {
            return new \WP_REST_Response([
                'message' => 'No IDs provided for completion.',
            ], 400);
        }

        $bulk_tasks = Task::whereIn('id', $bulk_ids)->get();

        if ($bulk_tasks->isEmpty()) {
            return new \WP_REST_Response([
                'message' => 'No tasks found for the provided IDs.',
            ], 404);
        }

        $task_done_status = Status::where('type', 'task')->where('name', 'done')->first();

        if (!$task_done_status) {
            return new \WP_REST_Response([
                'message' => 'Completed status not found.',
            ], 404);
        }

        return new \WP_REST_Response([
            'data' =>  $data
        ]);

        try {
            foreach ($bulk_tasks as $task) {
                $task->update(['status_id' => $task_done_status->id]);
            }
        } catch (\Exception $e) {
            return new \WP_REST_Response([
                'message' => 'An error occurred while updating tasks.',
                'error'   => $e->getMessage(),
            ], 500);
        }

        return new \WP_REST_Response([
            'message' => 'Tasks updated successfully.',
        ], 200);
    }
}