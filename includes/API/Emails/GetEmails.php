<?php 

namespace WpClientManagement\API\Emails;

use WpClientManagement\Models\Email;

class GetEmail {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/emails';

    protected array $rules = [
        'eic_crm_user_id' => 'required',
        'project_id' => 'required',
        'client_id' => 'required',
        'subject' => 'nullable|string|max:255',
        'body' => 'required',
        'date' => 'required|date'
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The eic_crm_user_id field is required.',
        'project_id.required' => 'The project_id field is required.',
        'client_id.required' => 'The client_id field is required.',
        'subject.string' => 'The subject must be a string.',
        'subject.max' => 'The subject may not be greater than 255 characters.',
        'body.required' => 'The body field is required.',
        'date.required' => 'The date field is required.',
        'date.date' => 'The date field must be a valid date.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_emails'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_emails(\WP_REST_Request $request) {
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

        $emails = Email::paginate(20, ['*'], 'page', $page);

        $data = [];
        foreach ($emails as $email) {
            $data[] = [
                'id' => $email->ID,
                'eic_crm_user' => $email->eic_crm_user->name,
                'project' => $email->project->name,
                'client' => $email->client->name,
                'subject' => $email->subject,
                'body' => $email->body,
                'date' => $email->date
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $emails->total(),
                'per_page' => $emails->perPage(),
                'current_page' => $emails->currentPage(),
                'last_page' => $emails->lastPage(),
                'next_page_url' => $emails->nextPageUrl(),
                'prev_page_url' => $emails->previousPageUrl(),
            ],
        ]);
    }
}