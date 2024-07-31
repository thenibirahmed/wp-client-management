<?php 

namespace WpClientManagement\API\Priorities;

use WpClientManagement\Models\Priority;

class GetPriorities {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/priorities';

    protected array $rules = [
        'name' => 'required|string',
        'type' => 'required|string'
    ];

    protected array $validationMessages = [
        'name.required' => 'The name field is required.',
        'name.string' => 'The name must be a string.',
        'type.required' => 'The type field is required.',
        'type.string' => 'The type must be a string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_priorities'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_priorities(\WP_REST_Request $request) {
        global $validator;

        $page = $request->get_params('page');

        // ------------------- Validation Example -------------------
        // $data = $request->get_params();

        // $validator = $validator->make($data, $this->rules, $this->validationMessages);

        // if($validator->fails()) {
        //     return new \WP_REST_Response([
        //         'errors' => $validator->errors(),
        //     ]);
        // }
        // ------------------- Validation Example -------------------

        $priorities = Priority::paginate(20, ['*'], 'page', $page);

        $data = [];
        foreach ($priorities as $priority) {
            $data[] = [
                'id' => $priority->ID,
                'name' => $priority->name,
                'type' => $priority->type,
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $priorities->ftotal(),
                'per_page' => $priorities->perPage(),
                'current_page' => $priorities->currentPage(),
                'last_page' => $priorities->lastPage(),
                'next_page_url' => $priorities->nextPageUrl(),
                'prev_page_url' => $priorities->previousPageUrl(),
            ],
        ]);
    }
}