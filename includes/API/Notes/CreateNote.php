<?php
namespace WpClientManagement\API\Notes;

use WpClientManagement\Models\Note;

class CreateNote{

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/note/create';

    protected array $rules = [
        'user_id'     => 'required|exists:eic_eic_crm_users,id',
        'project_id'  => 'nullable|exists:eic_projects,id',
        'client_id'   => 'nullable|exists:eic_clients,id',
        'note'        => 'required|string',
    ];

    protected array $validationMessages = [
        'user_id.required'   => 'The User ID is required',
        'user_id.exists'     => 'The User does not exist',
        'client_id.exists'   => 'The Client does not exist',
        'note.required'      => 'The note field is required.',
        'note.string'        => 'The note field must be string.'
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

        $user = wp_get_current_user();
        $data['eic_crm_user_id'] = $user->ID;
        $data['client_id']       = isset($data['client_id']) ? intval($data['client_id']) : null;
        $data['note']            = sanitize_textarea_field($data['note'] ?? '');

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $note = Note::create($data);

        if(!$note) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        $response = [
            'id' => $note->id,
            'note' => $note->note,
            'client_id' => $note->client_id,
            'project_id' => $note->project_id,
            'user_id' => $note->eic_crm_user_id
        ];

        return new \WP_REST_Response([
            'message' => 'Note created successfully.',
            'note' => $response,
        ], 201);
    }
}