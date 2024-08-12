<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;

class UpdateClient {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/clients/update/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:clients,id',
        'email' => 'nullable|email|unique:users,email',
        'password' => 'nullable|string|min:6',
        'organization' => 'nullable|string',
        'designation' => 'nullable|string',
        'status' => 'nullable|string',
        'phone' => 'nullable|string',
        'address' => 'nullable|string',
        'city' => 'nullable|string',
        'state' => 'nullable|string',
        'zip' => 'nullable|string',
        'country' => 'nullable|string',
        'role' => 'nullable|string',
    ];

    protected array $validationMessages = [
        'id.required' => 'The client ID is required.',
        'id.integer' => 'The client ID must be an integer.',
        'id.exists' => 'The client does not exist.',
        'email.email' => 'The email must be a valid email address.',
        'email.unique' => 'The email has already been taken.',
        'password.string' => 'The password must be a string.',
        'password.min' => 'The password must be at least 6 characters.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => array($this, 'update_client'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_client(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_json_params();
        $client_id = $request->get_param('id');

        $data['id'] = $client_id;

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $client = Client::find($client_id);

        if (!$client) {
            return new \WP_REST_Response([
                'error' => 'Client not found.',
            ], 404);
        }

        if (isset($data['email']) || isset($data['password'])) {
            $user = get_user_by('id', $client->eic_crm_user->wp_user_id);

            if (isset($data['email'])) {
                wp_update_user([
                    'ID' => $user->ID,
                    'user_email' => $data['email']
                ]);
            }

            if (isset($data['password'])) {
                wp_set_password($data['password'], $user->ID);
            }
        }

        $client->update([
            'organization' => $data['organization'] ?? $client->organization,
            'designation' => $data['designation'] ?? $client->designation,
            'status' => $data['status'] ?? $client->status,
        ]);

        $eic_crm_user = EicCrmUser::where('wp_user_id', $client->eic_crm_user_id)->first();

        if ($eic_crm_user) {
            $eic_crm_user->update([
                'phone' => $data['phone'] ?? $eic_crm_user->phone,
                'address' => $data['address'] ?? $eic_crm_user->address,
                'city' => $data['city'] ?? $eic_crm_user->city,
                'state' => $data['state'] ?? $eic_crm_user->state,
                'zip' => $data['zip'] ?? $eic_crm_user->zip,
                'country' => $data['country'] ?? $eic_crm_user->country,
                'role' => $data['role'] ?? $eic_crm_user->role,
            ]);
        }

        return new \WP_REST_Response([
            'message' => 'Client updated successfully.',
            'client' => $client,
        ], 200);
    }
}