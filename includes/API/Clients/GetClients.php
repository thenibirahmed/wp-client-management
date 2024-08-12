<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;

class GetClients {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/clients';

    protected array $rules = [
        'eic_crm_user_id' => 'required|boolean',
        'organization' => 'nullable|string',
        'designation' => 'nullable|string',
        'status' => 'nullable'
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The eic_crm_user field is required.',
        'eic_crm_user_id.required' => 'The eic_crm_user_id must a integer.',
        'organization.string' => 'The organization must be a string.',
        'designation.string' => 'The designation must be a string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_clients'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_posts(\WP_REST_Request $request) {
        global $validator;

        $page = $request->get_params('page');

        $clients = Client::paginate(20, ['*'], 'page', $page);

        $data = [];
        foreach ($clients as $client) {
            $data[] = [
                'id' => $client->ID,
                'eic_crm_user' => $client->eic_crm_user->name,
                'organization' => $client->organization,
                'designation' => $client->designation,
                'status' => $client->status
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $client->total(),
                'per_page' => $client->perPage(),
                'current_page' => $client->currentPage(),
                'last_page' => $client->lastPage(),
                'next_page_url' => $client->nextPageUrl(),
                'prev_page_url' => $client->previousPageUrl(),
            ],
        ]);
    }
}