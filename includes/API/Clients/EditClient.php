<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;

class EditClient{

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/client/(?P<id>\d+)/edit';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'client_edit'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function client_edit(\WP_REST_Request $request)
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

        $responseData = [
            'id'           => $client->id,
            'name'         => $wp_user->user_login,
            'email'        => $wp_user->user_email,
            'address'      => $eic_crm_user->address,
            'organization' => $client->organization,
            'phone'        => $eic_crm_user->phone,
            'city'         => $eic_crm_user->city,
            'state'        => $eic_crm_user->state,
            'zip'          => $eic_crm_user->zip,
            'country'      => $eic_crm_user->country,
            'image_url'    => $client->image_url,
        ];

        return new \WP_REST_Response([
            'client' => $responseData
        ]);
    }
}