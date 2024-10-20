<?php

namespace WpClientManagement\API\Contacts;

use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Project;

class UpdateTeamMember {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/team-member/update/(?P<id>\d+)';

    protected function rules($memberId) {
        return [
            'name'         => 'required|string|unique:users,user_login,' . $memberId,
            'email'        => 'required|email|unique:users,user_email,' . $memberId,
            'phone'        => 'nullable|string',
            'designation'  => 'nullable|string',
            'phone'        => 'nullable|string',
            'address'      => 'nullable|string',
            'city'         => 'nullable|string',
            'state'        => 'nullable|string',
            'zip'          => 'nullable|string',
            'country'      => 'nullable|string',
        ];
    }

    protected array $validationMessages = [
        'name.required'       => 'The name is required.',
        'name.unique'         => 'The user name already exists.',
        'email.required'      => 'The email is required.',
        'email.email'         => 'The email must be a valid email.',
        'email.unique'        => 'The user email already exists.',
        'phone.string'        => 'The phone number must be a valid string.',
        'designation.string'  => 'The designation must be a valid string.',
        'phone.string'        => 'The phone number must be a valid string.',
        'address.string'      => 'The address must be a valid string.',
        'city.string'         => 'The city must be a valid string.',
        'state.string'        => 'The state must be a valid string.',
        'zip.string'          => 'The zip must be a valid string.',
        'country.string'      => 'The country must be a valid string.',
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
        $data['designation']  = isset($data['designation']) ? sanitize_text_field($data['designation']) : '';
        $data['address']      = isset($data['address']) ? sanitize_text_field($data['address']) : '';
        $data['city']         = isset($data['city']) ? sanitize_text_field($data['city']) : '';
        $data['state']        = isset($data['state']) ? sanitize_text_field($data['state']) : '';
        $data['zip']          = isset($data['zip']) ? sanitize_text_field($data['zip']) : '';
        $data['country']      = isset($data['country']) ? sanitize_text_field($data['country']) : '';
        $data['projectIds']   = isset($data['projectIds']) ? $data['projectIds'] : [];

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
            'address'      => $data['address'],
            'city'         => $data['city'],
            'state'        => $data['state'],
            'zip'          => $data['zip'],
            'country'      => $data['country'],
        ]);

        if (isset($data['name']) || isset($data['email'])) {

            if (!empty($data['name'])) {
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
            }

            $wp_user_data = [
                'ID' => $eic_crm_user->wp_user_id,
                'user_email' => $data['email'] ?? null,
            ];

            $wp_user = wp_update_user($wp_user_data);

            if (is_wp_error($wp_user)) {
                return new \WP_REST_Response([
                    'message' => $wp_user->get_error_message(),
                ]);
            }
        }

        $activeProjects = Project::getActiveProjects();
        $projectIds = $activeProjects->pluck('id')->toArray();
        if(isset($data['projectIds'])) {
            $validateProjectIds = array_filter($data['projectIds'], function ($id) use ($projectIds) {
                return in_array($id, $projectIds);
            });

            $eic_crm_user->assignedProjects()->sync($validateProjectIds ?? []);
        }

        return new \WP_REST_Response([
            'message' => 'Team member updated successfully.',
        ], 200);
    }

}