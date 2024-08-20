<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Project;

class UpdateProject {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/project/update/(?P<id>\d+)';

    protected array $rules = [
        'client_id' => 'nullable|exists:eic_clients,id',
        'manager_id' => 'nullable|exists:eic_eic_crm_users,id',
        'deal_pipeline_id' => 'nullable|exists:eic_deal_pipelines,id',
        'status_id' => 'nullable|exists:eic_statuses,id',
        'priority_id' => 'nullable|exists:eic_priorities,id',
        'title' => 'required|string',
        'budget' => 'nullable|numeric',
        'currency' => 'nullable|string',
        'start_date' => 'nullable|date_format:Y-m-d H:i:s',
        'due_date' => 'nullable|date_format:Y-m-d H:i:s',
        'description' => 'nullable|string',
        'is_deal' => 'nullable|boolean',

    ];

    protected array $validationMessages = [
        'client_id.exists' => 'The selected client does not exist.',
        'manager_id.exists' => 'The selected manager does not exist.',
        'deal_pipeline_id.exists' => 'The selected deal pipeline does not exist.',
        'status_id.exists' => 'The selected status does not exist.',
        'priority_id.exists' => 'The selected priority does not exist.',
        'title.required' => 'The title is required.',
        'title.string' => 'The title must be a string.',
        'budget.numeric' => 'The budget must be a numeric value.',
        'currency.string' => 'The currency must be a string.',
        'start_date.date_format' => 'The start date must be in the format Y-m-d H:i:s.',
        'due_date.date_format' => 'The due date must be in the format Y-m-d H:i:s.',
        'description.string' => 'The description must be a string.',
        'is_deal.boolean' => 'The is_deal field must be true or false.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_project'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_project(\WP_REST_Request $request) {
        global $validator;

        $id = intval($request->get_param('id'));
        $data = $request->get_params();

        $data['client_id'] = isset($data['client_id']) ? intval($data['client_id']) : null;
        $data['manager_id'] = isset($data['manager_id']) ? intval($data['manager_id']) : null;
        $data['deal_pipeline_id'] = isset($data['deal_pipeline_id']) ? intval($data['deal_pipeline_id']) : null;
        $data['status_id'] = isset($data['status_id']) ? intval($data['status_id']) : null;
        $data['priority_id'] = isset($data['priority_id']) ? intval($data['priority_id']) : null;
        $data['title'] = sanitize_text_field($data['title'] ?? '');
        $data['budget'] = isset($data['budget']) ? floatval($data['budget']) : null;
        $data['currency'] = sanitize_text_field($data['currency'] ?? '');
        $data['start_date'] = sanitize_text_field($data['start_date'] ?? '');
        $data['due_date'] = sanitize_text_field($data['due_date'] ?? '');
        $data['description'] = sanitize_textarea_field($data['description'] ?? '');
        $data['is_deal'] = isset($data['is_deal']) ? boolval($data['is_deal']) : null;

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $project = Project::find($id);

        if (!$project) {
            return new \WP_REST_Response([
                'message' => 'Project not found.',
            ], 404);
        }

        $project->update([
            'client_id' => $data['client_id'],
            'manager_id' => $data['manager_id'],
            'deal_pipeline_id' => $data['deal_pipeline_id'],
            'status_id' => $data['status_id'],
            'priority_id' => $data['priority_id'],
            'title' => $data['title'],
            'budget' => $data['budget'],
            'currency' => $data['currency'],
            'start_date' => $data['start_date'],
            'due_date' => $data['due_date'],
            'description' => $data['description'],
            'is_deal' => $data['is_deal'],
        ]);

        return new \WP_REST_Response([
            'message' => 'Project updated successfully.',
            'status' => $project,
        ], 200);
    }
}