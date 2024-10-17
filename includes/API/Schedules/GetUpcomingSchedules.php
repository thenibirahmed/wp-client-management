<?php

namespace WpClientManagement\API\Schedules;

use Carbon\Carbon;
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
            'callback' => [$this, 'get_upcoming_schedules'],
            'permission_callback' => [AuthMiddleware::class, 'admin'],
        ]);
    }

    public function get_upcoming_schedules(\WP_REST_Request $request)
    {
        global $validator;

        $date = $request->get_param('date') ?: Carbon::now()->toDateString();

        $from = Carbon::parse($date)->startOfDay();
        $to   = Carbon::parse($date)->endOfDay();

        $validator = $validator->make(['date' => $date], $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response(['errors' => $validator->errors()], 400);
        }

        $schedules = Schedule::whereBetween('scheduled_at', [$from, $to])->get();

        if ($schedules->isEmpty()) {
            return new \WP_REST_Response(['schedules' => []]);
        }

        $guest_ids = $schedules->flatMap(fn($schedule) => json_decode($schedule->guest_ids, true) ?? [])
                               ->unique()
                               ->values()
                               ->all();

        $guests = EicCrmUser::getGuests($guest_ids);

        $data = $schedules->map(function ($schedule) use ($guests) {
            $guestIdsInSchedule = json_decode($schedule->guest_ids, true) ?? [];
            $guestNames = array_map(fn($id) => $guests[$id]->wp_user->user_login ?? 'Guest', $guestIdsInSchedule);

            return [
                'id' => $schedule->id,
                'topic' => $schedule->topic,
                'scheduled_at' => Carbon::parse($schedule->scheduled_at)->format('h:i A D, d M'),
                'guests' => $this->formatGuestNames($guestNames),
            ];
        })->toArray();

        return new \WP_REST_Response(['schedules' => $data]);
    }

    private function formatGuestNames(array $guestNames): string
    {
        $count = count($guestNames);

        if ($count === 1) {
            return $guestNames[0];
        } elseif ($count === 2) {
            return "{$guestNames[0]} & {$guestNames[1]}";
        }

        return "{$guestNames[0]} & " . ($count - 1) . ' others';
    }
}