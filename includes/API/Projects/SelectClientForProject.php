<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;

class SelectClientForProject {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/select-client';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'select_client_for_project'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function select_client_for_project()
    {
        $clients = Client::with('eic_crm_user')->get();

        $wp_user_ids = $clients->pluck('eic_crm_user.wp_user_id')->toArray();

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

        $clientWithDetails = $clients->map(function ($client) use ($wpUsers) {

            $wp_user_id = $client->eic_crm_user->wp_user_id;
            $wp_user = $wpUsers[$wp_user_id] ?? null;

            return [
                'id' => $client->id,
                'name' => $wp_user['name'] ?? null,
            ];
        });

        return new \WP_REST_Response([
            'data' => $clientWithDetails
        ]);
    }
}