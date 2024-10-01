<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;

class ClientBulkDelete {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/clients/bulk-delete';

    protected array $rules = [
        'bulk_ids'   => 'required|array',
    ];

    protected array $validationMessages = [
        'bulk_ids.required'  => 'The bulk IDs is required.',
        'bulk_ids.array'     => 'The bulk IDs must be an array.',
        'bulk_ids.*.integer' => 'The bulk IDs must be integers.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::DELETABLE,
            'callback' => array($this, 'bulk_delete_client'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function bulk_delete_client(\WP_REST_Request $request) {

        require_once(ABSPATH . 'wp-admin/includes/user.php');

        global $validator;

        $bulk_ids = is_string($request->get_param('bulk_ids')) ? explode(',', $request->get_param('bulk_ids')) : $request->get_param('bulk_ids');
        $bulk_ids = array_map('intval', $bulk_ids);

        $data = [];
        $data['bulk_ids'] = isset($bulk_ids) ? $bulk_ids : [];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        if (empty($bulk_ids)) {
            return new \WP_REST_Response([
                'message' => 'No IDs provided for deletion.',
            ], 400);
        }

        $bulk_delete_clients = Client::with('eic_crm_user.wp_user')
                        ->whereIn('id', $data['bulk_ids'])
                        ->whereHas('eic_crm_user', function($query) {
                            $query->whereHas('wp_user');
                        })
                        ->get();

        if ($bulk_delete_clients->isEmpty()) {
            return new \WP_REST_Response([
                'message' => 'No clients found.',
            ], 404);
        }

        try {
            foreach ($bulk_delete_clients as $client) {
                wp_delete_user($client->eic_crm_user->wp_user_id);
                $client->eic_crm_user->delete();
                $client->delete();
            }
        } catch (\Exception $e) {
            return new \WP_REST_Response([
                'message' => 'An error occurred while deleting clients.',
                'error'   => $e->getMessage(),
            ], 500);
        }

        return new \WP_REST_Response([
            'message' => 'Clients deleted successfully.',
        ], 200);
    }
}