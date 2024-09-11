<?php

namespace WpClientManagement\API\Files;

use WpClientManagement\Models\File;

class UpdateFile {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/file/update/(?P<id>\d+)';

    protected array $rules = [
        'client_id'        => 'nullable|exists:eic_clients,id',
        'project_id'       => 'nullable|exists:eic_projects,id',
        'title'            => 'required|string',
        'url'              => 'required|string',
    ];

    protected array $validationMessages = [
        'client_id.required'        => 'The Client ID is required',
        'client_id.exists'          => 'The Client does not exists',
        'project_id.exists'         => 'The Project does not exists',
        'title.required'            => 'The Title is required',
        'title.string'              => 'The Title must be a valid string',
        'url.required'              => 'The URL is required'
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_file'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_file(\WP_REST_Request $request) {
        global $validator;

        $id = intval($request->get_param('id'));

        $data = $request->get_params();
        $data['project_id'] = isset($data['project_id']) ? intval($data['project_id']) : null;
        $data['client_id']  = isset($data['client_id']) ? intval($data['client_id']) : null;
        $data['title']      = sanitize_text_field($data['title'] ?? '');
        $data['url']        = esc_url_raw($data['url'] ?? '');

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $file = File::find($id);

        if (!$file) {
            return new \WP_REST_Response([
                'message' => 'File not found.',
            ], 404);
        }


        $pathInfo = pathinfo($data['url']);
        $extension = $pathInfo['extension'];

        $extension ? $data['type'] = $extension : $data['type'] = 'unknown';

        $file->update($data);

        return new \WP_REST_Response([
            'message' => 'File updated successfully.',
        ], 200);
    }
}