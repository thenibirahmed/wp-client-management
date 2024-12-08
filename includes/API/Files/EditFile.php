<?php

namespace WpClientManagement\API\Files;

use WpClientManagement\Models\File;

class EditFile {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/file/(?P<id>\d+)/edit';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'edit_file'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function edit_file(\WP_REST_Request $request) {

        $id = $request->get_param('id');

        if(!$id) {
            return new \WP_REST_Response([
                'error' => 'Id param required',
            ]);
        }

        $file = File::find($id);

        if (!$file) {
            return new \WP_REST_Response([
                'message' => 'File not found.',
            ], 404);
        }

        $fileResponse = [
            'id'         => $file->id,
            'client_id'  => $file->client_id,
            'project_id' => $file->project_id,
            'title'      => $file->title,
            'url'        => $file->url,
            'image_url'  => $file->image_url,
        ];

        return new \WP_REST_Response([
            'file' => $fileResponse,
        ], 200);
    }
}