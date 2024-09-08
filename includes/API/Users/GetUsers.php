<?php

namespace WpClientManagement\API\Users;

use WpClientManagement\Models\User;

class GetUsers {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/users';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_users'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_users(\WP_REST_Request $request) {
        $page = $request->get_params('page');

        $users = User::paginate(5, ['*'], 'page', $page);

        $data = [];
        foreach ($users as $user) {
            $data[] = [
                'id' => $user->ID,
                'username' => $user->user_login,
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $users->total(),
                'per_page' => $users->perPage(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'next_page_url' => $users->nextPageUrl(),
                'prev_page_url' => $users->previousPageUrl(),
            ],
        ]);
    }
}