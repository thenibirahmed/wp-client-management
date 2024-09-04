<?php

namespace WpClientManagement\API\Emails;

use WpClientManagement\Models\Email;

class GetSingleEmail {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/email/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_emails,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The email ID is required.',
        'id.integer' => 'The email ID must be an integer.',
        'id.exists' => 'The email does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_single_email'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_email(\WP_REST_Request $request) {
        global $validator;

        $email_id = $request->get_param('id');

        if(!isset($email_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $email_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $email = Email::find($data['id']);

        if(!$email) {
            return new \WP_REST_Response([
                'error' => 'No Email found',
            ]);
        }

        $eic_crm_user = $email->eic_crm_user;

        $wp_user = get_user_by('id', $eic_crm_user->wp_user_id);

        $response = [
            'id' => $email->id,
            'subject' => $email->subject,
            'from' => $wp_user->user_login,
            'body' => $email->body,
            'date' => $email->created_at ? date('M d, Y g:iA', strtotime($email->created_at)) : '',
        ];

        return new \WP_REST_Response($response);
    }
}