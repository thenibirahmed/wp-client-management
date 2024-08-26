<?php

namespace WpClientManagement\API\Clients; 

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class ClientOverview {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/client-overview';

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_clients_overview'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_clients_overview()
    {
        $clientsData = Client::getActiveClients();

        $clients = $clientsData->map(function($client) {
            return [
                'client_id'      => $client->id,
                'organization'   => $client->organization,
                'designation'    => $client->designation,
                'status'         => $client->status,
                // Include EicCrmUser data
                'wp_user_id'     => $client->eic_crm_user->wp_user_id,
                'phone'          => $client->eic_crm_user->phone,
                'address'        => $client->eic_crm_user->address,
                'city'           => $client->eic_crm_user->city,
                'state'          => $client->eic_crm_user->state,
                'zip'            => $client->eic_crm_user->zip,
                'country'        => $client->eic_crm_user->country,
                'role'           => $client->eic_crm_user->role,
            ];
        });


        $projects = Project::getActiveProjects()->count();

        $invoices = Invoice::getActiveProjectInvoices();

        $data = [
            'clients'  => $clients,
            // 'total_projects' => $projects,
            // 'total_invoices' => $invoices,
        ];

        return new \WP_REST_Response([
            'data' => $data,
        ]);
    }
}
