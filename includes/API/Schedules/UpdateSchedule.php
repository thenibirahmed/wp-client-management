<?php

namespace WpClientManagement\API\Schedules;

use WpClientManagement\Models\Schedule;

class UpdateSchedule {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/schedule/update/(?P<id>\d+)';

    protected array $rules = [
        'eic_crm_user_id' => 'nullable|exists:eic_eic_crm_users,id',
        'client_id' => 'required|exists:eic_clients,id',
        'date' => 'required|date_format:Y-m-d H:i:s',
        'duration' => 'nullable|integer',
        'link' => 'nullable|string',
        'hosts' => 'nullable|json',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.exists' => 'The selected EicCrmUser does not exist.',
        'client_id.required' => 'The Client ID is required.',
        'client_id.exists' => 'The selected Client does not exist.',
        'date.required' => 'The date and time is required.',
        'date.date_format' => 'The date and time must be in the format Y-m-d H:i:s.',
        'duration.integer' => 'The duration must be an integer.',
        'link.string' => 'The link must be a valid string.',
        'hosts.json' => 'The hosts must be a valid JSON string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_schedule'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_schedule(\WP_REST_Request $request) {
        global $validator;

        $id = intval($request->get_param('id'));
        $data = $request->get_params();

        $data['eic_crm_user_id'] = isset($data['eic_crm_user_id']) ? intval($data['eic_crm_user_id']) : null;
        $data['client_id'] = intval($data['client_id']);
        $data['date'] = sanitize_text_field($data['date'] ?? '');
        $data['duration'] = isset($data['duration']) ? intval($data['duration']) : null;
        $data['link'] = sanitize_text_field($data['link'] ?? '');
        $data['hosts'] = isset($data['hosts']) ? json_encode(array_map('sanitize_text_field', json_decode($data['hosts'], true) ?? [])) : json_encode([]);

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $schedule = Schedule::find($id);

        if (!$schedule) {
            return new \WP_REST_Response([
                'message' => 'Schedule not found.',
            ], 404);
        }

        $schedule->update([
            'eic_crm_user_id' => $data['eic_crm_user_id'],
            'client_id' => $data['client_id'],
            'date' => $data['date'],
            'duration' => $data['duration'],
            'link' => $data['link'],
            'hosts' => $data['hosts'],
        ]);

        return new \WP_REST_Response([
            'message' => 'Schedule updated successfully.',
            'status' => $schedule,
        ], 200);
    }
}