<?php

namespace WpClientManagement\API\Schedules;

use Carbon\Carbon;
use DateTime;
use WpClientManagement\Helpers\AuthUser;
use WpClientManagement\Models\Client;
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
        }else {
            $schedules = Schedule::getClientSchedules(AuthUser::user()->id, $page);
        }

        if(!$schedules) {
            return new \WP_REST_Response([
                'error' => 'No Schedules found',
            ]);
        }


        // $guests = Schedule::getGuests($guestIds);

        // return new \WP_REST_Response([
        //     'schedules' => $schedules,
        //     'guests' => $guests
        // ]);

        $data = [];

        foreach ($schedules as $schedule) {
            $data[] = [
                'id'       => $schedule->id,
                'creator'  => $schedule->author->wp_user->user_login,
                'host'  => $schedule->host->wp_user->user_login,
                'topic'    => $schedule->topic,
                'description' => $schedule->description,
                'scheduled_at' => Carbon::parse($schedule->scheduled_at)->format('h:i A D, d M'),
                'link'  => $schedule->link,
                'duration' => $schedule->duration . ' ' . Schedule::DURATION_TYPES[$schedule->duration_type],
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