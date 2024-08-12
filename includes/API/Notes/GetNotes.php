<?php

namespace WpClientManagement\API\Notes;

use WpClientManagement\Models\Note;

class GetNotes {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/notes';

    protected array $rules = [
        'eic_crm_user_id' => 'required',
        'project_id' => 'required',
        'client_id' => 'required',
        'text' => 'required|string'
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The eic_crm_user_id field is required.',
        'project_id.required' => 'The project_id field is required.',
        'client_id.required' => 'The client_id field is required.',
        'text.required' => 'The text field is required.',
        'text.string' => 'The text must be a string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
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
                'id' => $note->ID,
                'eic_crm_user' => $note->eic_crm_user->name,
                'project' => $note->project->name,
                'client' => $note->client->name,
                'text' => $note->text
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $notes->ftotal(),
                'per_page' => $notes->perPage(),
                'current_page' => $notes->currentPage(),
                'last_page' => $notes->lastPage(),
                'next_page_url' => $notes->nextPageUrl(),
                'prev_page_url' => $notes->previousPageUrl(),
            ],
        ]);
    }
}