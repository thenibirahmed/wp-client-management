<?php

namespace WpClientManagement\API\Posts;

use WpClientManagement\Models\Post;

class DeletePost {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/posts/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:posts,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The Post ID is required.',
        'id.integer' => 'The Post ID must be an integer.',
        'id.exists' => 'The Post does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_post'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function delete_post(\WP_REST_Request $request) {
        global $validator;

        $post_id = $request->get_param('id');

        $data = ['id' => $post_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $post = Post::find($post_id);

        if (!$post) {
            return new \WP_REST_Response([
                'message' => 'Post not found.',
            ], 404);
        }

        $post->delete();

        return new \WP_REST_Response([
            'message' => 'Post deleted successfully.',
        ], 200);
    }
}