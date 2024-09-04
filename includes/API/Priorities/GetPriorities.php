<?php

namespace WpClientManagement\API\Priorities;

use WpClientManagement\Models\Priority;

class GetPriorities {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/priorities';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_priorities'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_priorities(\WP_REST_Request $request) {

        $page = $request->get_params('page');

        $priorities = Priority::paginate(5, ['*'], 'page', $page);

        $data = [];
        foreach ($priorities as $priority) {
            $data[] = [
                'id' => $priority->id,
                'name' => $priority->name,
                'type' => $priority->type,
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $priorities->total(),
                'per_page' => $priorities->perPage(),
                'current_page' => $priorities->currentPage(),
                'last_page' => $priorities->lastPage(),
                'next_page_url' => $priorities->nextPageUrl(),
                'prev_page_url' => $priorities->previousPageUrl(),
            ],
        ]);
    }
}