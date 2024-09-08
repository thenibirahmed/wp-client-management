<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;

class GetSelectedClientDetails{

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/client/(?P<id>\d+)/details';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'selected_client_details'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function selected_client_details(\WP_REST_Request $request)
    {
        $id = $request->get_param('id');

        if(!$id) {
            return new \WP_REST_Response([
                'error' => 'Id param required',
            ]);
        }

        $client = Client::getClientData($id);

        if(!$client) {
            return new \WP_REST_Response([
                'error' => 'No Client found',
            ]);
        }

        $eic_crm_user = $client->eic_crm_user;
        $wp_user_id   = $eic_crm_user->wp_user_id;

        $wp_user      = get_user_by('id',$wp_user_id);

        if(!$wp_user) {
            return new \WP_REST_Response([
                'error' => 'User data not found',
            ]);
        }

        return new \WP_REST_Response([
            'client_details' => [
                'id'      => $client->id,
                'address' => $eic_crm_user->address,
                'name'    => $wp_user->user_login,
                'email'   => $wp_user->user_email
            ]
            ]);

    }
}