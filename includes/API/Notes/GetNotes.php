<?php

namespace WpClientManagement\API\Notes;

use WpClientManagement\Helpers\AuthUser;
use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Note;

class GetNotes {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/notes';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_notes'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_notes(\WP_REST_Request $request) {

        $page = $request->get_param('page');

        if(AuthUser::user()->role == 'admin') {

            $notes = Note::with('eic_crm_user')->paginate(5, ['*'], 'page', $page);

        }elseif(AuthUser::user()->role == 'team-member') {
            $authUser = EicCrmUser::find(AuthUser::user()->id);

            $projecIds = $authUser->assignedProjects->pluck('id')->toArray();

            $notes = Note::with('eic_crm_user')->whereIn('project_id', $projecIds)->paginate(5, ['*'], 'page', $page);
        }else {
            return new \WP_REST_Response([
                'error' => 'Unauthorized',
            ],401);
        }

        $data = [];
        foreach ($notes as $note) {
            $data[] = [
                'id'      => $note->id,
                'creator' => $note->eic_crm_user?->wp_user->user_login,
                'note'    => $note->note,
                'time'    => $note->created_at ? human_time_diff(strtotime($note->created_at), current_time('timestamp')) . ' ago' : null,
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total'         => $notes->total(),
                'per_page'      => $notes->perPage(),
                'current_page'  => $notes->currentPage(),
                'last_page'     => $notes->lastPage(),
                'next_page_url' => $notes->nextPageUrl(),
                'prev_page_url' => $notes->previousPageUrl(),
            ],
        ]);
    }
}