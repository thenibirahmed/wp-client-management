<?php

namespace WpClientManagement\API\Emails;

use WpClientManagement\Helpers\AuthUser;
use WpClientManagement\Models\Email;

class GetEmails {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/emails';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_emails'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_emails(\WP_REST_Request $request) {

        $page       = $request->get_param('email');
        $from       = $request->get_param('from');
        $to         = $request->get_param('to');
        $search     = $request->get_param('search');

        $data = [];
        $data['from']  = $from ? $from. ' 00:00:00' : date('Y-m-d', strtotime('-3 months'));
        $data['to']    = $to ? $to. ' 23:59:59' : date('Y-m-d 23:59:59');

        if(AuthUser::user()->role == 'admin'){
            $emails = Email::getClientEmails(false, $page, $data['from'], $data['to'], $search);
        }elseif(AuthUser::user()->role == 'client'){
            $emails = Email::getClientEmails(AuthUser::user()->id, $page, $data['from'], $data['to'], $search);
        }else {
            return new \WP_REST_Response([
                'error' => 'Unauthorized',
            ],401);
        }

        $data = [];
        foreach ($emails as $email) {
            $data[] = [
                'id'           => $email->id,
                'eic_crm_user' => $email->eic_crm_user,
                'project'      => $email->project,
                'client'       => $email->client,
                'subject'      => $email->subject,
                'body'         => $email->body,
                'scheduled_at' => $email->scheduled_at
            ];
        }

        return new \WP_REST_Response([
            'emails' => $data,
            'pagination' => [
                'total'         => $emails->total(),
                'per_page'      => $emails->perPage(),
                'current_page'  => $emails->currentPage(),
                'last_page'     => $emails->lastPage(),
                'next_page_url' => $emails->nextPageUrl(),
                'prev_page_url' => $emails->previousPageUrl(),
            ],
        ]);
    }
}