<?php

namespace WpClientManagement\API\Schedules;

use WpClientManagement\Helpers\AuthUser;
use WpClientManagement\Models\Schedule;

class GetSchedules {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/schedules';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_schedules'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_schedules(\WP_REST_Request $request) {

        $page = $request->get_param('page');

        if(AuthUser::user()->role == 'admin') {
            $schedules = Schedule::paginate(5, ['*'], 'page', $page);
        }elseif(AuthUser::user()->role == 'client') {
            $schedules = Schedule::getClientSchedules(AuthUser::user()->id, $page);
        }

        $data = [];
        foreach ($schedules as $schedule) {
            $data[] = [
                'id' => $schedule->id,
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total'         => $schedules->total(),
                'per_page'      => $schedules->perPage(),
                'current_page'  => $schedules->currentPage(),
                'last_page'     => $schedules->lastPage(),
                'next_page_url' => $schedules->nextPageUrl(),
                'prev_page_url' => $schedules->previousPageUrl(),
            ],
        ]);
    }
}