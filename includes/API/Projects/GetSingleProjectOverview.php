<?php
namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class GetSingleProjectOverview {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/project/(?P<id>\d+)/overview';

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
            'callback' => array($this, 'get_project_overview'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_project_overview(\WP_REST_Request $request)
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

        $projectData = Project::getProjectData($data['id']);

        if(!$projectData) {
            return new \WP_REST_Response([
                'error' => 'Project not found',
            ], 404);
        }

        $client = get_user_by('ID', $projectData->client->eic_crm_user->wp_user_id);
        $manager = get_user_by('ID', $projectData->manager->wp_user_id);

        $projectHeader = [
            'name' => $projectData->title,
            'client_name' => $client->user_login,
            'manager_name' => $manager->user_login,
            'status' => $projectData->status->name,
            'priority' => $projectData->priority->name,
        ];

        return new \WP_REST_Response([
            'data' => $projectHeader
        ]);
    }
}