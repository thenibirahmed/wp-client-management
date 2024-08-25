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

    public function get_project_overview()
    {
        $projects = Project::activeProjects();

        $clients = Client::getActiveClients();

        $invoices = Invoice::getActiveProjectInvoices();

        $data = [
            'total_projects' => $projects,
            'total_clients'  => $clients,
            'total_invoices' => $invoices,
        ];

        return new \WP_REST_Response([
            'data' => $data,
        ]);
    }
}
