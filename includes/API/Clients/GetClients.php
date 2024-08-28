<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;

class GetClients {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/clients';

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

        $data = [];
        foreach ($clients as $client) {
            $data[] = [
                'id' => $client->id,
                'eic_crm_user' => $client->eic_crm_user,
                'organization' => $client->organization,
                'designation' => $client->designation,
                'status' => $client->status
            ];
        }
  
        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $clients->total(),
                'per_page' => $clients->perPage(),
                'current_page' => $clients->currentPage(),
                'last_page' => $clients->lastPage(),
                'next_page_url' => $clients->nextPageUrl(),
                'prev_page_url' => $clients->previousPageUrl(),
            ],
        ]);
    }
}