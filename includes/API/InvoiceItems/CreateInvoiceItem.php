<?php

namespace WpClientManagement\API\InvoiceItems;

use WpClientManagement\Models\InvoiceItem;

class CreateInvoiceItem {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = 'add-invoice-item';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'add_invoice_items'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function add_invoice_items(\WP_REST_Request $request) {

        $page = $request->get_params('page');

        return new \WP_REST_Response($request->get_params());

    }
}