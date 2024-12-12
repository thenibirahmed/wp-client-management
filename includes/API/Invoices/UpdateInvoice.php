<?php

namespace WpClientManagement\API\Invoices;

use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Invoice;

class UpdateInvoice {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/invoice/update/(?P<id>\d+)';

    protected array $rules = [
        'eic_crm_user_id'          => 'nullable|exists:eic_eic_crm_users,id',
        'project_id'               => 'nullable|exists:eic_projects,id',
        'client_id'                => 'nullable|exists:eic_clients,id',
        'currency_id'              => 'nullable|exists:eic_currencies,id',
        'payment_method_id'        => 'nullable|exists:eic_payment_methods,id',
        'status_id'                => 'nullable|exists:eic_statuses,id',
        'invoice_number'           => 'required|integer',
        'type'                     => 'nullable|string',
        'title'                    => 'required|string',
        'date'                     => 'required|date',
        'due_date'                 => 'nullable|date',
        'bill_to_id'               => 'nullable|exists:eic_clients,id',
        'bill_from_address'        => 'nullable|string',
        'bill_from_phone_number'   => 'required|string',
        'bill_from_email'          => 'required|email',
        'items'                    => 'nullable|json',
        'bill_from_id'             => 'nullable|exists:eic_eic_crm_users,id',
        'billing_address'          => 'nullable|string',
        'billing_phone_number'     => 'required|string',
        'billing_email'            => 'required|email',
        'note'                     => 'nullable|string',
        'sub_total'                => 'required|numeric',
        'total'                    => 'required|numeric',
        'discount'                 => 'nullable|numeric',
        'tax'                      => 'nullable|numeric',
        'fee'                      => 'nullable|numeric',
        'invoice_items'            => 'array|min:1',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.exists'         => 'The selected EicCrmUser does not exist.',
        'project_id.exists'              => 'The selected Project does not exist.',
        'client_id.exists'               => 'The selected Client does not exist.',
        'currency_id.exists'             => 'The selected Currency does not exist.',
        'payment_method_id.exists'       => 'The selected Payment Method does not exist.',
        'status_id.exists'               => 'The selected Status does not exist.',
        'invoice_number.required'        => 'The Invoice Number is required.',
        'invoice_number.integer'         => 'The Invoice Number must be an integer.',
        'type.string'                    => 'The Type must be a valid string.',
        'title.required'                 => 'The Title is required.',
        'title.string'                   => 'The Title must be a valid string.',
        'date.required'                  => 'The Date is required.',
        'date.date'                      => 'The Date must be a valid date.',
        'due_date.date'                  => 'The Due Date must be a valid date.',
        'bill_from_address.string'       => 'The Bill From Address must be a valid string.',
        'bill_from_phone_number.required'=> 'The Bill From Phone Number is required.',
        'bill_from_phone_number.string'  => 'The Bill From Phone Number must be a valid string.',
        'bill_from_email.required'       => 'The Bill From Email is required.',
        'bill_from_email.email'          => 'The Bill From Email must be a valid email address.',
        'items.json'                     => 'The Items must be a valid JSON string.',
        'billing_address.string'         => 'The Billing Address must be a valid string.',
        'billing_phone_number.required'  => 'The Billing Phone Number is required.',
        'billing_phone_number.string'    => 'The Billing Phone Number must be a valid string.',
        'billing_email.required'         => 'The Billing Email is required.',
        'billing_email.email'            => 'The Billing Email must be a valid email address.',
        'note.string'                    => 'The Note must be a valid string.',
        'sub_total.required'             => 'The Sub Total is required.',
        'sub_total.numeric'              => 'The Sub Total must be a valid number.',
        'total.required'                 => 'The Total is required.',
        'total.numeric'                  => 'The Total must be a valid number.',
        'discount.numeric'               => 'The Discount must be a valid number.',
        'tax.numeric'                    => 'The Tax must be a valid number.',
        'fee.numeric'                    => 'The Fee must be a valid number.',
        'invoice_items.array'            => 'The Invoice Items must be an array.',
        'invoice_items.min'              => 'The Invoice Items must contain at least one item.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_invoice'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_invoice(\WP_REST_Request $request) {
        global $validator;

        $id = intval($request->get_param('id'));
        $data = $request->get_params();

        $currentWpUser                  = wp_get_current_user();
        $eicCrmUserId                   = EicCrmUser::whereWpUserId($currentWpUser->ID)->pluck('id')->first();
        $data['eic_crm_user_id']        = isset($eicCrmUserId) ? intval($eicCrmUserId) : null;
        $data['project_id']             = isset($data['project_id']) ? intval($data['project_id']) : null;
        $data['client_id']              = isset($data['client_id']) ? intval($data['client_id']) : null;
        $data['status_id']              = isset($data['status_id']) ? intval($data['status_id']) : null;
        $data['currency_id']            = isset($data['currency_id']) ? intval($data['currency_id']) : null;
        $data['payment_method_id']      = isset($data['payment_method_id']) ? intval($data['payment_method_id']) : null;
        $data['status_id']              = isset($data['status_id']) ? intval($data['status_id']) : null;
        $data['code']                   = sanitize_text_field($data['invoice_number'] ?? '');
        $data['type']                   = sanitize_text_field($data['type'] ?? '');
        $data['title']                  = sanitize_text_field($data['title'] ?? '');
        $data['date']                   = isset($data['date']) ? sanitize_text_field($data['date']) : date('Y-m-d');
        $data['due_date']               = isset($data['due_date']) ? sanitize_text_field($data['due_date']) : null;
        $data['invoice_items']          = isset($data['invoice_items']) ? $data['invoice_items'] : null;
        $data['note']                   = sanitize_textarea_field($data['note'] ?? '');
        $data['bill_to_id']             = isset($data['bill_to_id']) ? intval($data['bill_to_id']) : null;
        $data['billing_address']        = sanitize_textarea_field($data['billing_address'] ?? '');
        $data['billing_phone_number']   = sanitize_textarea_field($data['billing_phone_number'] ?? '');
        $data['billing_email']          = sanitize_textarea_field($data['billing_email'] ?? '');
        $data['bill_from_id']           = isset($data['bill_from_id']) ? intval($data['bill_from_id']) : null;
        $data['bill_from_address']      = sanitize_textarea_field($data['bill_from_address'] ?? '');
        $data['bill_from_phone_number'] = sanitize_textarea_field($data['bill_from_phone_number'] ?? '');
        $data['bill_from_email']        = sanitize_textarea_field($data['bill_from_email'] ?? '');
        $data['sub_total']              = floatval($data['sub_total'] ?? 0.0);
        $data['total']                  = floatval($data['total'] ?? 0.0);
        $data['discount']               = floatval($data['discount'] ?? 0.0);
        $data['tax']                    = floatval($data['tax'] ?? 0.0);
        $data['fee']                    = floatval($data['fee'] ?? 0.0);

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $invoice = Invoice::find($id);

        if (!$invoice) {
            return new \WP_REST_Response([
                'message' => 'Invoice not found.',
            ], 404);
        }

        $invoice->update([
            'project_id'              => $data['project_id'],
            'client_id'               => $data['client_id'],
            'currency_id'             => $data['currency_id'],
            'payment_method_id'       => $data['payment_method_id'],
            'status_id'               => $data['status_id'],
            'invoice_number'          => $data['invoice_number'],
            'type'                    => $data['type'],
            'title'                   => $data['title'],
            'date'                    => $data['date'],
            'due_date'                => $data['due_date'],
            'bill_to_id'              => $data['bill_to_id'],
            'billing_address'         => $data['billing_address'],
            'billing_phone_number'    => $data['billing_phone_number'],
            'billing_email'           => $data['billing_email'],
            'bill_from_id'            => $data['bill_from_id'],
            'bill_from_address'       => $data['bill_from_address'],
            'bill_from_phone_number'  => $data['bill_from_phone_number'],
            'bill_from_email'         => $data['bill_from_email'],
            'note'                    => $data['note'],
            'sub_total'               => $data['sub_total'],
            'total'                   => $data['total'],
            'discount'                => $data['discount'],
            'tax'                     => $data['tax'],
            'fee'                     => $data['fee']
        ]);

        if (isset($data['invoice_items']) && is_array($data['invoice_items'])) {
            $provided_item_ids = [];

            foreach ($data['invoice_items'] as $item) {
                $sanitized_item = array_map('sanitize_text_field', $item);
                $invoice_item_data = [
                    'details'        => $item['itemDetails'],
                    'quantity'       => $item['quantity'],
                    'unit_price'     => $item['rate'],
                    'discount_type'  => $item['discountType'],
                    'discount_value' => $item['discount'],
                    'tax_type'       => $item['taxType'],
                    'tax_value'      => $item['tax'],
                    'line_total'     => $item['total'],
                ];

                if (!empty($sanitized_item['id'])) {
                    $provided_item_ids[] = $sanitized_item['id'];

                    $invoiceItem = $invoice->invoice_items()->find($sanitized_item['id']);
                    if ($invoiceItem) {
                        $invoiceItem->update($invoice_item_data);
                    }
                } else {
                    $newItem = $invoice->invoice_items()->create($invoice_item_data);
                    $provided_item_ids[] = $newItem->id;
                }
            }

            $invoice->invoice_items()->whereNotIn('id', $provided_item_ids)->delete();
        }


        return new \WP_REST_Response([
            'message' => 'Invoice updated successfully.',
            'status' => $invoice,
        ], 200);
    }
}