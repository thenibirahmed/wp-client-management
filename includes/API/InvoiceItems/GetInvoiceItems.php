<?php

namespace WpClientManagement\API\InvoiceItems;

use WpClientManagement\Models\InvoiceItem;

class GetInvoiceItems {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/invoice/(?P<id>\d+)/items';


    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_invoice_items'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_invoice_items(\WP_REST_Request $request) {

        $page = $request->get_params('page');

        // return new \WP_REST_Response(InvoiceItem::all());

    }
}