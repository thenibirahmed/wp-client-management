<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Project;

class DeleteProject {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/project/delete/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_projects,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The project ID is required.',
        'id.integer'  => 'The projects ID must be an integer.',
        'id.exists'   => 'The projects does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_project'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function delete_project(\WP_REST_Request $request) {
        global $validator;

        $project_id = $request->get_param('id');

        $data       = ['id' => $project_id];

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

        if($project->eicCrmUsers){
            $project->eicCrmUsers()->detach();
        }

        $project->delete();

        return new \WP_REST_Response([
            'message' => 'Project deleted successfully.',
        ], 200);
    }
}