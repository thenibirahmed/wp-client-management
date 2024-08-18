<?php

namespace WpClientManagement\API\Files;

use WpClientManagement\Models\File;

class UpdateFile {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/file/update/(?P<id>\d+)';

    protected array $rules = [
        'eic_crm_user_id' => 'required|exists:eic_eic_crm_users,id',
        'project_id' => 'required|exists:eic_projects,id',
        'client_id' => 'required|exists:eic_clients,id',
        'title' => 'required|string',
        'url' => 'required|url',
        'type' => 'required|string',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The EicCrmUser ID is required',
        'eic_crm_user_id.exists' => 'The EicCrmUser does not exist',
        'project_id.required' => 'The Project ID is required',
        'project_id.exists' => 'The Project does not exist',
        'client_id.required' => 'The Client ID is required',
        'client_id.exists' => 'The Client does not exist',
        'title.required' => 'The Title is required',
        'title.string' => 'The Title must be a valid string',
        'url.required' => 'The URL is required',
        'url.url' => 'The URL must be a valid URL',
        'type.required' => 'The Type is required',
        'type.string' => 'The Type must be a valid string',
    ];
    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_file'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_file(\WP_REST_Request $request) {
        global $validator;
        $id = intval($request->get_param('id'));
        $data = $request->get_params();

        $data['eic_crm_user_id'] = intval($data['eic_crm_user_id'] ?? 0);
        $data['project_id'] = intval($data['project_id'] ?? 0);
        $data['client_id'] = intval($data['client_id'] ?? 0);
        $data['title'] = sanitize_text_field($data['title'] ?? '');
        $data['url'] = esc_url_raw($data['url'] ?? '');
        $data['type'] = sanitize_text_field($data['type'] ?? '');

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

        $file->update([
            'eic_crm_user_id' => $data['eic_crm_user_id'],
            'project_id' => $data['project_id'],
            'client_id' => $data['client_id'],
            'title' => $data['title'],
            'url' => $data['url'],
            'type' => $data['type'],
        ]);

        return new \WP_REST_Response([
            'message' => 'Note updated successfully.',
            'status' => $file,
        ], 200);
    }
}