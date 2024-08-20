<?php
namespace WpClientManagement\API\Priorities;

use WpClientManagement\Models\Priority;

class CreatePriority{

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/priority/create';

    protected array $rules = [
        'name' => 'required|string',
    ];

    protected array $validationMessages = [
        'name.required' => 'The name field is required.',
        'name.string' => 'The name field must be string.'
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_priority'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function create_priority(\WP_REST_Request $request) {
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

        $priority = Priority::create([
            'name' => $data['name'],
            'type' => $data['type'],
        ]);

        if(!$priority) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        return new \WP_REST_Response([
            'message' => 'Priority created successfully.',
            'priority' => $priority,
        ], 201);
    }
}