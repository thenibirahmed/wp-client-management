<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Project;

class GetSingleProject {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/project/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:projects,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The project ID is required.',
        'id.integer' => 'The project ID must be an integer.',
        'id.exists' => 'The project does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_single_project'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_project(\WP_REST_Request $request) {
        global $validator;

        $project_id = $request->get_param('id');

        if(!isset($project_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $project_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $project = Project::find($data['id']);

        if(!$project) {
            return new \WP_REST_Response([
                'error' => 'No Project found',
            ]);
        }

        $response = [
            'data' => $project,
        ];

        return new \WP_REST_Response($response);
    }
}