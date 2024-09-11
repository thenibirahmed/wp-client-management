<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;

class UpdateClient {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/client/update/(?P<id>\d+)';

    protected array $rules = [
        'name'         => 'required|string|unique:users,user_login',
        'email'        => 'required|email|unique:users,user_email',
        'phone'        => 'nullable|string',
        'address'      => 'nullable|string',
        'city'         => 'nullable|string',
        'state'        => 'nullable|string',
        'zip'          => 'nullable|string',
        'country'      => 'nullable|string',
        'role'         => 'nullable|string',
        'organization' => 'nullable|string',
        'status'       => 'nullable|string',
    ];

    protected array $validationMessages = [
        'name.required'       => 'The name is required.',
        'name.unique'         => 'The user name already exists.',
        'email.required'      => 'The email is required.',
        'email.email'         => 'The email must be a valid email.',
        'email.unique'        => 'The user email already exists.',
        'phone.string'        => 'The phone number must be a valid string.',
        'address.string'      => 'The address must be a valid string.',
        'city.string'         => 'The city must be a valid string.',
        'state.string'        => 'The state must be a valid string.',
        'zip.string'          => 'The zip code must be a valid string.',
        'country.string'      => 'The country must be a valid string.',
        'role.string'         => 'The role must be a valid string.',
        'organization.string' => 'The organization must be a string.',
        'status.string'       => 'The status must be a string.',
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

        $data = $request->get_params();
        $id = $request->get_param('id');

        $data['name']         = isset($data['name']) ? sanitize_text_field($data['name']) : '';
        $data['email']        = isset($data['email']) ? sanitize_email($data['email']) : '';
        $data['phone']        = isset($data['phone']) ? sanitize_text_field($data['phone']) : '';
        $data['address']      = isset($data['address']) ? sanitize_text_field($data['address']) : '';
        $data['city']         = isset($data['city']) ? sanitize_text_field($data['city']) : '';
        $data['state']        = isset($data['state']) ? sanitize_text_field($data['state']) : '';
        $data['zip']          = isset($data['zip']) ? sanitize_text_field($data['zip']) : '';
        $data['country']      = isset($data['country']) ? sanitize_text_field($data['country']) : '';
        $data['organization'] = isset($data['organization']) ? sanitize_text_field($data['organization']) : '';

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        return new \WP_REST_Response($data);

        $client = Client::find($id);

        if (!$client) {
            return new \WP_REST_Response([
                'error' => 'Client not found.',
            ], 404);
        }

        $eic_crm_user = EicCrmUser::find($client->eic_crm_user_id);

        $eic_crm_user->update([
            'phone' => $data['phone'],
            'address' => $data['address'],
            'city' => $data['city'],
            'state' => $data['state'],
            'zip' => $data['zip'],
            'country' => $data['country'],
            'role' => $data['role'],
            'designation' => $data['designation'],
        ]);

        if (isset($data['user_login']) || isset($data['user_email']) || isset($data['user_pass'])) {
            $wp_user_data = [
                'ID' => $eic_crm_user->wp_user_id,
                'user_login' => $data['user_login'] ?? null,
                'user_email' => $data['user_email'] ?? null,
                'user_pass' => $data['user_pass'] ?? null,
            ];

            $wp_user_data = array_filter($wp_user_data);

            $wp_user = wp_update_user($wp_user_data);

            if (is_wp_error($wp_user)) {
                return new \WP_REST_Response([
                    'message' => $wp_user->get_error_message(),
                ]);
            }
        }

        $client->update([
            'organization' => $data['organization'],
            'status' => $data['status'],
        ]);

        return new \WP_REST_Response([
            'message' => 'Client updated successfully.',
            'client' => $client,
        ], 200);
    }

}