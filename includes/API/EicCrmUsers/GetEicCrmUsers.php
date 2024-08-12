<?php

namespace WpClientManagement\API\EicCrmUsers;

use WpClientManagement\Models\EicCrmUser;

class GetEicCrmUsers {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/eic-crm-users';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_eic_crm_users'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_eic_crm_users(\WP_REST_Request $request) {

        $page = $request->get_params('page');

        $eic_crm_users = EicCrmUser::paginate(20, ['*'], 'page', $page);

        $data = [];
        foreach ($eic_crm_users as $eic_crm_user) {
            $data[] = [
                'id' => $eic_crm_user->ID,
                'phone' => $eic_crm_user->phone,
                'address' => $eic_crm_user->address,
                'city' => $eic_crm_user->city,
                'state' => $eic_crm_user->state,
                'zip' => $eic_crm_user->zip,
                'country' => $eic_crm_user->country,
                'role' => $eic_crm_user->role
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $eic_crm_users->total(),
                'per_page' => $eic_crm_users->perPage(),
                'current_page' => $eic_crm_users->currentPage(),
                'last_page' => $eic_crm_users->lastPage(),
                'next_page_url' => $eic_crm_users->nextPageUrl(),
                'prev_page_url' => $eic_crm_users->previousPageUrl(),
            ],
        ]);
    }
}