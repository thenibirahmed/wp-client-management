<?php

namespace WpClientManagement\API\Invoices;

use WpClientManagement\Models\Invoice;

class EditInvoice {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/invoice/(?P<id>\d+)/edit';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'edit_invoice'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function edit_invoice(\WP_REST_Request $request) {

        $id = $request->get_param('id');

        if(!$id) {
            return new \WP_REST_Response([
                'error' => 'Id param required',
            ]);
        }

        $invoice = Invoice::find($id);

        if (!$invoice) {
            return new \WP_REST_Response([
                'message' => 'Invoice not found.',
            ], 404);
        }

        $invoiceResponse = [
            'id'         => $invoice->id,
            'client_id'  => $invoice->client_id,
            'project_id' => $invoice->project_id,
            'currency_id' => $invoice->currency_id,
            'code'       => $invoice->code,
            'type'       => $invoice->type,
            'title'      => $invoice->title,
            'date'       => $invoice->date,
            'due_date'   => $invoice->due_date,
            'note'       => $invoice->note,
            'billing_address' => $invoice->billing_address,
            'billing_phone_number' => $invoice->billing_phone_number,
            'billing_email' => $invoice->billing_email,
            'bill_from_address' => $invoice->bill_from_address,
            'bill_from_email' => $invoice->bill_from_email,
            'bill_from_phone_number' => $invoice->bill_from_phone_number,
            'payment_method_id' => $invoice->payment_method_id,
            'status_id' => $invoice->status_id,
            'sub_total' => $invoice->sub_total,
            'total' => $invoice->total,
            'discount' => $invoice->discount,
            'tax' => $invoice->tax,
            'fee' => $invoice->fee,
            'invoice_items' => $invoice->invoice_items,
        ];

        return new \WP_REST_Response([
            'invoice' => $invoiceResponse,
        ], 200);
    }
}