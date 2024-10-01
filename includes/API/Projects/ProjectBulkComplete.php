<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Project;
use WpClientManagement\Models\Status;

class ProjectBulkComplete {

    private $namespace = 'wp-client-management/v1';
    private $endpoint = '/projects/bulk-complete';

    protected array $rules = [
        'bulk_ids' => 'required|array',
    ];

    protected array $validationMessages = [
        'bulk_ids.required'  => 'The bulk IDs are required.',
        'bulk_ids.array'     => 'The bulk IDs must be an array.',
        'bulk_ids.*.integer' => 'The bulk IDs must be integers.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'bulk_complete_project'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function bulk_complete_project(\WP_REST_Request $request) {
        global $validator;

        $bulk_ids = is_string($request->get_param('bulk_ids')) ? explode(',', $request->get_param('bulk_ids')) : $request->get_param('bulk_ids');
        $bulk_ids = array_map('intval', $bulk_ids);

        $data = [];
        $data['bulk_ids'] = isset($bulk_ids) ? $bulk_ids : [];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);
        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        if (empty($bulk_ids)) {
            return new \WP_REST_Response([
                'message' => 'No IDs provided for completion.',
            ], 400);
        }

        $bulk_projects = Project::whereIn('id', $bulk_ids)->get();

        if ($bulk_projects->isEmpty()) {
            return new \WP_REST_Response([
                'message' => 'No projects found for the provided IDs.',
            ], 404);
        }

        $completed_status = Status::where('type', 'project')->where('name', 'completed')->first();

        if (!$completed_status) {
            return new \WP_REST_Response([
                'message' => 'Completed status not found.',
            ], 404);
        }

        try {
            foreach ($bulk_projects as $project) {
                $project->update(['status_id' => $completed_status->id]);
            }
        } catch (\Exception $e) {
            return new \WP_REST_Response([
                'message' => 'An error occurred while updating projects.',
                'error'   => $e->getMessage(),
            ], 500);
        }

        return new \WP_REST_Response([
            'message' => 'Projects updated successfully.',
        ], 200);
    }
}