<?php
namespace WpClientManagement\API\Auth;

use WpClientManagement\Middlewares\AuthMiddleware;
use WpClientManagement\Models\EicCrmUser;

class Login {

    private $namespace = 'wp-client-management/v1';
    private $endpoint = '/login';

    protected array $rules = [
        'username' => 'required|string',
        'password' => 'required|string',
        'remember' => 'boolean',
    ];

    protected array $validationMessages = [
        'username.required' => 'Username is required',
        'password.required' => 'Password is required',
        'username.string'   => 'Username must be a string',
        'password.string'   => 'Password must be a string',
        'remember.boolean'  => 'Remember must be a boolean',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'login'),
            'permission_callback' => [AuthMiddleware::class, 'guest'],
        ]);
    }

    public function login(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();

        $data['username'] = isset($data['username']) ? sanitize_text_field($data['username']) : '';
        $data['password'] = isset($data['password']) ? trim($data['password']) : '';
        $data['remember'] = isset($data['remember']) ? (bool)$data['remember'] : false;

        // Validate input data
        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $credentials = [
            'user_login'    => $data['username'],
            'user_password' => $data['password'],
            'remember'      => $data['remember'],
        ];

        $user = wp_signon($credentials, is_ssl());

        if (is_wp_error($user)) {
            return new \WP_REST_Response([
                'error' => 'Invalid username or password',
            ], 401);
        }

        wp_set_auth_cookie($user->ID, $data['remember']);
        wp_set_current_user($user->ID);

        return new \WP_REST_Response([
            'message' => 'Login successful',
            'user'    => [
                'id'       => $user->ID,
                'username' => $user->user_login,
                'email'    => $user->user_email,
            ]
        ], 201);
    }
}