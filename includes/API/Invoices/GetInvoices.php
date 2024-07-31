<?php 

namespace WpClientManagement\API\Invoices;

use WpClientManagement\Models\Invoice;

class GetInvoices {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/invoices';

    protected array $rules = [
        'eic_crm_user_id' => 'required',
        'project_id' => 'required',
        'client_id' => 'required',
        'code' => 'required|integer',
        'title' => 'required|string|max:255',
        'type' => 'required',
        'date' => 'required|date',
        'due_date' => 'nullable|date',
        'items' => 'nullable|json',
        'note' => 'nullable|string',
        'billing_address' => 'nullable|string',
        'status' => 'nullable',
        'total' => 'nullable|numeric',
        'discount' => 'nullable|numeric',
        'tax' => 'nullable|numeric',
        'fee' => 'nullable|numeric',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The eic_crm_user_id field is required.',
        'project_id.required' => 'The project_id field is required.',
        'client_id.required' => 'The client_id field is required.',
        'code.required' => 'The code field is required.',
        'code.integer' => 'The code field must be an integer.',
        'title.required' => 'The title field is required.',
        'title.string' => 'The title must be a string.',
        'title.max' => 'The title may not be greater than 255 characters.',
        'type.required' => 'The type field is required.',
        'date.required' => 'The date field is required.',
        'date.date' => 'The date field must be a valid date',
        'due_date.date' => 'The due_date field must be a valid date',
        'items.json' => 'The items field must contain a json representation',
        'note.string' => 'The note field must be a string',
        'billing_address.string' => 'The billing address field must be a string',
        'total.numeric' => 'The total field must be a number',
        'discount.numeric' => 'The discount field must be a number',
        'tax.numeric' => 'The tax field must be a number',
        'fee.numeric' => 'The fee field must be a number',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_invoices'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_invoices(\WP_REST_Request $request) {
        global $validator;

        $page = $request->get_params('page');

        // ------------------- Validation Example -------------------
        // $data = $request->get_params();

        // $validator = $validator->make($data, $this->rules, $this->validationMessages);

        // if($validator->fails()) {
        //     return new \WP_REST_Response([
        //         'errors' => $validator->errors(),
        //     ]);
        // }
        // ------------------- Validation Example -------------------

        $invoices = Invoice::paginate(20, ['*'], 'page', $page);

        $data = [];
        foreach ($invoices as $invoice) {
            $data[] = [
                'id' => $invoice->ID,
                'eic_crm_user' => $invoice->eic_crm_user->name,
                'project' => $invoice->project->name,
                'client' => $invoice->client->name,
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