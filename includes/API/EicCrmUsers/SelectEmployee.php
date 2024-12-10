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
            $meta = get_user_meta($user->ID);
            
            if(
                (is_null($meta['first_name'][0]) || $meta['first_name'][0] === '')
                && (is_null($meta['last_name'][0]) || $meta['last_name'][0] === '')
            ) {
                $name = "{$meta['nickname'][0]}";
            } else {
                if(is_null($meta['nickname'][0]) || $meta['nickname'][0] === '') {
                    $name = "{$meta['first_name'][0]} {$meta['last_name'][0]}";
                } else {
                    $name = "{$meta['first_name'][0]} {$meta['last_name'][0]} ({$meta['nickname'][0]})";
                }
            }

            $wpUsers[$user->ID] = [
                'name'  => $name,
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
        error_log(json_encode($employeeWithDetails));

        return new \WP_REST_Response([
            'employee' => $employeeWithDetails
        ]);
    }
}