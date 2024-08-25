<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class ProjectOverview {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/project-overview';

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
        $page = $request->get_param('page') ?: 1;

        $clients = Client::paginate(10, ['*'], 'page', $page);
        $projects = Project::paginate(10, ['*'], 'page', $page);
        $invoices = Invoice::paginate(10, ['*'], 'page', $page);

        $data = [
            'total_clients' => $clients->total(),
            'total_projects' => $projects->total(),
            'total_invoices' => $invoices->total(),
            'projects' => $projects->items(),
        ];

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $clients->total(),
                'per_page' => $clients->perPage(),
                'current_page' => $clients->currentPage(),
                'last_page' => $clients->lastPage(),
                'next_page_url' => $clients->nextPageUrl(),
                'prev_page_url' => $clients->previousPageUrl(),
            ],
        ]);
    }
}
