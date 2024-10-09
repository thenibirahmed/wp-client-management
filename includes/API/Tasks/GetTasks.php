<?php

namespace WpClientManagement\API\Tasks;

use WpClientManagement\Helpers\AuthUser;
use WpClientManagement\Middlewares\AuthMiddleware;
use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Task;

class GetTasks {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/tasks';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_tasks'),
            'permission_callback' => [AuthMiddleware::class, 'teamMember'],
        ]);
    }

    public function get_tasks(\WP_REST_Request $request) {

        $page   = $request->get_param('task');
        $search = $request->get_param('search');

        if(AuthUser::user()->role == 'admin') {

            $tasks = Task::paginate(2, ['*'], 'task', $page);

        }elseif(AuthUser::user()->role == 'team-member') {

            $tasks = Task::getTeamMemberTasks(AuthUser::user()->id, $search, $page);

        }

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