<?php

namespace WpClientManagement\API\Files;

use WpClientManagement\Models\File;

class DeleteFile {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/file/delete/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_files,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The file ID is required.',
        'id.integer'  => 'The file ID must be an integer.',
        'id.exists'   => 'The file does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_file'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function delete_file(\WP_REST_Request $request) {
        global $validator;

        $file_id = $request->get_param('id');

        $data    = ['id' => $file_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $file = File::find($file_id);

        if (!$file) {
            return new \WP_REST_Response([
                'message' => 'File not found.',
            ], 404);
        }

        $file->delete();

        return new \WP_REST_Response([
            'message' => 'File deleted successfully.',
        ], 200);
    }
}