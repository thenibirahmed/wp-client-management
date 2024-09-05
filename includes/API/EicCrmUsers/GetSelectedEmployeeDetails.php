<?php

namespace WpClientManagement\API\EicCrmUsers;

use WpClientManagement\Models\EicCrmUser;

class GetSelectedEmployeeDetails{

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/employee/(?P<id>\d+)/details';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'selected_employee_details'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function selected_employee_details(\WP_REST_Request $request)
    {
        $id = $request->get_param('id');

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

        return new \WP_REST_Response([
            'employee_details' => [
                'id'      => $employee->id,
                'address' => $employee->address,
                'name'    => $wp_user->user_login,
                'email'   => $wp_user->user_email
            ]
            ]);

    }
}