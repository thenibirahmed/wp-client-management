<?php

namespace WpClientManagement\API\Priorities;

use WpClientManagement\Models\Priority;

class SelectPriority {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/select/(?P<type>[a-zA-Z0-9_-]+)/priority';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'select_priority'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function select_priority(\WP_REST_Request $request)
    {
        $type = $request->get_param('type');

        $projectPriorities = Priority::getPriorities(Priority::TYPES[$type]);

        $data = [];
        foreach ($projectPriorities as $priority) {
            $data[] = [
                'id' => $priority->id,
                'name' => $priority->name
            ];
        }

        return new \WP_REST_Response([
            'priorities' => $data
        ]);
    }
}