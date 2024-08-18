<?php

namespace WpClientManagement\API\Statuses;

use WpClientManagement\Models\Status;

class CreateStatus {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/status/create';

    protected array $rules = [
        'name' => 'required|string',
        'type' => 'nullable|string'
    ];

    protected array $validationMessages = [
        'name.required' => 'The name field is required.',
        'name.string' => 'The name field must be string.',
        'type.string' => 'The type field must be string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_status'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function create_status(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();

        $data['name'] = sanitize_text_field($data['name'] ?? '');
        $data['type'] = sanitize_text_field($data['type'] ?? '');

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $status = Status::create([
            'name' => $data['name'],
            'type' => $data['type'],
        ]);

        if(!$status) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        return new \WP_REST_Response([
            'message' => 'Status created successfully.',
            'status' => $status,
        ], 201);
    }
}