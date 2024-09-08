<?php

namespace WpClientManagement\API\InvoiceItems;

use WpClientManagement\Models\InvoiceItem;

class CreateInvoiceItem {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = 'invoice-item/create';

    protected array $rules = [
        'name'           => 'required|string',
        'invoice_id'     => 'required|exists:eic_invoices,id',
        'details'        => 'nullable|string',
        'quntity'        => 'nullable|integer',
        'unit_price'     => 'required|numeric',
        'discount_type'  => 'nullable|string',
        'discount_value' => 'nullable|numeric',
        'tax_type'       => 'nullable|string',
        'tax_value'      => 'nullable|numeric',
        'line_total'     => 'nullable|numeric',
    ];

    protected array $validationMessages = [
        'name.required'           => 'The Name is required.',
        'name.string'             => 'The Name must be a valid string.',
        'invoice_id.required'     => 'The Invoice ID is required.',
        'invoice_id.exists'       => 'The selected Invoice does not exist.',
        'details.string'          => 'The Details must be a valid string.',
        'quntity.integer'         => 'The Quantity must be an integer.',
        'unit_price.required'     => 'The Unit Price is required.',
        'unit_price.numeric'      => 'The Unit Price must be a valid number.',
        'discount_type.string'    => 'The Discount Type must be a valid string.',
        'discount_value.numeric'  => 'The Discount Value must be a valid number.',
        'tax_type.string'         => 'The Tax Type must be a valid string.',
        'tax_value.numeric'       => 'The Tax Value must be a valid number.',
        'line_total.numeric'      => 'The Line Total must be a valid number.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'add_invoice_items'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function add_invoice_items(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();

        $data['name'] = isset($data['name']) ? sanitize_text_field($data['name']) : null;
        $data['invoice_id'] = isset($data['invoice_id']) ? intval($data['invoice_id']) : null;
        $data['details'] = isset($data['details']) ? sanitize_text_field($data['details']) : null;
        $data['quntity'] = isset($data['quntity']) ? intval($data['quntity']) : null;
        $data['unit_price'] = isset($data['unit_price']) ? floatval($data['unit_price']) : null;
        $data['discount_type'] = isset($data['discount_type']) ? sanitize_text_field($data['discount_type']) : null;
        $data['discount_value'] = isset($data['discount_value']) ? floatval($data['discount_value']) : null;
        $data['tax_type'] = isset($data['tax_type']) ? sanitize_text_field($data['tax_type']) : null;
        $data['tax_value'] = isset($data['tax_value']) ? floatval($data['tax_value']) : null;
        $data['line_total'] = isset($data['line_total']) ? floatval($data['line_total']) : null;

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        InvoiceItem::create($data);

        return new \WP_REST_Response([
            'message' => 'Invoice item created successfully.',
        ], 200);

    }
}