<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Project;

class GetClientProjects {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/client/(?P<id>\d+)/projects';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_clients,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The client ID is required.',
        'id.integer' => 'The client ID must be an integer.',
        'id.exists' => 'The client does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_client_projects'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_client_projects(\WP_REST_Request $request) {
        global $validator;

        $client_id = $request->get_param('id');

        if(!isset($client_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $client_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $client = Client::find($client_id);

        // $project = Project::find($data['id']);

        if(!$project) {
            return new \WP_REST_Response([
                'error' => 'No Project found',
            ]);
        }
        
        $response = [
                'data' => $project,
                'client' => $project->client,
                'manager' => $project->manager,
                'deal_pipeline' => $project->deal_pipeline->name,
                'status' => $project->status->name,
                'priority' => $project->priority->name,
                'invoices' => $project->invoices,
                'notes' => $project->notes,
                'files' => $project->files,
        ];

        return new \WP_REST_Response($response);
    }
}