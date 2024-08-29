<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;

class GetClients {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/clients';

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_clients'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_clients(\WP_REST_Request $request)
    {
        $page = $request->get_params('page');

        $clients = Client::paginate(20, ['*'], 'page', $page);

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

        $clientsWithDetails = $clients->map(function ($client) use ($wpUsers) {
            $eicCrmUser = $client->eic_crm_user;
            $wpUserId   = $eicCrmUser->wp_user_id;
            $wpUser     = $wpUsers[$wpUserId] ?? [];

            return [
                'id'           => $client->id,
                'name'         => $wpUser['name'] ?? null,
                'email'        => $wpUser['email'] ?? null,
                'phone'        => $eicCrmUser->phone,
                'address'      => $eicCrmUser->address,
                'city'         => $eicCrmUser->city,
                'state'        => $eicCrmUser->state,
                'country'      => $eicCrmUser->country,
                'zip'          => $eicCrmUser->zip,
                'designation'  => $eicCrmUser->designation,
                'organization' => $client->organization,
            ];
        });

        return new \WP_REST_Response([
            'data' => $clientsWithDetails,
            'pagination' => [
                'total'         => $clients->total(),
                'per_page'      => $clients->perPage(),
                'current_page'  => $clients->currentPage(),
                'last_page'     => $clients->lastPage(),
                'next_page_url' => $clients->nextPageUrl(),
                'prev_page_url' => $clients->previousPageUrl(),
            ],
        ]);
    }
}