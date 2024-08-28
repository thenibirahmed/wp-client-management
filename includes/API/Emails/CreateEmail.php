<?php
namespace WpClientManagement\API\Emails;

use WpClientManagement\Models\Email;

class CreateEmail{

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/email/create';

    protected array $rules = [
        'eic_crm_user_id' => 'required|exists:eic_eic_crm_users,id',
        'client_id'       => 'required|exists:eic_clients,id',
        'subject'         => 'nullable|string',
        'body'            => 'required|string',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The User field is required.',
        'eic_crm_user_id.exists' => 'The selected User does not exist.',
        'client_id.required' => 'The client field is required.',
        'client_id.exists' => 'The selected client does not exist.',
        'subject.string' => 'The subject must be a valid string.',
        'body.required' => 'The body field is required.',
        'body.string' => 'The body must be a valid string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_email'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function create_email(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();

        $data['eic_crm_user_id'] = intval($data['eic_crm_user_id']);
        $data['client_id'] = intval($data['client_id']);
        $data['subject'] = sanitize_text_field($data['subject']);
        $data['body'] = sanitize_text_field($data['body']);

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $email = Email::create([
            'eic_crm_user_id' => $data['eic_crm_user_id'],
            'client_id' => $data['client_id'],
            'subject' => $data['subject'],
            'body' => $data['body'],
        ]);

        if(!$email) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        return new \WP_REST_Response([
            'message' => 'Email created successfully.',
            'email' => $email,
        ], 201);
    }
}