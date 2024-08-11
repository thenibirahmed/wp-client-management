<?php 

namespace WpClientManagement\API\Notes;

class GetSingleNote {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/note/(?P<id>\d+)';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_note'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_note(\WP_REST_Request $request) {
        $data = $request->get_params();

        if(!isset($data['id'])) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $note = get_note($data['id']);

        if(!$note) {
            return new \WP_REST_Response([
                'error' => 'No Note found',
            ]);
        }

        $response = [
            'data' => $note,
        ];

        return new \WP_REST_Response($response);
    }
}