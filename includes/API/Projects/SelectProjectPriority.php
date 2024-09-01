<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Priority;

class SelectProjectPriority {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/select-project-priority';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'select_priority_for_project'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function select_priority_for_project()
    {
        $projectPriorities = Priority::getPriorities(Priority::TYPES['project']);

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