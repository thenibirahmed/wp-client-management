<?php
namespace WpClientManagement\API\EicCrmUsers;

use WpClientManagement\Models\EicCrmUser;

class UpdateEicCrmUser {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/eic-crm-user/update/(?P<id>\d+)';

    protected array $rules = [
        'wp_user_id'  => 'nullable|integer',
        'phone'       => 'nullable|string',
        'address'     => 'nullable|string',
        'city'        => 'nullable|string',
        'state'       => 'nullable|string',
        'zip'         => 'nullable|string',
        'country'     => 'nullable|string',
        'role'        => 'nullable|string',
        'designation' => 'nullable|string',
        'user_login'  => 'nullable|string',
        'user_email'  => 'nullable|email',
        'user_pass'   => 'nullable|string',
    ];

    protected array $validationMessages = [
        'wp_user_id.integer' => 'The wp_user_id must be an integer.',
        'phone.string'       => 'The phone number must be a valid string.',
        'address.string'     => 'The address must be a valid string.',
        'city.string'        => 'The city must be a valid string.',
        'state.string'       => 'The state must be a valid string.',
        'zip.string'         => 'The zip code must be a valid string.',
        'country.string'     => 'The country must be a valid string.',
        'role.string'        => 'The role must be a valid string.',
        'user_login.string'  => 'The user login must be a valid string.',
        'user_email.email'   => 'The user email must be a valid email address.',
        'user_pass.string'   => 'The user password must be a valid string.',
        'designation.string' => 'The designation must be a valid string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => array($this, 'update_eic_crm_user'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_eic_crm_user(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();
        $id   = $request->get_param('id');

        $eic_crm_user = EicCrmUser::find($id);

        if (!$eic_crm_user) {
            return new \WP_REST_Response([
                'message' => 'Eic Crm User not found',
            ], 404);
        }

        $data['user_login']  = sanitize_text_field($data['user_login']);
        $data['user_email']  = sanitize_email($data['user_email']);
        $data['user_pass']   = sanitize_text_field($data['user_pass']);
        $data['phone']       = sanitize_text_field($data['phone']);
        $data['address']     = sanitize_text_field($data['address']);
        $data['city']        = sanitize_text_field($data['city']);
        $data['state']       = sanitize_text_field($data['state']);
        $data['zip']         = sanitize_text_field($data['zip']);
        $data['country']     = sanitize_text_field($data['country']);
        $data['role']        = sanitize_text_field($data['role']);
        $data['designation'] = sanitize_text_field($data['designation']);

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        if (isset($data['user_login']) || isset($data['user_email']) || isset($data['user_pass'])) {
            $wp_user_data = [
                'ID' => $eic_crm_user->wp_user_id,
                'user_login' => $data['user_login'] ?? null,
                'user_email' => $data['user_email'] ?? null,
                'user_pass'  => $data['user_pass'] ?? null,
            ];

            $wp_user_data = array_filter($wp_user_data);

            $wp_user = wp_update_user($wp_user_data);

            if (is_wp_error($wp_user)) {
                return new \WP_REST_Response([
                    'message' => $wp_user->get_error_message(),
                ]);
            }
        }

        $updated = $eic_crm_user->update($data);

        if (!$updated) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        return new \WP_REST_Response([
            'message' => 'Eic Crm User updated successfully.',
            'eic_crm_user' => $eic_crm_user,
        ], 200);
    }
}