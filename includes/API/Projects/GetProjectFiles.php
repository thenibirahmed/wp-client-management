<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\File;
use WpClientManagement\Models\Project;

class GetProjectFiles {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/project/(?P<id>\d+)/files';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_projects,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The project ID is required.',
        'id.integer'  => 'The project ID must be an integer.',
        'id.exists'   => 'The project does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_project_notes'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_project_notes(\WP_REST_Request $request) {
        global $validator;

        $project_id  = $request->get_param('id');
        $page        = $request->get_param('file');

        if(!isset($project_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $project_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $project = Project::getProjectData($data['id']);

        if(!$project) {
            return new \WP_REST_Response([
                'error' => 'Project does not exists.',
            ]);
        }

        $files = File::getProjeEctFiles($project->id, $page);

        if(!$files) {
            return new \WP_REST_Response([
                'error' => 'No File found',
            ]);
        }

        $wp_user_ids = $files->pluck('eic_crm_user.wp_user_id')->toArray();

        $wpUsersDb = get_users([
            'include' => $wp_user_ids,
        ]);

        $wpUsers = [];
        foreach ($wpUsersDb as $user) {
            $wpUsers[$user->ID] = [
                'name'  => $user->user_login,
            ];
        }

        $data = [];
        foreach ($files as $file) {
            $wp_user_id = $file->eic_crm_user->wp_user_id;

            $data[] = [
                'id'         => $file->id,
                'name'       => $file->title,
                'created_by' => $wpUsers[$wp_user_id]['name'] ?? 'Unknown',
                'url'        => $file->url,
                'time'       => $file->created_at ? human_time_diff(strtotime($file->created_at), current_time('timestamp')) . ' ago' : null,
            ];
        }

        $response = [
            'files'       => $data,
            'pagination' => [
                'total'         => $files->total(),
                'per_page'      => $files->perPage(),
                'current_page'  => $files->currentPage(),
                'last_page'     => $files->lastPage(),
                'next_page_url' => $files->nextPageUrl(),
                'prev_page_url' => $files->previousPageUrl(),
            ],
        ];

        return new \WP_REST_Response($response);
    }
}