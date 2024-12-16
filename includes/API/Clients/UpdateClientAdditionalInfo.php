<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;

class UpdateClientAdditionalInfo {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/client/additional-info/update/(?P<id>\d+)';

    protected array $rules = [
        'id'          => 'required|integer|exists:eic_clients,id',
        'description' => 'required|string',
    ];

    protected array $validationMessages = [
        'id.required'    => 'The client ID is required.',
        'id.integer'     => 'The client ID must be an integer.',
        'id.exists'      => 'The client does not exist.',
        'title.required' => 'The description is required.',
        'title.string'   => 'The description must be a string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::EDITABLE,
            'callback' => array($this, 'update_client_additional_info'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_client_additional_info(\WP_REST_Request $request) {
        global $validator;

        $client_id  = intval($request->get_param('id'));
        $data = $request->get_params();

        $data['description'] = isset($data['description']) ? sanitize_text_field($data['description']) : null;

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

        $client->update([
            'description' => $data['description'],
        ]);
        $client->refresh();

        $response = [
            'client' => $client
        ];

        return new \WP_REST_Response($response);
    }
}