<?php

namespace WpClientManagement\API\Statuses;

use WpClientManagement\Models\Status;

class UpdateStatus {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/status/update/(?P<id>\d+)';

    protected array $rules = [
        'name' => 'required|string',
        'type' => 'nullable|string'
    ];

    protected array $validationMessages = [
        'name.required' => 'The name field is required.',
        'name.string' => 'The name field must be a string.',
        'type.string' => 'The type field must be a string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_status'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_status(\WP_REST_Request $request) {
        global $validator;

        $id = intval($request->get_param('id'));
        $data = $request->get_params();

        $data['name'] = sanitize_text_field($data['name'] ?? '');
        $data['type'] = sanitize_text_field($data['type'] ?? '');

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $status = Status::find($id);

        if (!$status) {
            return new \WP_REST_Response([
                'message' => 'Status not found.',
            ], 404);
        }

        $status->update([
            'name' => $data['name'],
            'type' => $data['type'],
        ]);

        return new \WP_REST_Response([
            'message' => 'Status updated successfully.',
            'status' => $status,
        ], 200);
    }
}