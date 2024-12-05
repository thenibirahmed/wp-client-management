<?php
namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Role;
use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;

class CreateClient {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/client/create';

    protected array $rules = [
        'name'         => 'required|string|unique:users,user_login',
        'email'        => 'required|email|unique:users,user_email',
        'phone'        => 'nullable|string',
        'address'      => 'nullable|string',
        'city'         => 'nullable|string',
        'state'        => 'nullable|string',
        'zip'          => 'nullable|string',
        'country'      => 'nullable|string',
        'role'         => 'nullable|string',
        'organization' => 'nullable|string',
        'image_url'    => 'required|string',
        'status'       => 'nullable|string',
    ];

    protected array $validationMessages = [
        'name.required'       => 'The name is required.',
        'name.unique'         => 'The user name already exists.',
        'email.required'      => 'The email is required.',
        'email.email'         => 'The email must be a valid email.',
        'email.unique'        => 'The user email already exists.',
        'phone.string'        => 'The phone number must be a valid string.',
        'address.string'      => 'The address must be a valid string.',
        'city.string'         => 'The city must be a valid string.',
        'state.string'        => 'The state must be a valid string.',
        'zip.string'          => 'The zip code must be a valid string.',
        'country.string'      => 'The country must be a valid string.',
        'role.string'         => 'The role must be a valid string.',
        'organization.string' => 'The organization must be a string.',
        'image_url.string'    => 'The image url must be a string.',
        'status.string'       => 'The status must be a string.',
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

        $data['name']         = sanitize_user($data['name'], true);
        $data['email']        = sanitize_email($data['email']);
        $data['phone']        = isset($data['phone']) ? sanitize_text_field($data['phone']) : '';
        $data['address']      = isset($data['address']) ? sanitize_text_field($data['address']) : '';
        $data['city']         = isset($data['city']) ? sanitize_text_field($data['city']) : '';
        $data['state']        = isset($data['state']) ? sanitize_text_field($data['state']) : '';
        $data['zip']          = isset($data['zip']) ? sanitize_text_field($data['zip']) : '';
        $data['country']      = isset($data['country']) ? sanitize_text_field($data['country']) : '';
        $data['organization'] = isset($data['organization']) ? sanitize_text_field($data['organization']) : '';
        $data['image_url']    = isset($data['image_url']) ? sanitize_url($data['image_url']) : '';

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $wp_user_data = array(
            'user_login'    => $data['name'],
            'user_email'    => $data['email'],
            'user_pass'     => $data['name'],
        );

        $wp_user_id = wp_insert_user($wp_user_data);

        if (is_wp_error($wp_user_id)) {
            return new \WP_REST_Response([
                'message' => $wp_user_id->get_error_message(),
            ]);
        }

        $wp_user = get_userData($wp_user_id);

        $eic_crm_user_data = array(
            'wp_user_id'   => intval($wp_user->ID),
            'phone'        => $data['phone'],
            'address'      => $data['address'],
            'city'         => $data['city'],
            'state'        => $data['state'],
            'zip'          => $data['zip'],
            'country'      => $data['country'],
            'role_id'      => Role::where('name', 'client')->first()->id,
            'organization' => $data['organization'],
        );

        $eic_crm_user = EicCrmUser::create($eic_crm_user_data);

        if(!$eic_crm_user) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        $client_data = array(
            'eic_crm_user_id' => $eic_crm_user->id,
            'organization'    => $data['organization'],
            'image_url'       => $data['image_url'],
        );

        $client = Client::create($client_data);

        if(!$client) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        $client_response_data = [
            'name'         => $wp_user->user_login,
            'email'        => $wp_user->user_email,
            'phone'        => $eic_crm_user->phone,
            'address'      => $eic_crm_user->address,
            'country'      => $eic_crm_user->country,
            'city'         => $eic_crm_user->city,
            'state'        => $eic_crm_user->state,
            'zip'          => $eic_crm_user->zip,
            'organization' => $client->organization
        ];

        return new \WP_REST_Response([
            'message' => 'Client created successfully.',
            'client' => $client_response_data,
        ], 201);
    }

}