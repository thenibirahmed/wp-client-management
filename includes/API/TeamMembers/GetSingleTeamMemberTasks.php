<?php

namespace WpClientManagement\API\TeamMembers;

use WpClientManagement\Middlewares\AuthMiddleware;
use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Task;

class GetSingleTeamMemberTasks {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/team-member/(?P<id>\d+)/tasks';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_eic_crm_users,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The client ID is required.',
        'id.integer'  => 'The client ID must be an integer.',
        'id.exists'   => 'The team member does not exist.',
    ];

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_team_member_tasks'),
            'permission_callback' => [AuthMiddleware::class, 'teamMember'],
        ]);
    }

    public function get_team_member_tasks(\WP_REST_Request $request)
    {
        global $validator;

        $id     = $request->get_param('id');
        $page   = $request->get_param('task');
        $search = $request->get_param('search');

        if(!isset($id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $teamMember = EicCrmUser::find($id);

        if(!$teamMember) {
            return new \WP_REST_Response([
                'error' => 'No Team Member found',
            ]);
        }

        $tasks = Task::getTeamMemberTasks($id, $search, $page);
        $eic_crm_user_ids = $tasks->pluck('eic_crm_user_id');

        $eic_crm_users = EicCrmUser::whereIn('id',$eic_crm_user_ids)->get();

        $wp_user_ids = $eic_crm_users->pluck('wp_user_id')->toArray();

        $wpUsersDb = get_users([
            'include' => $wp_user_ids,
        ]);

        $wpUsers = [];
        foreach ($wpUsersDb as $user) {
            $wpUsers[$user->ID] = [
                'name'  => $user->user_login,
            ];
        }

        $taskWithDetails = $tasks->map(function ($task) use ($wpUsers) {
            $eic_crm_user      = $task->eic_crm_user;
            $WpUserId          = $eic_crm_user->wp_user_id;
            $owner_wp_user     = $wpUsers[$WpUserId] ?? [];
            return [
                'id'            => $task->id,
                'title'         => $task->title,
                'owner'         => $owner_wp_user['name'] ?? '',
                'end_date'      => $task->end_date ? date('M d, Y', strtotime($task->end_date)) : null,
                'status'        => $task->status->name,
                'priority'      => $task->priority->name,
                'comment_count' => $task->comments->count(),
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