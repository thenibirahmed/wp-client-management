<?php

namespace WpClientManagement\API\DealPipelines;

use WpClientManagement\Models\DealPipeline;

class GetSingleDealPipeline {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/deal-pipeline/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_deal_pipelines,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The deal_pipeline ID is required.',
        'id.integer' => 'The deal_pipeline ID must be an integer.',
        'id.exists' => 'The deal_pipeline does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_single_deal_pipeline'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_deal_pipeline(\WP_REST_Request $request) {
        global $validator;

        $deal_pipeline_id = $request->get_param('id');

        if(!isset($deal_pipeline_id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $deal_pipeline_id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $deal_pipeline = DealPipeline::find($data['id']);

        if(!$deal_pipeline) {
            return new \WP_REST_Response([
                'error' => 'No Deal Pipeline found',
            ]);
        }

        $response = [
            'data' => $deal_pipeline,
        ];

        return new \WP_REST_Response($response);
    }
}