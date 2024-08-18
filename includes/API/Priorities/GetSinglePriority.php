<?php

namespace WpClientManagement\API\Priorities;

use WpClientManagement\Models\Priority;

class GetSinglePriority {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/priority/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_priorities,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The priority ID is required.',
        'id.integer' => 'The priority ID must be an integer.',
        'id.exists' => 'The priority does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_single_priority'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_priority(\WP_REST_Request $request) {
        global $validator;

        $priority_id = $request->get_param('id');

        if(!isset($priority_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $priority_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $priority = Priority::find($data['id']);

        if(!$priority) {
            return new \WP_REST_Response([
                'error' => 'No Priority found',
            ]);
        }

        $response = [
            'data' => $priority,
        ];

        return new \WP_REST_Response($response);
    }
}