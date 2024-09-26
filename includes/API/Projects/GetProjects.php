<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class GetProjects {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/projects';

    protected array $rules = [
        'from'        => 'nullable|date',
        'to'          => 'nullable|date',
        'status_id'   => 'nullable|exists:eic_statuses,id',
        'priority_id' => 'nullable|exists:eic_priorities,id',
    ];

    protected array $validationMessages = [
        'from.date'    => 'The from date is not valid.',
        'to.date'      => 'The from date is not valid.',
        'status_id'    => 'The status ID is not valid.',
        'priority_id'  => 'The priority ID is not valid.'
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_all_projects'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_all_projects(\WP_REST_Request $request)
    {
        global $validator;

        $page        = $request->get_param('project');
        $from        = $request->get_param('from');
        $to          = $request->get_param('to');
        $priority_id = $request->get_param('priority_id');
        $status_id   = $request->get_param('status_id');
        $search      = $request->get_param('search');

        $data = [];
        $data['from']          = $from ? $from. ' 00:00:00' : date('Y-m-d', strtotime('-3 months'));
        $data['to']            = $to ? $to. ' 23:59:59' : date('Y-m-d 23:59:59');
        $data['status_id']     = isset($status_id) ? intval($status_id) : null;
        $data['priority_id']   = isset($priority_id) ? intval($priority_id) : null;

        $projects    = Project::getAllProjects($page, $data['from'], $data['to'], $data['status_id'], $data['priority_id'], $search);

        $clients     = Client::whereHas('projects')->get();

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

        $projectIds = $projects->pluck('id')->toArray();

        $invoices = Invoice::whereIn('project_id', $projectIds)
                    ->with('status')
                    ->get();

       $invoiceTotalsByProject = $invoices->groupBy('project_id')->map(function ($invoices) {

            $total  = $invoices->sum('total');
            $paid   = $invoices->where('status.name', 'paid')->where('status.type', 'invoice')->sum('total');
            $unpaid = $total - $paid;

            return [
                'total'    => $total,
                'revenue'  => $paid,
                'due'      => $unpaid,
            ];
       });

       $projectWithDetails = $projects->map(function ($project) use ($wpUsers, $invoiceTotalsByProject) {
            $client        = $project->client;
            $eic_crm_users = $client->eic_crm_user;
            $wpUserId      = $eic_crm_users->wp_user_id;
            $wpUser        = $wpUsers[$wpUserId] ?? [];

            $invoices = $invoiceTotalsByProject->get($project->id, [
                'total'   => 0,
                'revenue' => 0,
                'due'     => 0
            ]);

            return [
                'id' => $project->id,
                'project_name' => $project->title,
                'client_name'  => $wpUser['name'] ?? null,
                'assignee'     => $project->eicCrmUsers->count(),
                'priority'     => $project->priority->name,
                'status'       => $project->status->name,
                'invoice'      => $invoices['total'] ?? 0,
                'revenue'      => $invoices['revenue'] ?? 0,
                'due'          => $invoices['due'] ?? 0,
            ];
       });

        return new \WP_REST_Response([
            'projects' => $projectWithDetails,
            'pagination' => [
                'total'         => $projects->total(),
                'per_page'      => $projects->perPage(),
                'current_page'  => $projects->currentPage(),
                'last_page'     => $projects->lastPage(),
                'next_page_url' => $projects->nextPageUrl(),
                'prev_page_url' => $projects->previousPageUrl(),
            ],
        ]);
    }
}