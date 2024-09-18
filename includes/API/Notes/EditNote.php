<?php

namespace WpClientManagement\API\Notes;

use WpClientManagement\Models\Note;

class EditNote {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/note/(?P<id>\d+)/edit';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'edit_note'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function edit_note(\WP_REST_Request $request) {

        $id = $request->get_param('id');

        if(!$id) {
            return new \WP_REST_Response([
                'error' => 'Id param required',
            ]);
        }

        $note = Note::find($id);

        if (!$note) {
            return new \WP_REST_Response([
                'message' => 'Note not found.',
            ], 404);
        }

        $noteResponse = [
            'id'         => $note->id,
            'project_id' => $note->project_id,
            'client_id'  => $note->client_id,
            'note'       => $note->note,
        ];

        return new \WP_REST_Response([
            'note' => $noteResponse,
        ], 200);
    }
}