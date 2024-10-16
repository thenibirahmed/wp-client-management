<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Project;
use WpClientManagement\Models\Task;

class GetProjectTasks {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/project/(?P<id>\d+)/tasks';

    protected array $rules = [
        'id'           => 'required|integer|exists:eic_projects,id',
        'from'         => 'nullable|date',
        'to'           => 'nullable|date',
        'priority_id'  => 'nullable|exists:eic_priorities,id',
        'status_id'    => 'nullable|exists:eic_statuses,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The Project ID is required.',
        'id.integer'  => 'The Project ID must be an integer.',
        'id.exists'   => 'The Project does not exist.',
    ];

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_project_tasks'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_project_tasks(\WP_REST_Request $request)
    {
        global $validator;

        $id          = $request->get_param('id');
        $page        = $request->get_param('task');
        $from        = $request->get_param('from');
        $to          = $request->get_param('to');
        $priority_id = $request->get_param('priority_id');
        $status_id   = $request->get_param('status_id');
        $search      = $request->get_param('search');

        if(!isset($id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data[] = [];
        $data['id']           = $id;
        $data['from']         = $from ? $from. ' 00:00:00' : date('Y-m-d', strtotime('-3 months'));
        $data['to']           = $to ? $to. ' 23:59:59' : date('Y-m-d 23:59:59');
        $data['status_id']    = isset($status_id) ? intval($status_id) : null;
        $data['priority_id']  = isset($priority_id) ? intval($priority_id) : null;

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $project = Project::getProjectData($id);

        if(!$project) {
            return new \WP_REST_Response([
                'error' => 'Project not found',
            ], 404);
        }

        $tasks         = Task::getProjectTasks($data['id'], $page, $data['from'], $data['to'], $data['status_id'], $data['priority_id'], $search);

        $eic_crm_users = EicCrmUser::selectManager(false);

        $wp_user_ids   = $eic_crm_users->pluck('wp_user_id')->toArray();

        $wpUsersDb = get_users([
            'include' => $wp_user_ids,
        ]);

        $wpUsers = [];
        foreach ($wpUsersDb as $user) {
            $wpUsers[$user->ID] = [
                'name'  => $user->user_login,
                'email' => $user->user_email,
            ];
        }

        $taskWithDetails = $tasks->map(function ($task) use ($wpUsers) {
            $eic_crm_user      = $task->eic_crm_user;
            $assigned_user     = $task->assigned_user;
            $ownerWpUserId     = $eic_crm_user->wp_user_id;
            $assignedWpUserId  = $assigned_user->wp_user_id;
            $owner_wp_user     = $wpUsers[$ownerWpUserId] ?? [];
            $assigned_wp_user  = $wpUsers[$assignedWpUserId] ?? [];

            return [
                'id'           => $task->id,
                'title'        => $task->title,
                'owner'        => $owner_wp_user['name'] ?? '',
                'end_date'     => $task->end_date ? date('M d, Y', strtotime($task->end_date)) : null,
                'assigned_to'  => $assigned_wp_user['name'] ?? '',
                'status'       => $task->status->name,
                'priority'     => $task->priority->name,
            ];
        });

        return new \WP_REST_Response([
            'tasks' => $taskWithDetails,
            'pagination' => [
                'total'         => $tasks->total(),
                'per_page'      => $tasks->perPage(),
                'current_page'  => $tasks->currentPage(),
                'last_page'     => $tasks->lastPage(),
                'next_page_url' => $tasks->nextPageUrl(),
                'prev_page_url' => $tasks->previousPageUrl(),
            ],
        ]);
    }
}