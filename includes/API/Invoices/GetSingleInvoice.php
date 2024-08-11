<?php

namespace WpClientManagement\API\Invoices;

use WpClientManagement\Models\Invoice;

class GetSingleInvoice {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/invoice/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:invoices,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The Invoice ID is required.',
        'id.integer' => 'The Invoice ID must be an integer.',
        'id.exists' => 'The Invoice does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_invoice'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_invoice(\WP_REST_Request $request) {
        global $validator;

        $invoice_id = $request->get_param('id');

        if(!isset($invoice_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $invoice_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $invoice = Invoice::find($data['id']);

        if(!$invoice) {
            return new \WP_REST_Response([
                'error' => 'No Invoice found',
            ]);
        }

        $response = [
            'data' => $invoice,
        ];

        return new \WP_REST_Response($response);
    }
}