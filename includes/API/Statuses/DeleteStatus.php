<?php

namespace WpClientManagement\API\Statuses;

use WpClientManagement\Models\Status;

class DeleteStatus {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/status/delete/(?P<id>\d+)';
    // private $endpoint = '/status/delete';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_statuses,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The status ID is required.',
        'id.integer' => 'The status ID must be an integer.',
        'id.exists' => 'The status does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_status'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function delete_status(\WP_REST_Request $request) {
        global $validator;
        $status_id = $request->get_param('id');

        $data = ['id' => $status_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }
        $status = Status::find($status_id);

        if (!$status) {
            return new \WP_REST_Response([
                'message' => 'Status not found.',
            ], 404);
        }

        $status->delete();

        return new \WP_REST_Response([
            'message' => 'Status deleted successfully.',
        ], 200);
    }
}