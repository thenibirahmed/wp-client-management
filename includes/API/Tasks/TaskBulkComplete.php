<?php

namespace WpClientManagement\API\Tasks;

use WpClientManagement\Models\Status;
use WpClientManagement\Models\Task;

class TaskBulkComplete {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/tasks/bulk-complete';

    protected array $rules = [
        'bulk_ids'   => 'nullable|array',
    ];

    protected array $validationMessages = [
        'bulk_ids.array'     => 'The bulk IDs must be an array.',
        'bulk_ids.*.integer' => 'The bulk IDs must be integers.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::EDITABLE,
            'callback' => array($this, 'bulk_complete_invoice'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function bulk_complete_invoice(\WP_REST_Request $request) {
        global $validator;

        $bulk_ids  = $request->get_param('bulk_ids');

        $data = [];
        $data['bulk_ids'] = isset($bulk_ids) ? $bulk_ids : null;

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        if(empty($bulk_ids) || !is_array($bulk_ids)) {
            return new \WP_REST_Response([
                'message' => 'The bulk IDs must be an array.',
            ], 400);
        }

        $bulk_tasks = Task::whereIn('id', $bulk_ids)->get();

        $task_done_status_id = Status::where('type','task')
                                ->where('name','Done')
                                ->first()
                                ->id;

        foreach ($bulk_tasks as $task) {
            $task->update([
                'status_id' => $task_done_status_id
            ]);
        }

        return new \WP_REST_Response([
            'message' => 'Tasks updated successfully.',
        ], 200);
    }
}