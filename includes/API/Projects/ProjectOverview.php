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
        $page = $request->get_param('page');

        $projects = Project::paginate(20, ['id', 'title', 'client_id'], 'page', $page);

        $projectids = $projects->pluck('id')->toArray();

        $invoices  = Invoice::whereIn('client_id', $$projectids)
        ->with('status')
        ->get();

        $invoiceTotalByProject = $invoices->groupBy('client_id')->map(function ($invoices) {

            $total  = $invoices->sum('total');
            $paid   = $invoices->where('status.name', 'paid')->where('status.type', 'invoice')->sum('total');
            $unpaid = $total - $paid;

            return [
                'total'    => $total,
                'revenue'  => $paid,
                'due'      => $unpaid,
            ];
        });

        $totalInvoices = $invoiceTotalByProject->sum('total');
        $totalRevenue  = $invoiceTotalByProject->sum('revenue');
        $totalDue      = $invoiceTotalByProject->sum('due');

        $clients = Client::whereIn('id', $projects->pluck('client_id')->toArray())->get();

        $wp_user_ids = $clients->pluck('eic_crm_user.wp_user_id')->toArray();

        $wpUsersDb = get_users([
            'include' => $wp_user_ids,
        ]);

        $wpUsers = [];
        foreach ($wpUsersDb as $user) {
            $wpUsers[$user->ID] = [
                'name'  => $user->user_login,
                'email' => $user->user_email,
            ];
        }

        $projectsWithDetails = $projects->map(function ($project) use ($wpUsers , $invoiceTotalByProject) {
            $crm_user = $project->client->eic_crm_user;
            $wp_user_id = $crm_user->wp_user_id;
            $wp_user = $wpUsers[$wp_user_id] ?? [];

            $invoices = $invoiceTotalByProject->get($project->id, [
                'total' => 0, 'revenue' => 0, 'due' => 0
            ]);

            return [
                'id' => $project->id,
                'title' => $project->title,
                'client' => [
                    'id' => $project->client->id,
                    'name' => $wp_user['name'] ?? '',
                    'email' => $wp_user['email'] ?? '',
                ],
                'invoice' => $invoices,
            ];
        });

        return new \WP_REST_Response([
            'data' => $projectsWithDetails,
        ]);

        return new \WP_REST_Response([
            'data' => $data,
            'total' => $projects->total(),
            'per_page' => $projects->perPage(),
            'current_page' => $projects->currentPage(),
            'last_page' => $projects->lastPage(),
        ]);
    }
}