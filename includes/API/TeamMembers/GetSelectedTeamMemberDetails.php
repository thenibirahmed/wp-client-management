<?php

namespace WpClientManagement\API\TeamMembers;

use WpClientManagement\Models\EicCrmUser;

class GetSelectedTeamMemberDetails{

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/team-member/(?P<id>\d+)/details';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'selected_team_member_details'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function selected_team_member_details(\WP_REST_Request $request)
    {
        $id = $request->get_param('id');

        if(!$id) {
            return new \WP_REST_Response([
                'error' => 'Id param required',
            ]);
        }

        $employees = EicCrmUser::getTeamMembers(false);
        $employee = $employees->where('id', $id)->first();

        if(!$employee) {
            return new \WP_REST_Response([
                'error' => 'No Employee found',
            ]);
        }

        $wp_user = get_user_by('id',$employee->wp_user_id);

        if(!$wp_user) {
            return new \WP_REST_Response([
                'error' => 'User data not found',
            ]);
        }

        $assignedProjects = $employee->assignedProjects->pluck('id')->toArray();

        return new \WP_REST_Response([
            'employee_details' => [
                'id'          => $employee->id,
                'address'     => $employee->address,
                'city'        => $employee->city,
                'state'       => $employee->state,
                'zip'         => $employee->zip,
                'country'     => $employee->country,
                'designation' => $employee->designation,
                'phone'       => $employee->phone,
                'name'        => $wp_user->user_login,
                'email'       => $wp_user->user_email,
                'project_ids' => $assignedProjects
            ]
            ]);

    }
}