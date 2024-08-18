<?php

namespace WpClientManagement\API\Files;

use WpClientManagement\Models\File;

class GetSingleFile {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/file/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_files,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The file ID is required.',
        'id.integer' => 'The file ID must be an integer.',
        'id.exists' => 'The file does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_file'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_file(\WP_REST_Request $request) {
        global $validator;

        $file_id = $request->get_param('id');

        if(!isset($file_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $file_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $file = File::find($data['id']);

        if(!$file) {
            return new \WP_REST_Response([
                'error' => 'No File found',
            ]);
        }

        $response = [
            'data' => $file,
            'eic_crm_user' => $file->eic_crm_user
        ];

        return new \WP_REST_Response($response);
    }
}