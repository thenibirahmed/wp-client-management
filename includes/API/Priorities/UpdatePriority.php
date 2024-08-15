<?php

namespace WpClientManagement\API\Priorities;

use WpClientManagement\Models\Priority;

class UpdatePriority {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/priority/update/(?P<id>\d+)';

    protected array $rules = [
        'name' => 'required|string',
    ];

    protected array $validationMessages = [
        'name.required' => 'The name field is required.',
        'name.string' => 'The name field must be string.'
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_priority'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_priority(\WP_REST_Request $request) {
        global $validator;
        $id = $request->get_param('id');
        $data = $request->get_params();

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $priority = Priority::find($id);

        if (!$priority) {
            return new \WP_REST_Response([
                'message' => 'Priority not found.',
            ], 404);
        }

        $priority->update([
            'name' => $data['name'],
            'type' => $data['type'],
        ]);

        return new \WP_REST_Response([
            'message' => 'Priority updated successfully.',
            'status' => $priority,
        ], 200);
    }
}