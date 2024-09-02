<?php
namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Project;

class GetProjectTasks {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/project/(?P<id>\d+)/tasks';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_projects,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The client ID is required.',
        'id.integer'  => 'The client ID must be an integer.',
        'id.exists'   => 'The client does not exist.',
    ];

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_project_tasks'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_project_tasks(\WP_REST_Request $request)
    {
        global $validator;

        $id = $request->get_param('id');

        if(!isset($id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $project = Project::getProjectData($id);

        if(!$project) {
            return new \WP_REST_Response([
                'error' => 'Project not found',
            ], 404);
        }

        return new \WP_REST_Response([
            'tasks' => $project->tasks,
        ]);
    }
}