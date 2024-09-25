<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;

class GetClientInvoices {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/client/(?P<id>\d+)/invoices';

    protected array $rules = [
        'id'        => 'required|integer|exists:eic_clients,id',
        'from'      => 'nullable|date_format:Y-m-d',
        'to'        => 'nullable|date_format:Y-m-d',
        'status_id' => 'nullable|exists:eic_statuses,id',
    ];

    protected array $validationMessages = [
        'id.required'        => 'The client ID is required.',
        'id.integer'         => 'The client ID must be an integer.',
        'id.exists'          => 'The client does not exist.',
        'from.date_format'   => 'The from date is not valid.',
        'to.date_format'     => 'The from date is not valid.',
        'status_id'          => 'The status ID is not valid.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_client_invoices'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_client_invoices(\WP_REST_Request $request) {
        global $validator;

        $client_id   = $request->get_param('id');
        $page        = $request->get_param('invoice');
        $from        = $request->get_param('from');
        $to          = $request->get_param('to');
        $status_id   = $request->get_param('status_id');
        $search      = $request->get_param('search');

        if(!isset($client_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = [];
        $data['id']          = intval($client_id);
        $data['from']        = $from ?: date('Y-m-d', strtotime('-3 months'));
        $data['to']          = $to ?: date('Y-m-d');
        $data['status_id']   = isset($status_id) ? intval($status_id) : null;
        $data['search']      = $search ?: '';


        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $client = Client::where('id', $client_id)->exists();

        if(!$client) {
            return new \WP_REST_Response([
                'error' => 'Client does not exists.',
            ]);
        }

        $invoices = Invoice::getClientInvoices($client_id, $page, $data['from'], $data['to'], $data['status_id'], $data['search']);

        if(!$invoices) {
            return new \WP_REST_Response([
                'error' => 'No Invoices found',
            ]);
        }

        $data = [];
        foreach($invoices as $invoice) {
            $data[] = [
                'id'             => $invoice->id,
                'code'           => $invoice->code,
                'project'        => $invoice->project->title,
                'amount'         => $invoice->total,
                'status'         => $invoice->status->name,
                'payment_method' => $invoice->paymentMethod->name,
                'due_date'       => $invoice->due_date ? human_time_diff(strtotime($invoice->due_date), current_time('timestamp')) . ' ago' : null,
            ];
        };

        $response = [
            'invoices'   => $data,
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