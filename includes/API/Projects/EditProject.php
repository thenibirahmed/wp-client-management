<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Priority;
use WpClientManagement\Models\Project;
use WpClientManagement\Models\Status;

class EditProject {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/project/(?P<id>\d+)/edit';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'edit_project'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function edit_project(\WP_REST_Request $request) {

        $id = $request->get_param('id');

        if(!$id) {
            return new \WP_REST_Response([
                'error' => 'Id param required',
            ]);
        }

        $project = Project::find($id);

        if (!$project) {
            return new \WP_REST_Response([
                'message' => 'Project not found.',
            ], 404);
        }

        $assigneIds = $project->eicCrmUsers->pluck('id');

        $projectResponse = [
            'id'           => $project->id,
            'title'        => $project->title,
            'description'  => $project->description,
            'client_id'    => $project->client_id,
            'manager_id'   => $project->manager_id,
            'status_id'    => $project->status_id,
            'priority_id'  => $project->priority_id,
            'currency_id'  => $project->currency_id,
            'budget'       => $project->budget,
            'start_date'   => $project->start_date,
            'due_date'     => $project->due_date,
            'description'  => $project->description,
            'assignee_ids' => $assigneIds,
        ];

        return new \WP_REST_Response([
            'project' => $projectResponse,
        ], 200);
    }
}