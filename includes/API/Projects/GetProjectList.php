<?php

namespace WpClientManagement\API\Projects;

use DateTime;
use WpClientManagement\Middlewares\AuthMiddleware;
use WpClientManagement\Models\Project;

class GetProjectList {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/project-list';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_project_list'),
            'permission_callback' => [AuthMiddleware::class,'admin'],
        ]);
    }

    public function get_project_list()
    {

       $projects    = Project::with('status', 'client.eic_crm_user', 'tasks')->take(6)->get();

       $data = [];

       foreach ($projects as $project) {

        $data[] = [
            'id'         => $project->id,
            'name'       => $project->title,
            'tasks'      => $project->tasks()->count(),
            'created_at' => $project->created_at ? (new DateTime($project->created_at))->format('M d, Y') : '',
            'client'     => $project->client->eic_crm_user->wp_user->user_login,
            'status'     => $project->status->name,
        ];
    }

    return new \WP_REST_Response([
            'projects' => $data,
        ]);
    }
}