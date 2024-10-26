<?php

namespace WpClientManagement\API\Schedules;

use Carbon\Carbon;
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
            $schedules = Schedule::getSchedules(AuthUser::user()->guest_id, $page);         
        }
        else {
            $schedules = Schedule::getSchedules(AuthUser::user()->id, $page);
        }

        if(!$schedules) {
            return new \WP_REST_Response([
                'error' => 'No Schedules found',
            ]);
        }

        $guest_ids = $schedules->flatMap(fn($schedule) => json_decode($schedule->guest_ids, true) ?? [])
                               ->unique()
                               ->values()
                               ->all();

        $guests = Schedule::getGuests($guest_ids);

        $data = $schedules->map(function ($schedule) use ($guests) {

            $guestNames = $guests->filter(fn($guest) => in_array($guest->id, json_decode($schedule->guest_ids, true)))
                                 ->map(fn($guest) => $guest->wp_user->user_login)
                                 ->values()
                                 ->all();

            return [
                'id'            => $schedule->id,
                'creator'       => $schedule->author->wp_user->user_login,
                'host'          => $schedule->host->wp_user->user_login,
                'topic'         => $schedule->topic,
                'description'   => $schedule->description,
                'scheduled_at'  => Carbon::parse($schedule->scheduled_at)->format('h:i A D, d M'),
                'guests'        => $this->formatGuestNames($guestNames),
                'duration'      => $schedule->duration . ' ' . Schedule::DURATION_TYPES[$schedule->duration_type],
                'link'          => $schedule->link,
            ];
        });

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

    private function formatGuestNames(array $guestNames): string
    {
        $count = count($guestNames);

        if ($count === 1) {
            return $guestNames[0];
        } elseif ($count === 2) {
            return "{$guestNames[0]} & {$guestNames[1]}";
        }

        return "{$guestNames[0]}, {$guestNames[1]} & " . ($count - 2) . ' others';
    }
}