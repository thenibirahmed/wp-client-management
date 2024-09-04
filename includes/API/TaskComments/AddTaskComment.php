<?php
namespace WpClientManagement\API\TaskComments;

use WpClientManagement\Models\TaskComment;

class AddTaskComment {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/add-comment';

    protected array $rules = [
        'task_id'         => 'required|exists:eic_tasks,id',
        'user_id'         => 'required|exists:eic_eic_crm_users,id',
        'reply_to'        => 'nullable|exists:eic_tasks,id',
        'comment'         => 'required|string',
    ];

    protected array $validationMessages = [
        'task_id.required'    => 'The task id is required.',
        'task_id.exists'      => 'The task id does not exist.',
        'user_id.required'    => 'The user id is required.',
        'user_id.exists'      => 'The user id does not exist.',
        'reply_to.exists'     => 'The reply to id does not exist.',
        'comment.required'    => 'The comment is required.',
        'comment.string'      => 'The comment must be a string.',
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

        $data['eic_crm_user_id'] = isset($data['user_id']) ? intval($data['user_id']) : null;
        $data['task_id'] = isset($data['task_id']) ? intval($data['task_id']) : null;
        $data['reply_to'] = isset($data['reply_to']) ? intval($data['reply_to']) : null;
        $data['comment'] = sanitize_textarea_field($data['comment']);

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