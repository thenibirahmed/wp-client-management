<?php

namespace WpClientManagement\API\Invoices;

use WpClientManagement\Models\Invoice;

class UpdateInvoice {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/invoice/update/(?P<id>\d+)';

    protected array $rules = [
        'eic_crm_user_id' => 'required|exists:eic_eic_crm_users,id',
        'project_id' => 'nullable|exists:eic_projects,id',
        'client_id' => 'nullable|exists:eic_clients,id',
        'code' => 'required|integer',
        'type' => 'required|string',
        'title' => 'required|string',
        'date' => 'required|date',
        'due_date' => 'nullable|date',
        'items' => 'nullable|json',
        'note' => 'required|string',
        'billing_address' => 'required|string',
        'status' => 'required|string',
        'total' => 'required|numeric',
        'discount' => 'nullable|numeric',
        'tax' => 'nullable|numeric',
        'fee' => 'nullable|numeric',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The EicCrmUser ID is required.',
        'eic_crm_user_id.exists' => 'The selected EicCrmUser does not exist.',
        'project_id.exists' => 'The selected Project does not exist.',
        'client_id.exists' => 'The selected Client does not exist.',
        'code.required' => 'The Code is required.',
        'code.integer' => 'The Code must be an integer.',
        'type.required' => 'The Type is required.',
        'type.string' => 'The Type must be a valid string.',
        'title.required' => 'The Title is required.',
        'title.string' => 'The Title must be a valid string.',
        'date.required' => 'The Date is required.',
        'date.date' => 'The Date must be a valid date.',
        'due_date.date' => 'The Due Date must be a valid date.',
        'items.json' => 'The Items must be a valid JSON string.',
        'note.required' => 'The Note is required.',
        'note.string' => 'The Note must be a valid string.',
        'billing_address.required' => 'The Billing Address is required.',
        'billing_address.string' => 'The Billing Address must be a valid string.',
        'status.required' => 'The Status is required.',
        'status.string' => 'The Status must be a valid string.',
        'total.required' => 'The Total is required.',
        'total.numeric' => 'The Total must be a valid number.',
        'discount.numeric' => 'The Discount must be a valid number.',
        'tax.numeric' => 'The Tax must be a valid number.',
        'fee.numeric' => 'The Fee must be a valid number.',
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
        $id = $request->get_param('id');
        $data = $request->get_params();

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
            'eic_crm_user_id' => $data['eic_crm_user_id'],
            'project_id' => $data['project_id'],
            'client_id' => $data['client_id'],
            'code' => $data['code'],
            'type' => $data['type'],
            'title' => $data['title'],
            'date' => $data['date'],
            'due_date' => $data['date'],
            'items' => $data['items'],
            'note' => $data['note'],
            'billing_address' => $data['billing_address'],
            'status' => $data['status'],
            'total' => $data['total'],
            'discount' => $data['discount'],
            'tax' => $data['tax'],
            'fee' => $data['fee']
        ]);

        return new \WP_REST_Response([
            'message' => 'Invoice updated successfully.',
            'status' => $invoice,
        ], 200);
    }
}