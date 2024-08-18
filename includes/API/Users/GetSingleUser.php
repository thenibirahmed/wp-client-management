<?php
namespace WpClientManagement\API\Users;

use WpClientManagement\Models\User;

class GetSingleUser {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/user/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:users,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The user ID is required.',
        'id.integer' => 'The user ID must be an integer.',
        'id.exists' => 'The user does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_single_user'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_user(\WP_REST_Request $request) {
        global $validator;

        $user_id = $request->get_param('id');

        if(!isset($user_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $user_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $user = User::find($data['id']);

        if(!$user) {
            return new \WP_REST_Response([
                'error' => 'No User found',
            ]);
        }

        $response = [
            'data' => $user,
        ];

        return new \WP_REST_Response($response);
    }
}