<?php

namespace WpClientManagement\API\DealPipelines;

use WpClientManagement\Models\DealPipeline;

class UpdateDealPipeline {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/deal-pipeline/update/(?P<id>\d+)';

    protected array $rules = [
        'name' => 'required|string',
    ];

    protected array $validationMessages = [
        'name.required' => 'The name field is required.',
        'name.string' => 'The name field must be a string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_deal_pipeline'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_deal_pipeline(\WP_REST_Request $request) {
        global $validator;
        $id = $request->get_param('id');
        $data = $request->get_params();

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $deal_pipeline = DealPipeline::find($id);

        if (!$deal_pipeline) {
            return new \WP_REST_Response([
                'message' => 'DealPipeline not found.',
            ], 404);
        }

        $deal_pipeline->update([
            'name' => $data['name'],
        ]);

        return new \WP_REST_Response([
            'message' => 'DealPipeline updated successfully.',
            'status' => $deal_pipeline,
        ], 200);
    }
}