<?php

namespace WpClientManagement\API\Emails;

use WpClientManagement\Models\Email;

class GetEmails {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/emails';

    protected array $rules = [
        'eic_crm_user_id' => 'required',
        'project_id'      => 'required',
        'client_id'       => 'required',
        'subject'         => 'nullable|string|max:255',
        'body'            => 'required',
        'date'            => 'required|date'
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The eic_crm_user_id field is required.',
        'project_id.required'      => 'The project_id field is required.',
        'client_id.required'       => 'The client_id field is required.',
        'subject.string'           => 'The subject must be a string.',
        'subject.max'              => 'The subject may not be greater than 255 characters.',
        'body.required'            => 'The body field is required.',
        'date.required'            => 'The date field is required.',
        'date.date'                => 'The date field must be a valid date.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_emails'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_emails(\WP_REST_Request $request) {

        $page = $request->get_params('page');


        $emails = Email::paginate(5, ['*'], 'page', $page);

        $data = [];
        foreach ($emails as $email) {
            $data[] = [
                'id'           => $email->id,
                'eic_crm_user' => $email->eic_crm_user,
                'project'      => $email->project,
                'client'       => $email->client,
                'subject'      => $email->subject,
                'body'         => $email->body,
                'scheduled_at' => $email->scheduled_at
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total'         => $emails->total(),
                'per_page'      => $emails->perPage(),
                'current_page'  => $emails->currentPage(),
                'last_page'     => $emails->lastPage(),
                'next_page_url' => $emails->nextPageUrl(),
                'prev_page_url' => $emails->previousPageUrl(),
            ],
        ]);
    }
}