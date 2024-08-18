<?php

namespace WpClientManagement\API\Tasks;

use WpClientManagement\Models\Task;

class UpdateTask {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/task/update/(?P<id>\d+)';

    protected array $rules = [
        'eic_crm_user_id' => 'required|exists:eic_eic_crm_users,id',
        'assigned_to' => 'nullable|exists:eic_eic_crm_users,id',
        'project_id' => 'required|exists:eic_projects,id',
        'title' => 'required|string',
        'start_date' => 'nullable|date',
        'due_date' => 'nullable|date',
        'status_id' => 'nullable|exists:eic_statuses,id',
        'priority_id' => 'nullable|exists:eic_priorities,id',
        'description' => 'nullable|string',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The user field is required.',
        'eic_crm_user_id.exists' => 'The selected user does not exist.',
        'assigned_to.exists' => 'The assigned user does not exist.',
        'project_id.required' => 'The project field is required.',
        'project_id.exists' => 'The selected project does not exist.',
        'title.required' => 'The title field is required.',
        'title.string' => 'The title must be a valid string.',
        'start_date.date' => 'The start date must be a valid date.',
        'due_date.date' => 'The due date must be a valid date.',
        'status_id.exists' => 'The selected status does not exist.',
        'priority_id.exists' => 'The selected priority does not exist.',
        'description.string' => 'The description must be a valid string.',
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

        $data['eic_crm_user_id'] = sanitize_text_field($data['eic_crm_user_id'] ?? '');
        $data['assigned_to'] = sanitize_text_field($data['assigned_to'] ?? '');
        $data['project_id'] = sanitize_text_field($data['project_id'] ?? '');
        $data['title'] = sanitize_text_field($data['title'] ?? '');
        $data['start_date'] = sanitize_text_field($data['start_date'] ?? '');
        $data['due_date'] = sanitize_text_field($data['due_date'] ?? '');
        $data['status_id'] = sanitize_text_field($data['status_id'] ?? '');
        $data['priority_id'] = sanitize_text_field($data['priority_id'] ?? '');
        $data['description'] = sanitize_textarea_field($data['description'] ?? '');

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
            'project_id' => $data['project_id'],
            'eic_crm_user_id' => $data['eic_crm_user_id'],
            'assigned_to' => $data['assigned_to'],
            'title' => $data['title'],
            'start_date' => $data['start_date'],
            'due_date' => $data['end_date'],
            'status_id' => $data['status_id'],
            'priority_id' => $data['priority_id'],
            'description' => $data['description'],
        ]);

        return new \WP_REST_Response([
            'message' => 'Task updated successfully.',
            'status' => $task,
        ], 200);
    }
}