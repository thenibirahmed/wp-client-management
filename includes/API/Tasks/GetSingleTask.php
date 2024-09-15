<?php
namespace WpClientManagement\API\Tasks;

use WpClientManagement\Models\Task;

class GetSingleTask {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/task/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_tasks,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The task ID is required.',
        'id.integer'  => 'The task ID must be an integer.',
        'id.exists'   => 'The task does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_single_task'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_task(\WP_REST_Request $request) {
        global $validator;

        $task_id = $request->get_param('id');

        if(!isset($task_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $task_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $task = Task::getProjectTask($data['id']);

        if(!$task) {
            return new \WP_REST_Response([
                'error' => 'No Task found',
            ]);
        }

        return new \WP_REST_Response('Debugging....');

        $comments       = $task->comments()->whereNull('reply_to')->get();
        $wp_user_ids    = $task->eic_crm_user->pluck('wp_user_id')->toArray();

        $comments_users = get_users(['include' => $wp_user_ids]);

        $wpUsers = [];
        foreach ($comments_users as $user) {
            $wpUsers[$user->ID] = [
                'name'  => $user->user_login,
            ];
        }

        $commentWithDetails = $comments->map(function ($comment) use ($wpUsers) {
            $eic_crm_user = $comment->eic_crm_user;
            $wp_user_id   = $eic_crm_user->wp_user_id;
            $wp_user      = $wpUsers[$wp_user_id] ?? null;

            $replies = $comment->where('reply_to', $comment->id)->get();

            $replies = $replies->map(function ($reply) use ($wpUsers) {
                $eic_crm_user = $reply->eic_crm_user;
                $wp_user_id   = $eic_crm_user->wp_user_id;
                $wp_user      = $wpUsers[$wp_user_id] ?? null;

                return [
                    'id'     => $reply->id,
                    'reply'  => $reply->comment,
                    'author' => $wp_user['name'] ?? null,
                    'date'   => $reply->created_at ? human_time_diff(strtotime($reply->created_at), current_time('timestamp')) . ' ago' : null
                ];
            });

            return [
                'id'      => $comment->id,
                'comment' => $comment->comment,
                'author'  => $wp_user['name'] ?? null,
                'date'    => $comment->created_at ? human_time_diff(strtotime($comment->created_at), current_time('timestamp')) . ' ago' : null,
                'replies' => $replies
            ];
        });

        $owner_wp_user_id     = $task->eic_crm_user->wp_user_id;
        $assignee_wp_user_id  = $task->assigned_user->wp_user_id;

        $ownerDb     = get_user_by('id',$owner_wp_user_id);
        $assigneeDb  = get_user_by('id',$assignee_wp_user_id);

        $response = [
            'title'       => $task->title,
            'owner'       => $ownerDb->user_login,
            'assignee_to' => $assigneeDb->user_login,
            'status'      => $task->status->name,
            'priority'    => $task->priority->name,
            'description' => $task->description,
            'comments'    => $commentWithDetails
        ];

        return new \WP_REST_Response($response);
    }
}