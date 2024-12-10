<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Project;

class UpdateProjectAdditionalInfo {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/project/additional-info/update/(?P<id>\d+)';

    protected array $rules = [
        'id'          => 'required|integer|exists:eic_projects,id',
        'description' => 'required|string',
    ];

    protected array $validationMessages = [
        'id.required'    => 'The project ID is required.',
        'id.integer'     => 'The project ID must be an integer.',
        'id.exists'      => 'The project does not exist.',
        'title.required' => 'The description is required.',
        'title.string'   => 'The description must be a string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::EDITABLE,
            'callback' => array($this, 'update_project_additional_info'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_project_additional_info(\WP_REST_Request $request) {
        global $validator;

        $project_id  = intval($request->get_param('id'));
        $data = $request->get_params();

        $data['description'] = isset($data['description']) ? sanitize_text_field($data['description']) : null;

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $project = Project::find($project_id);

        if (!$project) {
            return new \WP_REST_Response([
                'message' => 'Project not found.',
            ], 404);
        }

        error_log(json_encode($data));
        $project->update([
            'description' => $data['description'],
        ]);
        $project->refresh();

        $response = [
            'project' => $project
        ];

        return new \WP_REST_Response($response);
    }
}