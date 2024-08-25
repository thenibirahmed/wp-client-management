<?php

namespace WpClientManagement\API\Clients; 

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class ClientOverview {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/client-overview';

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_clients_overview'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_clients_overview()
    {
        $clients = Client::whereHas('projects', function ($query) {
            $query->whereHas('status', function ($subQuery) {
                $subQuery->where('type', 'project')
                         ->where('name', 'active');
            });
        })->count();
        $projects = Project::count();
        $invoices = Invoice::count();

        $data = [
            'total_clients' => $clients,
            'total_projects' => $projects,
            'total_invoices' => $invoices,
        ];

        return new \WP_REST_Response([
            'data' => $data,
        ]);
    }
}
