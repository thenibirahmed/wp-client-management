<?php

namespace WpClientManagement\API\Users;

use WpClientManagement\Models\User;

class DeleteUser {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/users/(?P<id>\d+)';

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
            'methods' => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_user'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function delete_user(\WP_REST_Request $request) {
        global $validator;

        $user_id = $request->get_param('id');

        $data = ['id' => $user_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $user = User::find($user_id);

        if (!$user) {
            return new \WP_REST_Response([
                'message' => 'User not found.',
            ], 404);
        }

        $user->delete();

        return new \WP_REST_Response([
            'message' => 'User deleted successfully.',
        ], 200);
    }
}