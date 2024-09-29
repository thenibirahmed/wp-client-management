<?php

namespace WpClientManagement\API\Contacts;

use WpClientManagement\Models\EicCrmUser;

class GetTeamMembers {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/team-members';

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_team_members'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_team_members(\WP_REST_Request $request)
    {
        $page        = $request->get_param('member');
        $search      = $request->get_param('search');

        $teamMembers = EicCrmUser::getTeamMembers($page, $search);

        $wp_user_ids = $teamMembers->pluck('wp_user_id')->toArray();

        $wpUsersDb   = get_users([
            'include' => $wp_user_ids,
        ]);

        $wpUsers = [];
        foreach ($wpUsersDb as $user) {
            $wpUsers[$user->ID] = [
                'name'  => $user->user_login,
                'email' => $user->user_email,
            ];
        }

        $teamMembersWithDetails = $teamMembers->map(function ($member) use ($wpUsers) {
            $wpUserId   = $member->wp_user_id;
            $wpUser     = $wpUsers[$wpUserId] ?? [];

            return [
                'id'           => $member->id,
                'name'         => $wpUser['name'] ?? null,
                'email'        => $wpUser['email'] ?? null,
                'phone'        => $member->phone,
                'designation'  => $member->designation,
                'created_date' => $member->created_at ? date('F d, Y', strtotime($member->created_at)) : null,
            ];
        });

        return new \WP_REST_Response([
            'team_members' => $teamMembersWithDetails,
            'pagination'   => [
                'total'         => $teamMembers->total(),
                'per_page'      => $teamMembers->perPage(),
                'current_page'  => $teamMembers->currentPage(),
                'last_page'     => $teamMembers->lastPage(),
                'next_page_url' => $teamMembers->nextPageUrl(),
                'prev_page_url' => $teamMembers->previousPageUrl(),
            ],
        ]);
    }
}