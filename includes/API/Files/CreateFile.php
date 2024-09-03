<?php
namespace WpClientManagement\API\Files;

use WpClientManagement\Models\File;

class CreateFile{

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/file/create';

    protected array $rules = [
        'user_id'     => 'required|exists:eic_eic_crm_users,id',
        'client_id'   => 'nullable|exists:eic_clients,id',
        'project_id'  => 'nullable|exists:eic_projects,id',
        'title'       => 'required|string',
        'url'         => 'required|string',
    ];

    protected array $validationMessages = [
        'user_id.required'   => 'The User ID is required',
        'user_id.exists'     => 'The User does not exist',
        'client_id.required' => 'The Client ID is required',
        'client_id.exists'   => 'The Client does not exist',
        'title.required'     => 'The Title is required',
        'title.string'       => 'The Title must be a valid string',
        'url.required'       => 'The URL is required'
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_file'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function create_file(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();

        $data['eic_crm_user_id'] = isset($data['user_id']) ? intval($data['user_id']) : null;
        $data['client_id']       = isset($data['client_id']) ? intval($data['client_id']) : null;
        $data['title']           = sanitize_text_field($data['title'] ?? '');
        $data['url']             = esc_url_raw($data['url'] ?? '');

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $pathInfo = pathinfo($data['url']);
        $extension = $pathInfo['extension'];

        $extension ? $data['type'] = $extension : $data['type'] = 'unknown';

        $file = File::create($data);

        if(!$file) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        return new \WP_REST_Response([
            'message' => 'File created successfully.',
            'file' => $file,
        ], 201);
    }
}