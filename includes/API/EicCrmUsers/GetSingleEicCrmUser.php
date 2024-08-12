<?php

namespace WpClientManagement\API\EicCrmUsers;

use WpClientManagement\Models\EicCrmUser;

class GetSingleEicCrmUser {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/eic-crm-user/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_eic_crm_users,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The EicCrmUser ID is required.',
        'id.integer' => 'The EicCrmUser ID must be an integer.',
        'id.exists' => 'The EicCrmUser does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_crm_user'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_crm_user(\WP_REST_Request $request) {
        global $validator;

        $crm_user_id = $request->get_param('id');

        if(!isset($crm_user_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $crm_user_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $crm_user = EicCrmUser::find($data['id']);

        if(!$crm_user) {
            return new \WP_REST_Response([
                'error' => 'No EicCrmUser found',
            ]);
        }

        return new \WP_REST_Response([
            'data' => $crm_user,
        ]);

        $user = get_user_by('id',$crm_user->wp_user_id);

        $response = [
            'data' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $crm_user->phone,
                'address' => $crm_user->address,
                'city' => $crm_user->city,
                'state' => $crm_user->state,
                'zip' => $crm_user->zip,
                'country' => $crm_user->country,
                'role' => $crm_user->role,
            ],
        ];

        return new \WP_REST_Response($response);
    }
}