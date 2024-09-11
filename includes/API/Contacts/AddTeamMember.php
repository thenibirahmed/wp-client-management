<?php
namespace WpClientManagement\API\Contacts;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;

class AddTeamMember {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/team-member/create';

    protected array $rules = [
        'name'        => 'required|string|unique:users,user_login',
        'email'       => 'required|email|unique:users,user_email',
        'phone'       => 'required|string',
        'designation' => 'required|string',
    ];

    protected array $validationMessages = [
        'name.required'        => 'The name is required.',
        'name.unique'          => 'The user name already exists.',
        'email.required'       => 'The email is required.',
        'email.email'          => 'The email must be a valid email.',
        'email.unique'         => 'The user email already exists.',
        'phone.required'       => 'The phone is required.',
        'phone.string'         => 'The phone number must be a valid string.',
        'designation.required' => 'The designation is required.',
        'designation.string'   => 'The phone designation must be a valid string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_team_member'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function create_team_member(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();

        $data['name']        = sanitize_user($data['name'], true);
        $data['email']       = sanitize_email($data['email']);
        $data['phone']       = sanitize_text_field($data['phone']);
        $data['designation'] = sanitize_text_field($data['designation']);

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
                'message' => $wp_user->get_error_message(),
            ]);
        }

        $wp_user = get_userData($wp_user_id);

        $eic_crm_user_data = array(
            'wp_user_id' => intval($wp_user_id),
            'phone'      => $data['phone'],
            'designation' => $data['designation'],
            'role'       => 'admin',
        );

        $eic_crm_user = EicCrmUser::create($eic_crm_user_data);

        if(!$eic_crm_user) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        $member_response_data = [
            'name'        => $wp_user->user_login,
            'email'       => $wp_user->user_email,
            'phone'       => $eic_crm_user->phone,
            'designation' => $eic_crm_user->designation,
        ];

        return new \WP_REST_Response([
            'message' => 'Team member added successfully.',
            'client'  => $member_response_data,
        ], 201);
    }

}