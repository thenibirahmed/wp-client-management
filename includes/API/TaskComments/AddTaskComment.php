<?php
namespace WpClientManagement\API\TaskComments;

use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\TaskComment;

class AddTaskComment {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/add-comment';

    protected array $rules = [
        'eic_crm_user_id' => 'required|exists:eic_eic_crm_users,id',
        'task_id'         => 'required|exists:eic_tasks,id',
        'reply_to'        => 'nullable|exists:eic_task_comments,id',
        'comment'         => 'required|string',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The EicCrmUser is requird',
        'eic_crm_user_id.exists'   => 'The EicCrmUser id does not exists.',
        'task_id.required'         => 'The task id is required.',
        'task_id.exists'           => 'The task id does not exists.',
        'user_id.required'         => 'The user is invalid.',
        'user_id.exists'           => 'The user id does not exists.',
        'reply_to.exists'          => 'The reply to id does not exists.',
        'comment.required'         => 'The comment is required.',
        'comment.string'           => 'The comment must be a string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_comment'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function create_comment(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();

        $currentWpUser           = wp_get_current_user();
        $eicCrmUserId            = EicCrmUser::whereWpUserId($currentWpUser->ID)->pluck('id')->first();
        $data['eic_crm_user_id'] = isset($eicCrmUserId) ? intval($eicCrmUserId) : null;
        $data['task_id']         = isset($data['task_id']) ? intval($data['task_id']) : null;
        $data['reply_to']        = isset($data['reply_to']) ? intval($data['reply_to']) : null;
        $data['comment']         = sanitize_textarea_field($data['comment']);

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $comment = TaskComment::create($data);

        if(!$comment) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        $response = [
            'id'         => $comment->id,
            'task_id'    => $comment->task_id,
            'comment'    => $comment->comment,
        ];

        return new \WP_REST_Response([
            'message' => 'Comment added successfully.',
            'comment' => $response,
        ], 201);
    }
}