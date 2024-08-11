<?php

namespace WpClientManagement\API\Notes;

use WpClientManagement\Models\Note;

class DeleteNote {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/notes/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:notes,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The note ID is required.',
        'id.integer' => 'The note ID must be an integer.',
        'id.exists' => 'The note does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_note'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function delete_note(\WP_REST_Request $request) {
        global $validator;

        $note_id = $request->get_param('id');

        $data = ['id' => $note_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $note = Note::find($note_id);

        if (!$note) {
            return new \WP_REST_Response([
                'message' => 'Note not found.',
            ], 404);
        }

        $note->delete();

        return new \WP_REST_Response([
            'message' => 'Note deleted successfully.',
        ], 200);
    }
}