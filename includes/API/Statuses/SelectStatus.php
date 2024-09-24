<?php

namespace WpClientManagement\API\Statuses;

use WpClientManagement\Models\Status;

class SelectStatus {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/select/(?P<type>[a-zA-Z0-9_-]+)/status';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'select_status'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function select_status(\WP_REST_Request $request)
    {
        $type = $request->get_param('type');

        $projectStatuses = Status::getStatuses(Status::TYPES[$type]);

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