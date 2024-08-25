<?php

namespace WpClientManagement\API\Overview;

use WpClientManagement\Models\Project;

class ProjectOverview {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/project-overview';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_project_overview'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_project_overview(\WP_REST_Request $request) {

        $page = $request->get_params('page');

        $projects = Project::paginate(20, ['*'], 'page', $page);

        $data = [];
        foreach ($projects as $project) {
            $data[] = [
                'id' => $project->id,
                'client' => $project->client,
                'manager' => $project->manager,
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