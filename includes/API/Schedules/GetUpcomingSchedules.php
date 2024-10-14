<?php

namespace WpClientManagement\API\Schedules;

use DateTime;
use WpClientManagement\Middlewares\AuthMiddleware;
use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Schedule;

class GetUpcomingSchedules {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/upcoming-schedules';


    protected array $rules = [
        'date' => 'nullable|date_format:Y-m-d',
    ];

    protected array $validationMessages = [
        'date' => 'Invalid date format',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_upcoming_schedules'),
            'permission_callback' => [AuthMiddleware::class, 'admin'],
        ]);
    }

    public function get_upcoming_schedules(\WP_REST_Request $request)
    {
        global $validator;

        $date = $request->get_param('date');

        $data['date'] = $date ?: date('Y-m-d');

        $from = $data['date'] . ' 00:00:00';
        $to   = $data['date'] . ' 23:59:59';

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $schedules  = Schedule::whereBetween('scheduled_at', [$from, $to])->get();

        if($schedules->isEmpty()) {
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
                'topic'        => $schedule->topic,
                'scheduled_at' => $schedule->scheduled_at ? (new DateTime($schedule->scheduled_at))->format('h:i A D, d M') : '',
                'guests' => count($guestNames) === 1
                ? $guestNames[0]
                : (count($guestNames) === 2
                ? $guestNames[0] . ' & ' . $guestNames[1]
                : $guestNames[0] . ' & ' . (count($guestNames) - 1) . ' others'
                )
            ];
        }

        return new \WP_REST_Response([
            'schedules'  => $data,
        ]);
    }
}