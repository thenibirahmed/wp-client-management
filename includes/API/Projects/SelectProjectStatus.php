<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Status;

class SelectProjectStatus {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/select-project-status';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'select_status_for_project'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function select_status_for_project()
    {
        $projectStatuses = Status::getStatuses(Status::TYPES['project']);

        $data = [];
        foreach ($projectStatuses as $status) {
            $data[] = [
                'id' => $status->id,
                'name' => $status->name
            ];
        }

        return new \WP_REST_Response([
            'statuses' => $data
        ]);
    }
}