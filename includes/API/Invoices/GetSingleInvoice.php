<?php 

namespace WpClientManagement\API\Invoices;

class GetSingleInvoice {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/invoice/(?P<id>\d+)';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE, // GET
            'callback' => array($this, 'get_single_invoice'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_single_invoice(\WP_REST_Request $request) {
        $data = $request->get_params();

        if(!isset($data['id'])) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $invoice = get_invoice($data['id']);

        if(!$invoice) {
            return new \WP_REST_Response([
                'error' => 'No Invoice found',
            ]);
        }

        $response = [
            'data' => $invoice,
        ];

        return new \WP_REST_Response($response);
    }
}