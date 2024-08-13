<?php

namespace WpClientManagement\API\Emails;

use WpClientManagement\Models\Email;

class DeleteEmail {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/email/delete/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_emails,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The Email ID is required.',
        'id.integer' => 'The Email ID must be an integer.',
        'id.exists' => 'The Email does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_email'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function delete_email(\WP_REST_Request $request) {
        global $validator;

        $email_id = $request->get_param('id');

        $data = ['id' => $email_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $email = Email::find($email_id);
        if (!$email) {
            return new \WP_REST_Response([
                'message' => 'Email not found.',
            ], 404);
        }
        $email->delete();

        return new \WP_REST_Response([
            'message' => 'Email deleted successfully.',
        ], 200);
    }
}