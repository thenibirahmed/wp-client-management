<?php
namespace WpClientManagement\API\DealPipelines;

use WpClientManagement\Models\DealPipeline;

class CreateDealPipeline{

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/deal-pipeline/create';

    protected array $rules = [
        'name' => 'required|string',
    ];

    protected array $validationMessages = [
        'name.required' => 'The name field is required.',
        'name.string' => 'The name field must be string.'
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_deal_pipeline'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function create_deal_pipeline(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $deal_pipeline = DealPipeline::create([
            'name' => $data['name'],
        ]);

        if(!$deal_pipeline) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        return new \WP_REST_Response([
            'message' => 'Deal Pipeline created successfully.',
            'deal_pipeline' => $deal_pipeline,
        ], 201);
    }
}