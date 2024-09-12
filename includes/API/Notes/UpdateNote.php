<?php

namespace WpClientManagement\API\Notes;

use WpClientManagement\Models\Note;

class UpdateNote {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/note/update/(?P<id>\d+)';

    protected array $rules = [
        'project_id'        => 'nullable|exists:eic_projects,id',
        'client_id'         => 'nullable|exists:eic_clients,id',
        'note'              => 'required|string',
    ];

    protected array $validationMessages = [
        'project_id.exists'           => 'The Project does not exist',
        'client_id.exists'           => 'The Client does not exist',
        'note.required'              => 'The note field is required.',
        'note.string'                => 'The note field must be string.'
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_note'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_note(\WP_REST_Request $request) {
        global $validator;

        $id    = intval($request->get_param('id'));
        $data  = $request->get_params();

        $data['project_id']      = isset($data['project_id']) ? intval($data['project_id']) : null;
        $data['client_id']       = isset($data['client_id']) ? intval($data['client_id']) : null;
        $data['note']            = isset($data['note']) ? sanitize_textarea_field($data['note']) : null;

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $note = Note::find($id);

        if (!$note) {
            return new \WP_REST_Response([
                'message' => 'Note not found.',
            ], 404);
        }

        $note->update([
            'project_id' => $data['project_id'],
            'client_id'  => $data['client_id'],
            'note'       => $data['note'],
        ]);

        return new \WP_REST_Response([
            'message' => 'Note updated successfully.',
        ], 200);
    }
}