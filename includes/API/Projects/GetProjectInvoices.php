<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class GetProjectInvoices {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/project/(?P<id>\d+)/invoices';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_projects,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The project ID is required.',
        'id.integer'  => 'The project ID must be an integer.',
        'id.exists'   => 'The project does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_project_invoices'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_project_invoices(\WP_REST_Request $request) {
        global $validator;

        $project_id  = $request->get_param('id');
        $page        = $request->get_param('invoice');

        if(!isset($project_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $project_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $project = Project::getProjectData($data['id']);

        if(!$project) {
            return new \WP_REST_Response([
                'error' => 'Project does not exists.',
            ]);
        }

        $invoices = Invoice::getPorjectInvoices($data['id'], $page);

        if(!$invoices) {
            return new \WP_REST_Response([
                'error' => 'No Invoices found',
            ]);
        }

        $clientIds   = $invoices->pluck('client_id')->toArray();
        $clients     = Client::whereIn('id', $clientIds)->get();

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

        $invoiceWithDetails = $invoices->map(function ($invoice) use ($wpUsers) {
           $client     = $invoice->client;
           $wp_user_id = $client->eic_crm_user->wp_user_id;
           $wp_user    = $wpUsers[$wp_user_id] ?? [];

           return [
               'id'             => $invoice->id,
               'code'           => $invoice->code,
               'client_name'    => $wp_user['name'],
               'total'          => $invoice->total,
               'status'         => $invoice->status->name,
               'payment_method' => $invoice->paymentMethod->name,
               'due_date'       => $invoice->due_date ? date('M d, Y', strtotime($invoice->due_date)) : '',
           ];

        });

        $response = [
            'invoices'   => $invoiceWithDetails,
            'pagination' => [
                'total'         => $invoices->total(),
                'per_page'      => $invoices->perPage(),
                'current_page'  => $invoices->currentPage(),
                'last_page'     => $invoices->lastPage(),
                'next_page_url' => $invoices->nextPageUrl(),
                'prev_page_url' => $invoices->previousPageUrl(),
            ],
        ];

        return new \WP_REST_Response($response);
    }
}