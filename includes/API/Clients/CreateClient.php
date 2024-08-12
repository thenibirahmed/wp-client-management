<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;

class CreateClient {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/clients/create';

    protected array $rules = [
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8',
        'organization' => 'nullable|string',
        'designation' => 'nullable|string',
        'status' => 'nullable|string'
    ];

    protected array $validationMessages = [
        'email.required' => 'The email field is required.',
        'email.email' => 'The email must be a valid email address.',
        'email.unique' => 'The email has already been taken.',
        'password.required' => 'The password field is required.',
        'password.string' => 'The password must be a string.',
        'password.min' => 'The password must be at least 8 characters.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_client'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function create_client(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_json_params();

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }
        
        $user_id = wp_create_user(
            sanitize_user($data['email'], true),
            $data['password'],
            $data['email']
        );

    if (is_wp_error($user_id)) {
        return new \WP_REST_Response([
            'error' => $user_id->get_error_message(),
        ], 400);
    }

    $eic_crm_user = EicCrmUser::create(['wp_user_id' => $user_id]);

    $client = Client::create([
        'eic_crm_user_id' => $eic_crm_user->id,
        'organization' => $data['organization'] ?? null,
        'designation' => $data['designation'] ?? null,
        'status' => $data['status'] ?? null,
    ]);

    return new \WP_REST_Response([
        'message' => 'Client created successfully.',
        'client' => $client,
    ], 201);
    }
}