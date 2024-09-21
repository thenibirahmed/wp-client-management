<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Email;

class GetClientEmails {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/client/(?P<id>\d+)/emails';

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
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_client_emails'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_client_emails(\WP_REST_Request $request) {
        global $validator;

        $client_id  = $request->get_param('id');
        $page       = $request->get_param('email');

        if(!isset($client_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data      = ['id' => $client_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $client = Client::where('id', $data['id'])->exists();

        if(!$client) {
            return new \WP_REST_Response([
                'error' => 'Client does not exists.',
            ]);
        }

        $emails = Email::getClientEmails($client_id, $page);

        if(!$emails) {
            return new \WP_REST_Response([
                'error' => 'No Email found',
            ]);
        }

        $wp_user_ids = $emails->pluck('eic_crm_user.wp_user_id')->toArray();

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
        foreach ($emails as $email) {
            $wp_user_id = $email->eic_crm_user->wp_user_id;

            $data[] = [
                'id'     => $email->id,
                'from'   => $wpUsers[$wp_user_id]['name'] ?? 'Unknown',
                'subject'   => $email->subject,
                'body'      => $email->body,
                'time'      => $email->created_at ? human_time_diff(strtotime($email->created_at), current_time('timestamp')) . ' ago' : null,
            ];
        }

        $response = [
            'emails'     => $data,
            'pagination' => [
                'total'         => $emails->total(),
                'per_page'      => $emails->perPage(),
                'current_page'  => $emails->currentPage(),
                'last_page'     => $emails->lastPage(),
                'next_page_url' => $emails->nextPageUrl(),
                'prev_page_url' => $emails->previousPageUrl(),
            ],
        ];

        return new \WP_REST_Response($response);
    }
}