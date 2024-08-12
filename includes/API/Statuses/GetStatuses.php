<?php

namespace WpClientManagement\API\Statuses;

use WpClientManagement\Models\Status;

class GetStatuses {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/statuses';

    protected array $rules = [
        'name' => 'required|string',
        'type' => 'required|string'
    ];

    protected array $validationMessages = [
        'name.required' => 'The name field is required.',
        'name.string' => 'The name must be a string.',
        'type.required' => 'The type field is required.',
        'type.string' => 'The type must be a string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_statuses'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_statuses(\WP_REST_Request $request) {
        $page = $request->get_params('page');

        $statuses = Status::paginate(20, ['*'], 'page', $page);

        $data = [];
        foreach ($statuses as $status) {
            $data[] = [
                'id' => $status->ID,
                'name' => $status->name,
                'type' => $status->type,
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $statuses->ftotal(),
                'per_page' => $statuses->perPage(),
                'current_page' => $statuses->currentPage(),
                'last_page' => $statuses->lastPage(),
                'next_page_url' => $statuses->nextPageUrl(),
                'prev_page_url' => $statuses->previousPageUrl(),
            ],
        ]);
    }
}