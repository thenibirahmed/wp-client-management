<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Project;

class SelectProject {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/select-project';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'select_project'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function select_project()
    {
        $projects = Project::getActiveProjects();
        $data = [];
        foreach ($projects as $project) {
            $data[] = [
                'id'   => $project->id,
                'name' => $project->title
            ];
        }

        return new \WP_REST_Response([
            'projects' => $data
        ]);
    }
}