<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;

class UpdateClient {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/client/update/(?P<id>\d+)';

    protected function rules($clientId) {
        return [
            'name'         => 'required|string|unique:users,user_login,' . $clientId,
            'email'        => 'required|email|unique:users,user_email,' . $clientId,
            'phone'        => 'nullable|string',
            'address'      => 'nullable|string',
            'city'         => 'nullable|string',
            'state'        => 'nullable|string',
            'zip'          => 'nullable|string',
            'country'      => 'nullable|string',
            'role'         => 'nullable|string',
            'organization' => 'nullable|string',
            'image_url'    => 'required|url',
            'status'       => 'nullable|string',
        ];
    }

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
        'image_url.url'       => 'The image url must be a valid URL.',
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
        global $wpdb;

        $data = $request->get_params();
        $id   = $request->get_param('id');

        $data['name']         = isset($data['name']) ? sanitize_text_field($data['name']) : '';
        $data['email']        = isset($data['email']) ? sanitize_email($data['email']) : '';
        $data['phone']        = isset($data['phone']) ? sanitize_text_field($data['phone']) : '';
        $data['address']      = isset($data['address']) ? sanitize_text_field($data['address']) : '';
        $data['city']         = isset($data['city']) ? sanitize_text_field($data['city']) : '';
        $data['state']        = isset($data['state']) ? sanitize_text_field($data['state']) : '';
        $data['zip']          = isset($data['zip']) ? sanitize_text_field($data['zip']) : '';
        $data['country']      = isset($data['country']) ? sanitize_text_field($data['country']) : '';
        $data['organization'] = isset($data['organization']) ? sanitize_text_field($data['organization']) : '';
        $data['image_url']    = isset($data['image_url']) ? sanitize_url($data['image_url']) : null;

        $client = Client::find($id);

        if (!$client) {
            return new \WP_REST_Response([
                'errors' => 'Client not found.',
            ], 404);
        }

        $eic_crm_user = EicCrmUser::find($client->eic_crm_user_id);

        if (!$eic_crm_user) {
            return new \WP_REST_Response([
                'errors' => 'User data not found.',
            ], 404);
        }

        $validator = $validator->make($data, $this->rules($eic_crm_user->wp_user_id), $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $eic_crm_user->update([
            'phone'        => $data['phone'],
            'address'      => $data['address'],
            'city'         => $data['city'],
            'state'        => $data['state'],
            'zip'          => $data['zip'],
            'country'      => $data['country']
        ]);

        $result = $wpdb->update(
            $wpdb->users,
            ['user_login' => $data['name']],
            ['ID' => $eic_crm_user->wp_user_id]
        );

        if ($result === false) {
            return new \WP_REST_Response([
                'message' => 'Failed to update user_login: ' . $wpdb->last_error,
            ], 500);
        }

        $wp_user = wp_update_user([
            'ID' => $eic_crm_user->wp_user_id,
            'user_email' => $data['email'] ?? null,
        ]);

        if (is_wp_error($wp_user)) {
            return new \WP_REST_Response([
                'message' => $wp_user->get_error_message(),
            ], 500);
        }

        $client->update([
            'organization' => $data['organization'],
            'image_url'    => $data['image_url'],
        ]);

        return new \WP_REST_Response([
            'message' => 'Client updated successfully.',
        ], 200);
    }

}