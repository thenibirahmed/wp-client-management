<?php
namespace WpClientManagement\API\Schedules;

use WpClientManagement\Helpers\AuthUser;
use WpClientManagement\Middlewares\AuthMiddleware;
use WpClientManagement\Models\Schedule;

class CreateSchedule {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/schedule/create';

    protected function rules()
    {
        return [
            'created_by'    => 'required|exists:eic_eic_crm_users,id',
            'hosted_by'     => 'required|exists:eic_eic_crm_users,id',
            'guest_ids'     => 'nullable|array',
            'topic'         => 'required|string',
            'scheduled_at'  => 'nullable|date_format:Y-m-d H:i:s',
            'duration'      => 'nullable|integer',
            'duration_type' => 'nullable|string|in:'.implode(',', array_keys(Schedule::DURATION_TYPES)),
            'link'          => 'nullable|string',
        ];
    }

    protected array $validationMessages = [
        'created_by.required'      => 'The created_by field is required.',
        'created_by.exists'        => 'The created_by field is invalid.',
        'hosted_by.required'       => 'The hosted_by field is required.',
        'hosted_by.exists'         => 'The hosted_by field is invalid.',
        'guest_ids.array'          => 'The guest_ids field is invalid.',
        'topic'                    => 'The topic field is required.',
        'scheduled_at.date_format' => 'The scheduled_at field is invalid.',
        'duration.integer'         => 'The duration field is invalid.',
        'duration_type'            => 'The duration_type field is invalid.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_schedule'),
            'permission_callback' => [AuthMiddleware::class, 'admin'],
        ]);
    }

    public function create_schedule(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();
        $data['created_by']     = AuthUser::user()->id;
        $data['hosted_by']      = isset($data['hosted_by'])      ? intval($data['hosted_by'])      : null;
        $data['guest_ids']      = isset($data['guest_ids'])      ? array_map('intval', $data['guest_ids']) : null;
        $data['topic']          = isset($data['topic'])          ? sanitize_text_field($data['topic']) : null;
        $data['description']    = isset($data['description'])    ? sanitize_text_field($data['description']) : null;
        $data['scheduled_at']   = isset($data['scheduled_at'])   ? sanitize_text_field($data['scheduled_at']) : null;
        $data['duration']       = isset($data['duration'])       ? intval($data['duration'])       : null;
        $data['duration_type']  = isset($data['duration_type'])  ? sanitize_text_field($data['duration_type']) : null;
        $data['link']           = isset($data['link'])           ? sanitize_text_field($data['link']) : null;

        $validator = $validator->make($data, $this->rules(), $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $schedule = Schedule::create([
            'created_by'    => $data['created_by'],
            'hosted_by'     => $data['hosted_by'],
            'guest_ids'     => json_encode($data['guest_ids'] ?? []),
            'topic'         => $data['topic'],
            'description'   => $data['description'],
            'scheduled_at'  => $data['scheduled_at'],
            'duration'      => $data['duration'],
            'duration_type' => $data['duration_type'],
            'link'          => $data['link'],
        ]);

        if(!$schedule) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        return new \WP_REST_Response([
            'message' => 'Schedule created successfully.',
        ], 201);
    }
}