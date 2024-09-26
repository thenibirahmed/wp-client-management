<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Note;

class GetClientNotes {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/client/(?P<id>\d+)/notes';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_clients,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The client ID is required.',
        'id.integer'  => 'The client ID must be an integer.',
        'id.exists'   => 'The client does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_client_notes'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_client_notes(\WP_REST_Request $request) {
        global $validator;

        $client_id  = $request->get_param('id');
        $page       = $request->get_param('note');
        $from       = $request->get_param('from');
        $to         = $request->get_param('to');
        $search     = $request->get_param('search');

        if(!isset($client_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = [];
        $data['id']   = $client_id;
        $data['from'] = $from ? $from. ' 00:00:00' : date('Y-m-d', strtotime('-3 months'));
        $data['to']   = $to ? $to. ' 23:59:59' : date('Y-m-d 23:59:59');

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $client = Client::find($data['id']);

        if(!$client) {
            return new \WP_REST_Response([
                'error' => 'Client does not exists.',
            ]);
        }

        $notes = Note::getClientNotes($client_id, $page, $data['from'], $data['to'], $search);

        if(!$notes) {
            return new \WP_REST_Response([
                'error' => 'No Notes found',
            ]);
        }

        $wp_user_ids = $notes->pluck('eic_crm_user.wp_user_id')->toArray();

        $wpUsersDb = get_users([
            'include' => $wp_user_ids,
        ]);

        $wpUsers = [];
        foreach ($wpUsersDb as $user) {
            $wpUsers[$user->ID] = [
                'name'  => $user->user_login,
            ];
        }

        $data = [];
        foreach ($notes as $note) {
            $wp_user_id = $note->eic_crm_user?->wp_user_id;

            $data[] = [
                'id'      => $note->id,
                'creator' => $wpUsers[$wp_user_id]['name'] ?? 'N/A',
                'note'    => $note->note,
                'time'    => $note->created_at ? human_time_diff(strtotime($note->created_at), current_time('timestamp')) . ' ago' : null,
            ];
        }

        $response = [
            'notes'      => $data,
            'pagination' => [
                'total'         => $notes->total(),
                'per_page'      => $notes->perPage(),
                'current_page'  => $notes->currentPage(),
                'last_page'     => $notes->lastPage(),
                'next_page_url' => $notes->nextPageUrl(),
                'prev_page_url' => $notes->previousPageUrl(),
            ],
        ];

        return new \WP_REST_Response($response);
    }
}