<?php

namespace WpClientManagement\API\Priorities;

use WpClientManagement\Models\Priority;

class DeletePriority {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/priorities/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:priorities,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The Priority ID is required.',
        'id.integer' => 'The Priority ID must be an integer.',
        'id.exists' => 'The Priority does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_priority'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function delete_priority(\WP_REST_Request $request) {
        global $validator;

        $priority_id = $request->get_param('id');

        $data = ['id' => $priority_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $priority = Priority::find($priority_id);

        if (!$priority) {
            return new \WP_REST_Response([
                'message' => 'Priority not found.',
            ], 404);
        }

        $priority->delete();

        return new \WP_REST_Response([
            'message' => 'Priority deleted successfully.',
        ], 200);
    }
}