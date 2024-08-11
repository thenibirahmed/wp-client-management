<?php 

namespace WpClientManagement\API\DealPipelines;

class GetSingleDealPipeline {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/deal-pipeline/(?P<id>\d+)';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_deal_pipeline'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_deal_pipeline(\WP_REST_Request $request) {
        $data = $request->get_params();

        if(!isset($data['id'])) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $deal_pipeline = get_deal_pipeline($data['id']);
        // $post = Client::find($data['id']);

        if(!$deal_pipeline) {
            return new \WP_REST_Response([
                'error' => 'No deal pipeline found',
            ]);
        }

        $response = [
            'data' => $deal_pipeline,
        ];

        return new \WP_REST_Response($response);
    }
}