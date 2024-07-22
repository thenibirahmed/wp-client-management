<?php 

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;

class GetClients {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/clients';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_clients'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_clients(\WP_REST_Request $request) {
        $page = $request->get_params('page');

        $clients = Client::paginate(20, ['*'], 'page', $page);

        $wpUsers = get_users([
            'id' => $clients->pluck('id'),
        ]);

        $data = [];
        foreach ($clients as $client) {
            $wpUser = $this->getUserFromArrayByID($wpUsers, $client->id);
            $data[] = [
                'id' => $client->id,
                'organization' => $client->organization,
                'designation' => $client->designation,
                'status' => $client->designation,
            ];
        }

        return new \WP_REST_Response([
            'data' => $wpUsers,
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

    private function getUserFromArrayByID($users, $id)
    {
        return array_filter($users, function($user) use ($id) {
            return $id == $user->ID;
        });
    }
}