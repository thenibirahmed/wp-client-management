<?php

namespace WpClientManagement\API\Contacts;

use WpClientManagement\Models\EicCrmUser;

class DeleteTeamMember {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/team-member/delete/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_eic_crm_users,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The User ID is required.',
        'id.integer'  => 'The User ID must be an integer.',
        'id.exists'   => 'The User does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_team_member'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function delete_team_member(\WP_REST_Request $request) {
        require_once(ABSPATH . 'wp-admin/includes/user.php');

        global $validator;

        $crm_user_id = $request->get_param('id');

        $data      = ['id' => $crm_user_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $crm_user = EicCrmUser::find($crm_user_id);

        if (!$crm_user) {
            return new \WP_REST_Response([
                'message' => 'User not found.',
            ], 404);
        }

        $user = get_user_by('id', $crm_user->wp_user_id);

        if ($user) {
            wp_delete_user($user->ID);
        }

        $crm_user->delete();

        return new \WP_REST_Response([
            'message' => 'Team Member deleted successfully.',
        ], 200);
    }
}