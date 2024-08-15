<?php

namespace WpClientManagement\API\EicCrmUsers;

use WpClientManagement\Models\EicCrmUser;

class DeleteCrmUser {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/eic-crm-user/delete/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_eic_crm_users,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The eic_crm_user ID is required.',
        'id.integer' => 'The eic_crm_user ID must be an integer.',
        'id.exists' => 'The eic_crm_user does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_crm_user'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function delete_crm_user(\WP_REST_Request $request) {
        global $validator;

        require_once(ABSPATH . 'wp-admin/includes/user.php');

        $crm_user_id = $request->get_param('id');

        $data = ['id' => $crm_user_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $crm_user = EicCrmUser::find($crm_user_id);

        if (!$crm_user) {
            return new \WP_REST_Response([
                'message' => 'Eic Crm User not found.',
            ], 404);
        }

        $user = get_user_by('id', $crm_user->wp_user_id);

        if ($user) {
            wp_delete_user($user->ID);
        }

        $crm_user->delete();

        return new \WP_REST_Response([
            'message' => 'Eic Crm User deleted successfully.',
        ], 200);
    }
}