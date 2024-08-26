<?php
namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;

class CreateClient {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/client/create';

    protected array $rules = [
        'wp_user_id' => 'nullable|integer',
        'phone' => 'nullable|string',
        'address' => 'nullable|string',
        'city' => 'nullable|string',
        'state' => 'nullable|string',
        'zip' => 'nullable|string',
        'country' => 'nullable|string',
        'role' => 'nullable|string',
        'organization' => 'nullable|string',
        'designation' => 'nullable|string',
        'status' => 'nullable|string',
    ];

    protected array $validationMessages = [
        'wp_user_id.integer' => 'The wp_user_id must be an integer.',
        'phone.string' => 'The phone number must be a valid string.',
        'address.string' => 'The address must be a valid string.',
        'city.string' => 'The city must be a valid string.',
        'state.string' => 'The state must be a valid string.',
        'zip.string' => 'The zip code must be a valid string.',
        'country.string' => 'The country must be a valid string.',
        'role.string' => 'The role must be a valid string.',
        'organization.string' => 'The organization must be a string.',
        'designation.string' => 'The designation must be a string.',
        'status.string' => 'The status must be a string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_client'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function create_client(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();
        
        $data['user_login']   = sanitize_user($data['user_login'], true);
        $data['user_email']   = sanitize_email($data['user_email']);
        $data['user_pass']    = sanitize_text_field($data['user_pass']);
        $data['phone']        = sanitize_text_field($data['phone']);
        $data['address']      = sanitize_text_field($data['address']);
        $data['city']         = sanitize_text_field($data['city']);
        $data['state']        = sanitize_text_field($data['state']);
        $data['zip']          = sanitize_text_field($data['zip']);
        $data['country']      = sanitize_text_field($data['country']);
        $data['role']         = sanitize_text_field($data['role']);
        $data['organization'] = sanitize_text_field($data['organization']);
        $data['designation']  = sanitize_text_field($data['designation']);
        $data['status']       = sanitize_text_field($data['status']);

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $wp_user_data = array(
            'user_login'    => $data['user_login'],
            'user_email'    => $data['user_email'],
            'user_pass'     => $data['user_pass'],
        );

        $wp_user = wp_insert_user($wp_user_data);

        if (is_wp_error($wp_user)) {
            return new \WP_REST_Response([
                'message' => $wp_user->get_error_message(),
            ]);
        }

        return new \WP_REST_Response([
            'user' => "Working till now.",
        ], 201);

        $eic_crm_user_data = array(
            'wp_user_id' => $wp_user,
            'phone' => $data['phone'],
            'address' => $data['address'],
            'city' => $data['city'],
            'state' => $data['state'],
            'zip' => $data['zip'],
            'country' => $data['country'],
            'role' => $data['role'],
        );

        $eic_crm_user = EicCrmUser::create($eic_crm_user_data);

        if(!$eic_crm_user) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        $client_data = array(
            'eic_crm_user_id' => $eic_crm_user->id,
            'organization' => $data['organization'],
            'designation' => $data['designation'],
            'status' => $data['status'],
        );

        $client = Client::create($client_data);

        if(!$client) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        return new \WP_REST_Response([
            'message' => 'Client created successfully.',
            'client' => $client,
        ], 201);
    }

}