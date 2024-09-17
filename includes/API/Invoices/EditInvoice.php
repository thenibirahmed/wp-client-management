<?php

namespace WpClientManagement\API\Invoices;

use WpClientManagement\Models\Invoice;

class EditInvoice {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/invoice/(?P<id>\d+)/edit';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'edit_invoice'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function edit_invoice(\WP_REST_Request $request) {

        $id = $request->get_param('id');

        if(!$id) {
            return new \WP_REST_Response([
                'error' => 'Id param required',
            ]);
        }

        $invoice = Invoice::find($id);

        if (!$invoice) {
            return new \WP_REST_Response([
                'message' => 'Invoice not found.',
            ], 404);
        }


        return new \WP_REST_Response([
            'invoice' => $invoice
        ]);

        $noteResponse = [
            'id'         => $note->id,
            'project_id' => $note->project_id,
            'client_id'  => $note->client_id
        ];

        return new \WP_REST_Response([
            'note' => $noteResponse,
        ], 200);
    }
}