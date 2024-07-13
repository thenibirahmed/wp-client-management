<?php 

namespace WpClientManagement\API;

use WpClientManagement\Models\Post;

class Clients {
    public function __construct() {
        register_rest_route('wp-client-management/v1', '/posts', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_posts'),
            'permission_callback' => 'is_user_logged_in',
        ));
    }

    public function get_posts(\WP_REST_Request $request) {
        $page = $request->get_param('page');

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