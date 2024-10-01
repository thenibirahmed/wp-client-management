<?php

namespace WpClientManagement\API\TeamMembers;

use WpClientManagement\Models\EicCrmUser;

class TeamMembersBulkDelete {

    private $namespace = 'wp-client-management/v1';
    private $endpoint = '/team-members/bulk-delete';

    protected array $rules = [
        'bulk_ids' => 'required|array',
    ];

    protected array $validationMessages = [
        'bulk_ids.required'  => 'The bulk IDs are required.',
        'bulk_ids.array'     => 'The bulk IDs must be an array.',
        'bulk_ids.*.integer' => 'The bulk IDs must be integers.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::DELETABLE,
            'callback' => [$this, 'bulk_delete_team_members'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function bulk_delete_team_members(\WP_REST_Request $request) {

        require_once(ABSPATH . 'wp-admin/includes/user.php');

        global $validator;

        $bulk_ids = is_string($request->get_param('bulk_ids')) ? explode(',', $request->get_param('bulk_ids')) : $request->get_param('bulk_ids');
        $bulk_ids = array_map('intval', $bulk_ids);

        $data = [];
        $data['bulk_ids'] = isset($bulk_ids) ? $bulk_ids : [];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);
        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        if (empty($bulk_ids)) {
            return new \WP_REST_Response([
                'message' => 'No IDs provided for deletion.',
            ], 400);
        }

        $team_members = EicCrmUser::whereIn('id', $bulk_ids)
                                ->whereHas('wp_user')
                                ->get();

        if ($team_members->isEmpty()) {
            return new \WP_REST_Response([
                'message' => 'No team members found.',
            ], 404);
        }

        try {
            foreach ($team_members as $member) {
                wp_delete_user($member->wp_user_id);
                $member->delete();
            }
        } catch (\Exception $e) {
            return new \WP_REST_Response([
                'message' => 'An error occurred while deleting team members.',
                'error'   => $e->getMessage(),
            ], 500);
        }

        return new \WP_REST_Response([
            'message' => 'Team members deleted successfully.',
        ], 200);
    }
}