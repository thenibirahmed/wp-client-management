<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;

class GetSingleClient {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/client/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_clients,id',
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

        $eic_crm_user = EicCrmUser::find($client->eic_crm_user_id);
        $user = get_user_by('id', $client->eic_crm_user_id);

        if (!$user || !$eic_crm_user) {
            return new \WP_REST_Response([
                'error' => 'Related User or EicCrmUser data not found.',
            ]);
        }

        $response = [
            'data' => [
                'name' => $user->user_login,
                'email' => $user->user_email,
                'phone' => $eic_crm_user->phone,
                'address' => $eic_crm_user->address,
                'city' => $eic_crm_user->city,
                'state' => $eic_crm_user->state,
                'zip' => $eic_crm_user->zip,
                'country' => $eic_crm_user->country,
                'role' => $eic_crm_user->role,
                'organization' => $client->organization,
                'designnation' => $client->designation,
                'status' => $client->status,
                'projects' => $client->projects,
                'invoices' => $client->invoices
            ],
        ];

        return new \WP_REST_Response($response);
    }
}