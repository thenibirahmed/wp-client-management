<?php

namespace WpClientManagement\API\Notes;

use WpClientManagement\Models\Note;

class UpdateNote {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/note/update/(?P<id>\d+)';

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
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_note'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_note(\WP_REST_Request $request) {
        global $validator;

        $id = intval($request->get_param('id'));
        $data = $request->get_params();

        $data['eic_crm_user_id'] = intval($data['eic_crm_user_id'] ?? 0);
        $data['project_id'] = intval($data['project_id'] ?? 0);
        $data['client_id'] = intval($data['client_id'] ?? 0);
        $data['note'] = sanitize_textarea_field($data['note'] ?? '');

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
            'eic_crm_user_id' => $data['eic_crm_user_id'],
            'project_id' => $data['project_id'],
            'client_id' => $data['client_id'],
            'note' => $data['note'],
        ]);

        return new \WP_REST_Response([
            'message' => 'Note updated successfully.',
            'status' => $note,
        ], 200);
    }
}