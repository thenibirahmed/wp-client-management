<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class GetProjectInvoices {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/project/(?P<id>\d+)/invoices';

    protected array $rules = [
        'id'                => 'required|integer|exists:eic_projects,id',
        'currency'          => 'nullable|exists:eic_currencies,code',
        'from'              => 'nullable|date',
        'to'                => 'nullable|date',
        'status_id'         => 'nullable|integer|exists:eic_statuses,id',
        'payment_method_id' => 'nullable|integer|exists:eic_payment_methods,id',
    ];

    protected array $validationMessages = [
        'id.required'               => 'The project ID is required.',
        'id.integer'                => 'The project ID must be an integer.',
        'id.exists'                 => 'The project does not exist.',
        'currency.exists'           => 'The currency does not exist.',
        'status_id.exists'          => 'The status does not exist.',
        'from.date'                 => 'The from date must be a valid date.',
        'to.date'                   => 'The to date must be a valid date.',
        'payment_method_id.exists'  => 'The payment method does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_project_invoices'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_project_invoices(\WP_REST_Request $request) {
        global $validator;

        $project_id  = $request->get_param('id');
        $page        = $request->get_param('invoice');
        $currency    = $request->get_param('currency');
        $from        = $request->get_param('from');
        $to          = $request->get_param('to');
        $status_id   = $request->get_param('status_id');
        $pay_method  = $request->get_param('payment_method_id');
        $search      = $request->get_param('search');

        if(!isset($project_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data[] = [];
        $data['id']                = intval($project_id);
        $data['currency']          = $currency ?: 'USD';
        $data['from']              = $from ? $from. ' 00:00:00' : date('Y-m-d', strtotime('-3 months'));
        $data['to']                = $to ? $to. ' 23:59:59' : date('Y-m-d 23:59:59');
        $data['status_id']         = isset($status_id) ? intval($status_id) : null;
        $data['payment_method_id'] = isset($pay_method) ? intval($pay_method) : null;

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

        $invoices = Invoice::getPorjectInvoices($data['id'], $page, $data['currency'], $data['from'], $data['to'], $data['status_id'], $data['payment_method_id'], $search);

        if(!$invoices) {
            return new \WP_REST_Response([
                'error' => 'No Invoices found',
            ]);
        }

        $clientIds   = $invoices->pluck('client_id')->toArray();
        $clients     = Client::whereIn('id', $clientIds)
                    ->with('eic_crm_user')
                    ->get();

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
           $wp_user_id = $client?->eic_crm_user->wp_user_id;
           $wp_user    = $wpUsers[$wp_user_id] ?? [];

           return [
               'id'             => $invoice->id,
               'code'           => $invoice->code,
               'client_name'    => $wp_user['name'] ?? '',
               'total'          => number_format($invoice->total, 2),
               'status'         => $invoice->status->name,
               'payment_method' => $invoice->paymentMethod?->name,
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