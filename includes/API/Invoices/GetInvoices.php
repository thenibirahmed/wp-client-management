<?php

namespace WpClientManagement\API\Invoices;

use WpClientManagement\Helpers\AuthUser;
use WpClientManagement\Models\Invoice;

class GetInvoices {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/invoices';

    protected array $rules = [
        'from'      => 'nullable|date',
        'to'        => 'nullable|date',
        'status_id' => 'nullable|exists:eic_statuses,id',
        'currency'  => 'nullable|exists:eic_currencies,code',
    ];

    protected array $validationMessages = [
        'from.date'     => 'The from date is not valid.',
        'to.date'       => 'The from date is not valid.',
        'status_id'     => 'The status ID is not valid.',
        'currency'      => 'The currency is not valid.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_invoices'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_invoices(\WP_REST_Request $request) {
        global $validator;

        $page        = $request->get_param('invoice');
        $currency    = $request->get_param('currency');
        $from        = $request->get_param('from');
        $to          = $request->get_param('to');
        $status_id   = $request->get_param('status_id');
        $search      = $request->get_param('search');

        $data = [];
        $data['from']        = $from ? $from. ' 00:00:00' : date('Y-m-d', strtotime('-3 months'));
        $data['to']          = $to ? $to. ' 23:59:59' : date('Y-m-d 23:59:59');
        $data['status_id']   = isset($status_id) ? intval($status_id) : null;
        $data['search']      = $search ?: '';
        $data['currency']    = $currency ?: 'USD';

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        if(AuthUser::user()->role == 'admin') {
            $invoices = Invoice::with('project')->paginate(5, ['*'], 'page', $page);
        }elseif(AuthUser::user()->role == 'client') {
            $invoices = Invoice::getClientInvoices(AuthUser::user()->id, $page, $data['currency'], $data['from'], $data['to'], $data['status_id'], $data['search']);
        }

        $data = [];
        foreach ($invoices as $invoice) {
            $data[] = [
                'id'             => $invoice->id,
                'code'           => $invoice->code,
                'project'        => $invoice->project->title,
                'amount'         => $invoice->total,
                'status'         => $invoice->status->name,
                'payment_method' => $invoice->paymentMethod?->name,
                'due_date'       => $invoice->due_date ? human_time_diff(strtotime($invoice->due_date), current_time('timestamp')) . ' ago' : null,
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total'         => $invoices->total(),
                'per_page'      => $invoices->perPage(),
                'current_page'  => $invoices->currentPage(),
                'last_page'     => $invoices->lastPage(),
                'next_page_url' => $invoices->nextPageUrl(),
                'prev_page_url' => $invoices->previousPageUrl(),
            ],
        ]);
    }
}