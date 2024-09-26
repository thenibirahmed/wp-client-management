<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class GetClientProjects {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/client/(?P<id>\d+)/projects';

    protected array $rules = [
        'id'          => 'required|integer|exists:eic_clients,id',
        'from'        => 'nullable|date',
        'to'          => 'nullable|date',
        'status_id'   => 'nullable|exists:eic_statuses,id',
        'priority_id' => 'nullable|exists:eic_priorities,id',
    ];

    protected array $validationMessages = [
        'id.required'  => 'The client ID is required.',
        'id.integer'   => 'The client ID must be an integer.',
        'id.exists'    => 'The client does not exist.',
        'from.date'    => 'The from date is not valid.',
        'to.date'      => 'The from date is not valid.',
        'status_id'    => 'The status ID is not valid.',
        'priority_id'  => 'The priority ID is not valid.'
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

        $client_id   = $request->get_param('id');
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

        if(!isset($client_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ],400);
        }

        $data['id']  = $client_id;

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $client = Client::find($data['id']);

        if(!$client) {
            return new \WP_REST_Response([
                'error' => 'Client does not exists.',
            ],404);
        };

        $projects = Project::getClientProjects($client_id, $page, $data['from'], $data['to'], $data['priority_id'], $data['status_id'], $search);

        if(!$projects) {
            return new \WP_REST_Response([
                'error' => 'No Project found',
            ]);
        }

        $projectIds = $projects->pluck('id')->toArray();

        $invoices   = Invoice::whereIn('project_id', $projectIds)
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

        $projectWithDetails = [];
        foreach ($projects as $project) {
            $invoiceData = $invoiceTotalsByProject->get($project->id, [
                'total'   => 0,
                'revenue' => 0,
                'due'     => 0,
            ]);

            $projectWithDetails[] = [
                'id'        => $project->id,
                'name'      => $project->title,
                'status'    => $project->status->name ?? '',
                'priority'  => $project->priority->name ?? '',
                'invoice'   => [
                    'total'   => $invoiceData['total'],
                    'revenue' => $invoiceData['revenue'],
                    'due'     => $invoiceData['due'],
                ],
            ];
        }

        $response = [
            'projects'   => $projectWithDetails,
            'pagination' => [
                'total'         => $projects->total(),
                'per_page'      => $projects->perPage(),
                'current_page'  => $projects->currentPage(),
                'last_page'     => $projects->lastPage(),
                'next_page_url' => $projects->nextPageUrl(),
                'prev_page_url' => $projects->previousPageUrl(),
            ],
        ];

        return new \WP_REST_Response($response);
    }
}