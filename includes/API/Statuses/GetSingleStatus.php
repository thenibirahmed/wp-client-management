<?php
namespace WpClientManagement\API\Statuses;

use WpClientManagement\Models\Status;

class GetSingleStatus {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/status/(?P<id>\d+)';

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
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_status'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_status(\WP_REST_Request $request) {
        global $validator;

        $status_id = $request->get_param('id');

        if(!isset($status_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $status_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $status = Status::find($data['id']);

        if(!$status) {
            return new \WP_REST_Response([
                'error' => 'No Status found',
            ]);
        }
        $response = [
            'data' => $status,
        ];

        return new \WP_REST_Response($response);
    }
}