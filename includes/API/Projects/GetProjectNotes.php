<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Note;
use WpClientManagement\Models\Project;

class GetProjectNotes {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/project/(?P<id>\d+)/notes';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_projects,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The Project ID is required.',
        'id.integer'  => 'The Project ID must be an integer.',
        'id.exists'   => 'The Project does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_projects_notes'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_projects_notes(\WP_REST_Request $request) {
        global $validator;

        $project_id  = $request->get_param('id');
        $page       = $request->get_param('page');

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
                'error' => 'Client does not exists.',
            ]);
        }

        $notes = Note::getProjectNotes($project->id, $page);

        if(!$notes) {
            return new \WP_REST_Response([
                'error' => 'No notes found',
            ]);
        }

        $wp_user_ids = $notes->pluck('eic_crm_user.wp_user_id')->toArray();

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
        foreach ($notes as $note) {
            $wp_user_id = $note->eic_crm_user->wp_user_id;

            $data[] = [
                'id'      => $note->id,
                'creator' => $wpUsers[$wp_user_id]['name'] ?? 'Unknown',
                'note'    => $note->note,
                'time'    => $note->created_at ? human_time_diff(strtotime($note->created_at), current_time('timestamp')) . ' ago' : null,
            ];
        }

        $response = [
            'data'       => $data,
            'pagination' => [
                'total'         => $notes->total(),
                'per_page'      => $notes->perPage(),
                'current_page'  => $notes->currentPage(),
                'last_page'     => $notes->lastPage(),
                'next_page_url' => $notes->nextPageUrl(),
                'prev_page_url' => $notes->previousPageUrl(),
            ],
        ];

        return new \WP_REST_Response($response);
    }
}