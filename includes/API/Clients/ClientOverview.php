<?php

namespace WpClientManagement\API\Clients; 

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class ClientOverview {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/client-overview';

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_clients_overview'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_clients_overview() {

        $clientsData = Client::getActiveClients();

        // $clientsData->first()->products_count;
    
        $wp_user_ids = $clientsData->pluck('eic_crm_user.wp_user_id')->toArray();
        
        $wpUsersDb = get_users([
            'include' => $wp_user_ids,
        ]);
        
        $wpUsers = [];
        foreach ($wpUsersDb as $user) {
            $wpUsers[$user->ID] = [
                'name'          => $user->user_login,
                'email'         => $user->user_email,
                'display_name'  => $user->display_name,
                'roles'         => $user->roles,
            ];
        }
        
        $clientsWithDetails = $clientsData->map(function ($client) use ($wpUsers) {
            $eicCrmUser = $client->eic_crm_user;
            $wpUserId = $eicCrmUser->wp_user_id;
            $wpUser = $wpUsers[$wpUserId] ?? [];
    
            return array_merge($client->toArray(), $eicCrmUser->toArray(), $wpUser);
        });

        $topBar = [
            [
                'name' => 'Total Invoice',
                'amount' => 16400,
                'subText' => '5 invoices'
            ],
            [
                'name' => 'Total Revenue',
                'amount' => 12400,
                'subText' => '3 invoices'
            ],
            [
                'name' => 'Total Due',
                'amount' => 4000,
                'subText' => '2 invoices'
            ],
            [
                'name' => 'Total Projects',
                'amount' => 5,
                'subText' => 'last 3 months'
            ]
        ];
    
        return new \WP_REST_Response([
            'topBar' => $topBar,
            'clients' => $clientsWithDetails,
        ]);
    }
    
}
