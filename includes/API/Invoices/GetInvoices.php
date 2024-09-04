<?php

namespace WpClientManagement\API\Invoices;

use WpClientManagement\Models\Invoice;

class GetInvoices {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/invoices';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_invoices'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_invoices(\WP_REST_Request $request) {

        $page = $request->get_params('page');

        $invoices = Invoice::paginate(5, ['*'], 'page', $page);

        $data = [];
        foreach ($invoices as $invoice) {
            $data[] = [
                'id' => $invoice->id,
                'eic_crm_user' => $invoice->eic_crm_user,
                'project' => $invoice->project,
                'client' => $invoice->client,
                'code' => $invoice->code,
                'title' => $invoice->title,
                'type' => $invoice->type,
                'date' => $invoice->date,
                'due_date' => $invoice->due_date,
                'items' => $invoice->items,
                'notes' => $invoice->note,
                'billing_address' => $invoice->billing_address,
                'status' => $invoice->status,
                'total' => $invoice->total,
                'discount' => $invoice->discount,
                'tax' => $invoice->tax,
                'fee' => $invoice->fee,
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $invoices->total(),
                'per_page' => $invoices->perPage(),
                'current_page' => $invoices->currentPage(),
                'last_page' => $invoices->lastPage(),
                'next_page_url' => $invoices->nextPageUrl(),
                'prev_page_url' => $invoices->previousPageUrl(),
            ],
        ]);
    }
}