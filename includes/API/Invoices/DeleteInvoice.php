<?php

namespace WpClientManagement\API\Invoices;

use WpClientManagement\Models\Invoice;

class DeleteInvoice {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/invoice/delete/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_invoices,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The Invoice ID is required.',
        'id.integer'  => 'The Invoice ID must be an integer.',
        'id.exists'   => 'The Invoice does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_invoices'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function delete_invoices(\WP_REST_Request $request) {
        global $validator;

        $invoice_id = $request->get_param('id');

        $data       = ['id' => $invoice_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $invoice = Invoice::find($invoice_id);

        if (!$invoice) {
            return new \WP_REST_Response([
                'message' => 'Invoice not found.',
            ], 404);
        }

        $invoice->items()->delete();

        $invoice->delete();

        return new \WP_REST_Response([
            'message' => 'Invoice deleted successfully.',
        ], 200);
    }
}