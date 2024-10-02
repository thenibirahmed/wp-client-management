<?php

namespace WpClientManagement\API\Tasks;

use WpClientManagement\Models\Task;

class TasksBulkDelete {

    private $namespace = 'wp-client-management/v1';
    private $endpoint = '/tasks/bulk-delete';

    protected array $rules = [
        'bulk_ids' => 'nullable|array',
    ];

    protected array $validationMessages = [
        'bulk_ids.array'     => 'The bulk IDs must be an array.',
        'bulk_ids.*.integer' => 'The bulk IDs must be integers.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::DELETABLE,
            'callback' => [$this, 'bulk_delete_tasks'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function bulk_delete_tasks(\WP_REST_Request $request) {
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
                'message' => 'No IDs provided for deletion.',
            ], 400);
        }

        $bulk_delete_tasks = Task::whereIn('id', $bulk_ids)->get();

        if ($bulk_delete_tasks->isEmpty()) {
            return new \WP_REST_Response([
                'message' => 'No tasks found.',
            ], 404);
        }

        try {
            foreach ($bulk_delete_tasks as $task) {
                $task->delete();
            }
        } catch (\Exception $e) {
            return new \WP_REST_Response([
                'message' => 'An error occurred while deleting tasks.',
                'error'   => $e->getMessage(),
            ], 500);
        }

        return new \WP_REST_Response([
            'message' => 'Tasks deleted successfully.',
        ], 200);
    }
}