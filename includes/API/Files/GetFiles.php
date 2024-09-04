<?php

namespace WpClientManagement\API\Files;

use WpClientManagement\Models\File;

class GetFiles {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/files';

    protected array $rules = [
        'eic_crm_user_id' => 'required',
        'project_id' => 'required',
        'client_id' => 'required',
        'title' => 'required|string|max:255',
        'url' => 'required|string|max:255',
        'type' => 'required',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The eic_crm_user_id field is required.',
        'project_id.required' => 'The project_id field is required.',
        'client_id.required' => 'The client_id field is required.',
        'title.required' => 'The title field is required.',
        'title.string' => 'The title must be a string.',
        'title.max' => 'The title may not be greater than 255 characters.',
        'url.required' => 'The url field is required.',
        'url.string' => 'The url must be a string.',
        'url.max' => 'The url may not be greater than 255 characters.',
        'type' => 'The type field is required.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_posts'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_posts(\WP_REST_Request $request) {

        $page = $request->get_params('page');


        $files = File::paginate(5, ['*'], 'page', $page);

        $data = [];
        foreach ($files as $file) {
            $data[] = [
                'id' => $file->id,
                'eic_crm_user' => $file->eic_crm_user,
                'project' => $file->project,
                'client' => $file->client,
                'title' => $file->title,
                'url' => $file->url,
                'type' => $file->type
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $files->total(),
                'per_page' => $files->perPage(),
                'current_page' => $files->currentPage(),
                'last_page' => $files->lastPage(),
                'next_page_url' => $files->nextPageUrl(),
                'prev_page_url' => $files->previousPageUrl(),
            ],
        ]);
    }
}