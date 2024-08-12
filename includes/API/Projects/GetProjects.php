<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Project;

class GetProjects {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/projects';

    protected array $rules = [
        'eic_crm_user_id' => 'nullable|integer',
        'client_id' => 'nullable|integer',
        'manager_id' => 'nullable|integer',
        'status_id' => 'nullable|integer',
        'priority_id' => 'nullable|integer',
        'title' => 'required|string|max:255',
        'budget' => 'numeric',
        'currency' => 'nullable|string',
        'start_date' => 'nullable|date',
        'due_date' => 'nullable|date',
        'description' => 'nullable|string',
        'is_deal' => 'boolean',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The eic_crm_user_id field is required.',
        'project_id.required' => 'The project_id field is required.',
        'client_id.required' => 'The client_id field is required.',
        'manager_id.required' => 'The manager_id field is required.',
        'status_id.required' => 'The status_id field is required.',
        'priority_id.required' => 'The priority_id field is required.',
        'title.required' => 'The title field is required.',
        'title.string' => 'The title must be a string.',
        'title.max' => 'The title may not be greater than 255 characters.',
        'nullable.numeric' => 'The budget must a number.',
        'currency.string' => 'The currency must be a string.',
        'start_date.date' => 'The start_date must be a date.',
        'due_date.date' => 'The due_date must be a date.',
        'description.string' => 'The description must be a string',
        'is_deal.boolean' => 'The is_deal  must be a boolean'
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_projects'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_projects(\WP_REST_Request $request) {

        $page = $request->get_params('page');


        $projects = Project::paginate(20, ['*'], 'page', $page);

        $data = [];
        foreach ($projects as $project) {
            $data[] = [
                'id' => $project->ID,
                'eic_crm_user' => $project->eic_crm_user->name,
                'client' => $project->client->name,
                'manager' => $project->manager->name,
                'status' => $project->status->name,
                'priority' => $project->priority->name,
                'title' => $project->title,
                'budget' => $project->budget,
                'currency' => $project->currency,
                'start_date' => $project->start_date,
                'due_date' => $project->due_date,
                'description' => $project->description,
                'is_deal' => $project->is_deal,
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $projects->total(),
                'per_page' => $projects->perPage(),
                'current_page' => $projects->currentPage(),
                'last_page' => $projects->lastPage(),
                'next_page_url' => $projects->nextPageUrl(),
                'prev_page_url' => $projects->previousPageUrl(),
            ],
        ]);
    }
}