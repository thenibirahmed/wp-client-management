<?php
namespace WpClientManagement\API\Tasks;

use WpClientManagement\Models\Task;

class CreateTask {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/task/create';

    protected array $rules = [
        'user_id'       => 'required|exists:eic_eic_crm_users,id',
        'assigned_to'   => 'nullable|exists:eic_eic_crm_users,id',
        'project_id'    => 'required|exists:eic_projects,id',
        'title'         => 'required|string',
        'start_date'    => 'nullable|date',
        'due_date'      => 'nullable|date',
        'status_id'     => 'nullable|exists:eic_statuses,id',
        'priority_id'   => 'nullable|exists:eic_priorities,id',
        'description'   => 'nullable|string',
    ];

    protected array $validationMessages = [
        'user_id.required'      => 'The user field is required.',
        'user_id.exists'        => 'The selected user does not exist.',
        'assigned_to.exists'    => 'The assigned user does not exist.',
        'project_id.required'   => 'The project field is required.',
        'project_id.exists'     => 'The selected project does not exist.',
        'title.required'        => 'The title field is required.',
        'title.string'          => 'The title must be a valid string.',
        'start_date.date'       => 'The start date must be a valid date.',
        'due_date.date'         => 'The due date must be a valid date.',
        'status_id.exists'      => 'The selected status does not exist.',
        'priority_id.exists'    => 'The selected priority does not exist.',
        'description.string'    => 'The description must be a valid string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_task'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function create_task(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();

        $user = wp_get_current_user();
        $data['eic_crm_user_id'] = $user->ID;
        $data['assigned_to']     = isset($data['assigned_to']) ? intval($data['assigned_to']) : 0;
        $data['project_id']      = isset($data['project_id']) ? intval($data['project_id']) : 0;
        $data['status_id']       = isset($data['status_id']) ? intval($data['status_id']) : 0;
        $data['priority_id']     = isset($data['priority_id']) ? intval($data['priority_id']) : 0;
        $data['title']           = sanitize_text_field($data['title'] ?? '');
        $data['description']     = sanitize_textarea_field($data['description'] ?? '');
        $data['start_date']      = sanitize_text_field($data['start_date'] ?? '');
        $data['due_date']        = sanitize_text_field($data['due_date'] ?? '');

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $task = Task::create($data);

        if(!$task) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        $response = [
            'id'           => $task->id,
            'title'        => $task->title,
            'description'  => $task->description,
            'start_date'   => $task->start_date,
            'due_date'     => $task->due_date,
            'assigned_to'  => $task->assigned_to,
            'project_id'   => $task->project_id,
            'status_id'    => $task->status_id,
            'priority_id'  => $task->priority_id,
        ];

        return new \WP_REST_Response([
            'message' => 'Task created successfully.',
            'task' => $response,
        ], 201);
    }
}