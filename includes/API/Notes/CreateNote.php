<?php
namespace WpClientManagement\API\Notes;

use WpClientManagement\Models\Note;

class CreateNote{

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/note/create';

    protected array $rules = [
        'eic_crm_user_id' => 'required|exists:eic_eic_crm_users,id',
        'project_id' => 'required|exists:eic_projects,id',
        'client_id' => 'required|exists:eic_clients,id',
        'note' => 'required|string',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The EicCrmUser ID is required',
        'eic_crm_user_id.exists' => 'The EicCrmUser does not exist',
        'project_id.required' => 'The Project ID is required',
        'project_id.exists' => 'The Project does not exist',
        'client_id.required' => 'The Client ID is required',
        'client_id.exists' => 'The Client does not exist',
        'note.required' => 'The name field is required.',
        'note.string' => 'The name field must be string.'
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_note'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function create_note(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $note = Note::create([
            'eic_crm_user_id' => $data['eic_crm_user_id'],
            'project_id' => $data['project_id'],
            'client_id' => $data['client_id'],
            'note' => $data['note'],
        ]);

        if(!$note) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        return new \WP_REST_Response([
            'message' => 'Note created successfully.',
            'status' => $note,
        ], 201);
    }
}