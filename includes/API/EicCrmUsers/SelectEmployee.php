<?php

namespace WpClientManagement\API\EicCrmUsers;

use WpClientManagement\Models\EicCrmUser;

class SelectEmployee {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/select-employee';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'select_employee'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function select_employee()
    {
        $employees = EicCrmUser::getEmployee();

        $wp_user_ids = $employees->pluck('wp_user_id')->toArray();

        $wpUsersDb = get_users([
            'include' => $wp_user_ids,
        ]);

        $wpUsers = [];
        foreach ($wpUsersDb as $user) {
            $wpUsers[$user->ID] = [
                'name'  => $user->user_login,
            ];
        }

        $employeeWithDetails = $employees->map(function ($employee) use ($wpUsers) {
            $wp_user_id = $employee->wp_user_id;
            $wp_user    = $wpUsers[$wp_user_id] ?? null;

            return [
                'id'   => $employee->id,
                'name' => $wp_user['name'] ?? null
            ];
        });

        return new \WP_REST_Response([
            'employee' => $employeeWithDetails
        ]);
    }
}