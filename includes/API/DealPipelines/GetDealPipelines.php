<?php

namespace WpClientManagement\API\DealPipelines;

use WpClientManagement\Models\DealPipeline;

class GetDealPipelines {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/deal-pipelines';

    protected array $rules = [
        'name' => 'required|string|max:255'
    ];

    protected array $validationMessages = [
        'name.required' => 'The name field is required.',
        'name.string' => 'The name must be a string.',
        'name.max' => 'The name may not be greater than 255 characters.'
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_dealpipelines'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_dealpipelines(\WP_REST_Request $request) {
        $page = $request->get_params('page');

        $dealpipelines = DealPipeline::paginate(5, ['*'], 'page', $page);

        $data = [];
        foreach ($dealpipelines as $dealpipeline) {
            $data[] = [
                'id' => $dealpipeline->ID,
                'name' => $dealpipeline->name
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total' => $dealpipelines->total(),
                'per_page' => $dealpipelines->perPage(),
                'current_page' => $dealpipelines->currentPage(),
                'last_page' => $dealpipelines->lastPage(),
                'next_page_url' => $dealpipelines->nextPageUrl(),
                'prev_page_url' => $dealpipelines->previousPageUrl(),
            ],
        ]);
    }
}