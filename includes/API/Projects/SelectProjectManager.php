<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;

class SelectProjectManager {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/select-project-manager';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'select_project_manager'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function select_project_manager()
    {
        $managers = EicCrmUser::selectManager();

        $wp_user_ids = $managers->pluck('wp_user_id')->toArray();
        $wpUsersDb = get_users([
            'include' => $wp_user_ids,
        ]);

        $wpUsers = [];
        foreach ($wpUsersDb as $user) {
            $wpUsers[$user->ID] = [
                'name'  => $user->user_login,
                'email' => $user->user_email,
            ];
        }

        $managerWithDetails = $managers->map(function ($manager) use ($wpUsers) {

            $wp_user_id = $manager->wp_user_id;
            $wp_user = $wpUsers[$wp_user_id] ?? null;

            return [
                'id' => $manager->id,
                'name' => $wp_user['name'] ?? null
            ];
        });

        return new \WP_REST_Response([
            'data' => $managerWithDetails
        ]);
    }
}