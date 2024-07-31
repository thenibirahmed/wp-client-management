<?php 

namespace WpClientManagement\API\Schedules;

use WpClientManagement\Models\Schedule;

class GetSchedules {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/schedules';

    protected array $rules = [
        'eic_crm_user_id' => 'required',
        'client_id' => 'required',
        'date' => 'required|date',
        'duration' => 'nullable|integer',
        'link' => 'nullable|string',
        'hosts' => 'nullable|json'
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The eic_crm_user_id field is required.',
        'client_id.required' => 'The client_id field is required.',
        'date.required' => 'The date field is required.',
        'date.date' => 'The date field must be a valid date.',
        'duration.integer' => 'The duration field must be an integer.',
        'link.string' => 'The link must be a string.',
        'hosts.json' => 'The hosts must contain a json representation.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_schedules'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_schedules(\WP_REST_Request $request) {
        global $validator;

        $page = $request->get_params('page');

        // ------------------- Validation Example -------------------
        // $data = $request->get_params();

        // $validator = $validator->make($data, $this->rules, $this->validationMessages);

        // if($validator->fails()) {
        //     return new \WP_REST_Response([
        //         'errors' => $validator->errors(),
        //     ]);
        // }
        // ------------------- Validation Example -------------------

        $schedules = Schedule::paginate(20, ['*'], 'page', $page);

        $data = [];
        foreach ($schedules as $schedule) {
            $data[] = [
                'id' => $schedule->ID,
                'eic_crm_user' => $schedule->eic_crm_user->name,
                'client' => $schedule->client->name,
                'date' => $schedule->date,
                'duration' => $schedule->duration,
                'link' => $schedule->link,
                'hosts' => $schedule->hostsschedules
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