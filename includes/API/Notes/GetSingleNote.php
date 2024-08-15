<?php

namespace WpClientManagement\API\Notes;

use WpClientManagement\Models\Note;

class GetSingleNote {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/note/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_notes,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The note ID is required.',
        'id.integer' => 'The note ID must be an integer.',
        'id.exists' => 'The note does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_single_note'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_note(\WP_REST_Request $request) {
        global $validator;

        $note_id = $request->get_param('id');

        if(!isset($note_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $note_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $note = Note::find($note_id);

        if(!$note) {
            return new \WP_REST_Response([
                'error' => 'No Note found',
            ]);
        }
        $response = [
            'data' => $note,
            'eic_crm_user' => $note->eic_crm_user
        ];

        return new \WP_REST_Response($response);
    }
}