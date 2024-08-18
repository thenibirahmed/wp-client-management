<?php

namespace WpClientManagement\API\Schedules;

use WpClientManagement\Models\Schedule;

class GetSchedules {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/schedules';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_schedules'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_schedules(\WP_REST_Request $request) {

        $page = $request->get_params('page');

        $schedules = Schedule::paginate(20, ['*'], 'page', $page);

        $data = [];
        foreach ($schedules as $schedule) {
            $data[] = [
                'id' => $schedule->id,
                'eic_crm_user' => $schedule->eic_crm_user,
                'client' => $schedule->client,
                'date' => $schedule->date,
                'duration' => $schedule->duration,
                'link' => $schedule->link,
                'hosts' => $schedule->hosts
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $schedules->total(),
                'per_page' => $schedules->perPage(),
                'current_page' => $schedules->currentPage(),
                'last_page' => $schedules->lastPage(),
                'next_page_url' => $schedules->nextPageUrl(),
                'prev_page_url' => $schedules->previousPageUrl(),
            ],
        ]);
    }
}