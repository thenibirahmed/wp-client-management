<?php

namespace WpClientManagement\API\Contacts;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;

class UpdateTeamMember {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/team-member/update/(?P<id>\d+)';

    protected function rules($memberId) {
        return [
            'name'         => 'required|string|unique:users,user_login,' . $memberId,
            'email'        => 'required|email|unique:users,user_email,' . $memberId,
            'phone'        => 'nullable|string',
            'designation'  => 'nullable|string'
        ];
    }

    protected array $validationMessages = [
        'name.required'       => 'The name is required.',
        'name.unique'         => 'The user name already exists.',
        'email.required'      => 'The email is required.',
        'email.email'         => 'The email must be a valid email.',
        'email.unique'        => 'The user email already exists.',
        'phone.string'        => 'The phone number must be a valid string.',
        'designation.string'  => 'The designation must be a valid string.'
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
        $id   = $request->get_param('id');

        $data['name']         = isset($data['name']) ? sanitize_text_field($data['name']) : '';
        $data['email']        = isset($data['email']) ? sanitize_email($data['email']) : '';
        $data['phone']        = isset($data['phone']) ? sanitize_text_field($data['phone']) : '';
        $data['designation']  = isset($data['designation']) ? sanitize_text_field($data['designation']) : '';

        $eic_crm_user = EicCrmUser::find($id);

        if (!$eic_crm_user) {
            return new \WP_REST_Response([
                'errors' => 'Team member data not found.',
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
            'designation'  => $data['designation'],
        ]);

        if (isset($data['name']) || isset($data['email'])) {

            $wp_user = wp_update_user(array(
                'ID' => $eic_crm_user->wp_user_id,
                'user_login' => $data['name'] ?? null,
                'user_email' => $data['email'] ?? null,
            ));

            if (is_wp_error($wp_user)) {
                return new \WP_REST_Response([
                    'message' => $wp_user->get_error_message(),
                ]);
            }
        }

        return new \WP_REST_Response([
            'message' => 'Team member updated successfully.',
        ], 200);
    }

}