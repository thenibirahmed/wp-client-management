<?php

namespace WpClientManagement\API\Tasks;

use WpClientManagement\Models\Status;
use WpClientManagement\Models\Task;

class UpdateTask {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/task/update/(?P<id>\d+)';

    protected array $rules = [
        'assigned_to'    => 'nullable|exists:eic_eic_crm_users,id',
        'project_id'     => 'required|exists:eic_projects,id',
        'title'          => 'required|string',
        'start_date'     => 'nullable|date',
        'end_date'       => 'nullable|date',
        'status_id'      => 'nullable|exists:eic_statuses,id',
        'priority_id'    => 'nullable|exists:eic_priorities,id',
        'description'    => 'nullable|string',
    ];

    protected array $validationMessages = [
        'assigned_to.exists'        => 'The assigned user does not exist.',
        'project_id.required'       => 'The project field is required.',
        'project_id.exists'         => 'The selected project does not exist.',
        'title.required'            => 'The title field is required.',
        'title.string'              => 'The title must be a valid string.',
        'start_date.date'           => 'The start date must be a valid date.',
        'end_date.date'             => 'The due date must be a valid date.',
        'status_id.exists'          => 'The selected status does not exist.',
        'priority_id.exists'        => 'The selected priority does not exist.',
        'description.string'        => 'The description must be a valid string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_task'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_task(\WP_REST_Request $request) {
        global $validator;

        $id = intval($request->get_param('id'));
        $data = $request->get_params();

        $data['assigned_to']     = isset($data['assigned_to']) ? intval($data['assigned_to']) : null;
        $data['project_id']      = isset($data['project_id']) ? intval($data['project_id']) : null;
        $data['status_id']       = isset($data['status_id']) ? intval($data['status_id']) : null;
        $data['priority_id']     = isset($data['priority_id']) ? intval($data['priority_id']) : null;
        $data['title']           = isset($data['title']) ? sanitize_text_field($data['title']) : '';
        $data['description']     = isset($data['description']) ? sanitize_text_field($data['description']) : '';
        $data['start_date']      = isset($data['start_date']) ? sanitize_text_field($data['start_date']) : null;
        $data['end_date']        = isset($data['end_date']) ? sanitize_text_field($data['end_date']) : null;

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $task = Task::find($id);

        if (!$task) {
            return new \WP_REST_Response([
                'message' => 'Task not found.',
            ], 404);
        }

        $task->update([
            'project_id'   => $data['project_id'],
            'assigned_to'  => $data['assigned_to'],
            'title'        => $data['title'],
            'start_date'   => $data['start_date'],
            'end_date'     => $data['end_date'],
            'status_id'    => $data['status_id'],
            'priority_id'  => $data['priority_id'],
            'description'  => $data['description'],
        ]);

        return new \WP_REST_Response([
            'message' => 'Task updated successfully.',
        ], 200);
    }
}