<?php 

namespace WpClientManagement\API\Tasks;

use WpClientManagement\Models\Task;

class GetTasks {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/tasks';

    protected array $rules = [
        'eic_crm_user_id' => 'required',
        'project_id' => 'required',
        'title' => 'required|string|max:255',
        'start_date' => 'nullable|date',
        'due_date' => 'nullable|date',
        'text' => 'nullable|string',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The eic_crm_user_id field is required.',
        'project_id.required' => 'The project_id field is required.',
        'title.required' => 'The title field is required.',
        'title.string' => 'The title must be a string.',
        'title.max' => 'The title may not be greater than 255 characters.',
        'start_date.date' => 'The start_date field must be a date',
        'due_date.date' => 'The end_date must be a date',
        'text.string' => 'The text must be a string'
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_tasks'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_tasks(\WP_REST_Request $request) {
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

        $tasks = Task::paginate(20, ['*'], 'page', $page);

        $data = [];
        foreach ($tasks as $task) {
            $data[] = [
                'id' => $task->ID,
                'eic_crm_user' => $task->eic_crm_user->name,
                'project' => $task->project->name,
                'title' => $task->title,
                'start_date' => $task->start_date,
                'due_date' => $task->due_date,
                'status' => $task->status->name,
                'priority' => $task->priority->name,
                'text' => $task->text,
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $tasks->ftotal(),
                'per_page' => $tasks->perPage(),
                'current_page' => $tasks->currentPage(),
                'last_page' => $tasks->lastPage(),
                'next_page_url' => $tasks->nextPageUrl(),
                'prev_page_url' => $tasks->previousPageUrl(),
            ],
        ]);
    }
}