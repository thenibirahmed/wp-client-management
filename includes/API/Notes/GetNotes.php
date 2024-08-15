<?php

namespace WpClientManagement\API\Notes;

use WpClientManagement\Models\Note;

class GetNotes {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/notes';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_notes'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_notes(\WP_REST_Request $request) {

        $page = $request->get_params('page');

        $notes = Note::paginate(20, ['*'], 'page', $page);

        $data = [];
        foreach ($notes as $note) {
            $data[] = [
                'id' => $note->id,
                'eic_crm_user' => $note->eic_crm_user,
                'project' => $note->project,
                'client' => $note->client,
                'note' => $note->note
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $notes->total(),
                'per_page' => $notes->perPage(),
                'current_page' => $notes->currentPage(),
                'last_page' => $notes->lastPage(),
                'next_page_url' => $notes->nextPageUrl(),
                'prev_page_url' => $notes->previousPageUrl(),
            ],
        ]);
    }
}