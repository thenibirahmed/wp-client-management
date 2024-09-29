<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Email;
use WpClientManagement\Models\Project;

class GetProjectEmails {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/project/(?P<id>\d+)/emails';

    protected array $rules = [
        'id'    => 'required|integer|exists:eic_projects,id',
        'from'  => 'nullable|date',
        'to'    => 'nullable|date',
    ];

    protected array $validationMessages = [
        'id.required' => 'The Project ID is required.',
        'id.integer'  => 'The Project ID must be an integer.',
        'id.exists'   => 'The Project does not exist.',
        'from.date'   => 'The From date is not a valid date.',
        'to.date'     => 'The To date is not a valid date.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_project_emails'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_project_emails(\WP_REST_Request $request) {
        global $validator;

        $project_id  = $request->get_param('id');
        $page        = $request->get_param('email');
        $from        = $request->get_param('from');
        $to          = $request->get_param('to');
        $search      = $request->get_param('search');

        if(!isset($project_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = [];
        $data['id']      = $project_id;
        $data['from']    = $from ? $from. ' 00:00:00' : date('Y-m-d', strtotime('-3 months'));
        $data['to']      = $to ? $to. ' 23:59:59' : date('Y-m-d 23:59:59');

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $project = Project::getProjectData($data['id']);

        if(!$project) {
            return new \WP_REST_Response([
                'error' => 'Project does not exists.',
            ]);
        }

        $emails = Email::getProjectEmails($project->id, $page, $data['from'], $data['to'], $search);

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

        $emailsWithDetails = $emails->map(function ($email) use ($wpUsers) {

            $wp_user_id = $email->eic_crm_user->wp_user_id;
            $wp_user    = $wpUsers[$wp_user_id] ?? null;

            return [
                'id'       => $email->id,
                'from'     => $wp_user['name'] ?? 'Unknown',
                'subject'  => $email->subject,
                'body'     => $email->body,
                'time'     => $email->created_at ? human_time_diff(strtotime($email->created_at), current_time('timestamp')) . ' ago' : null,
            ];

        });

        $response = [
            'emails'     => $emailsWithDetails,
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