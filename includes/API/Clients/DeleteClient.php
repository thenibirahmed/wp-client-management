<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;

class DeleteClient {

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
            'methods' => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_client'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function delete_client(\WP_REST_Request $request) {
        global $validator;

        $client_id = $request->get_param('id');

        $data = ['id' => $client_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $client = Client::find($client_id);

        if (!$client) {
            return new \WP_REST_Response([
                'message' => 'Client not found.',
            ], 404);
        }

        $client->delete();

        return new \WP_REST_Response([
            'message' => 'Client deleted successfully.',
        ], 200);
    }
}