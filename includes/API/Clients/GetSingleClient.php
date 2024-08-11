<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;

class GetSingleClient {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/client/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:clients,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The client ID is required.',
        'id.integer' => 'The client ID must be an integer.',
        'id.exists' => 'The client does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_single_client'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_client(\WP_REST_Request $request) {
        global $validator;

        $client_id = $request->get_param('id');

        if(!isset($client_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $client_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $client = Client::find($data['id']);

        if(!$client) {
            return new \WP_REST_Response([
                'error' => 'No Client found',
            ]);
        }

        $user = get_user_by('id', $client->eic_crm_user_id);

        $response = [
            'data' => [
                'phone' => $user->phone,
                'address' => $user->address,
                'city' => $user->city,
                'state' => $user->state,
                'zip' => $user->zip,
                'country' => $user->country,
                'role' => $user->role,
                'organization' => $client->organization,
                'designnation' => $client->designation,
                'status' => $client->status
            ],
        ];

        return new \WP_REST_Response($response);
    }
}