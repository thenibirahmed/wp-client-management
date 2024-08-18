<?php

namespace WpClientManagement\API\Posts;

use WpClientManagement\Models\Post;

class GetPosts {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/posts';

    protected array $rules = [
        'title' => 'required|string|max:255',
        'content' => 'required|string',
    ];

    protected array $validationMessages = [
        'title.required' => 'The title field is required.',
        'title.string' => 'The title must be a string.',
        'title.max' => 'The title may not be greater than 255 characters.',
        'content.required' => 'The content field is required.',
        'content.string' => 'The content must be a string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_posts'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_posts(\WP_REST_Request $request) {

        $page = $request->get_params('page');


        $posts = Post::paginate(20, ['*'], 'page', $page);

        $data = [];
        foreach ($posts as $post) {
            $data[] = [
                'id' => $post->ID,
                'title' => $post->post_title,
                'content' => $post->post_content,
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $posts->total(),
                'per_page' => $posts->perPage(),
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'next_page_url' => $posts->nextPageUrl(),
                'prev_page_url' => $posts->previousPageUrl(),
            ],
        ]);
    }
}