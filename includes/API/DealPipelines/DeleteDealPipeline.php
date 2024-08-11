<?php

namespace WpClientManagement\API\DealPipelines;

use WpClientManagement\Models\DealPipeline;

class DeleteDealPipeline {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/deal-pipelines/(?P<id>\d+)';

    protected array $rules = [
        'id' => 'required|integer|exists:deal_pipelines,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The deal_pipeline ID is required.',
        'id.integer' => 'The deal_pipeline ID must be an integer.',
        'id.exists' => 'The deal_pipeline does not exist.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::DELETABLE, // DELETE
            'callback' => array($this, 'delete_deal_pipeline'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function delete_deal_pipeline(\WP_REST_Request $request) {
        global $validator;

        $deal_pipeline_id = $request->get_param('id');

        // ------------------- Validation Example -------------------
        // $data = ['id' => $deal_pipeline_id];

        // $validator = $validator->make($data, $this->rules, $this->validationMessages);

        // if ($validator->fails()) {
        //     return new \WP_REST_Response([
        //         'errors' => $validator->errors(),
        //     ], 400);
        // }
        // ------------------- Validation Example -------------------

        $delete_deal_pipeline = DealPipeline::find($deal_pipeline_id);

        if (!$deal_pipeline) {
            return new \WP_REST_Response([
                'message' => 'Deal Pipeline not found.',
            ], 404);
        }

        $deal_pipeline->delete();

        return new \WP_REST_Response([
            'message' => 'Deal Pipeline deleted successfully.',
        ], 200);
    }
}