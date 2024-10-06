<?php

namespace WpClientManagement\API\Schedules;

use DateTime;
use WpClientManagement\Helpers\AuthUser;
use WpClientManagement\Models\EicCrmUser;
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

        if(!$schedules) {
            return new \WP_REST_Response([
                'error' => 'No Schedules found',
            ]);
        }

        $guest_ids = [];

        foreach ($schedules as $schedule) {
            $ids = json_decode($schedule->guest_ids, true) ?? [];
            $guest_ids = array_merge($guest_ids, $ids);
        }

        $guestIds = array_unique($guest_ids);

        $guests = EicCrmUser::getGuests($guestIds);

        $data = [];
        foreach ($schedules as $schedule) {
            $guestIdsInSchedule = json_decode($schedule->guest_ids, true) ?? [];
            $guestNames = [];

            foreach ($guestIdsInSchedule as $guestId) {
                if (isset($guests[$guestId])) {
                    $guestNames[] = $guests[$guestId]->wp_user->user_login;
                }
            }

            $data[] = [
                'id' => $schedule->id,
                'created_by'   => $schedule->creator->wp_user->user_login ?? '',
                'hosted_by'    => $schedule->host->wp_user->user_login ?? '',
                'topic'        => $schedule->topic,
                'description'  => $schedule->description,
                'scheduled_at' => $schedule->scheduled_at ? (new DateTime($schedule->scheduled_at))->format('D d F, Y h:i A') : '',
                'guests'       => count($guestNames),
                'duration'     => $schedule->duration . ' ' . Schedule::DURATION_TYPES[$schedule->duration_type] ?? '',
            ];
        }

        return new \WP_REST_Response([
            'schedules'  => $data,
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