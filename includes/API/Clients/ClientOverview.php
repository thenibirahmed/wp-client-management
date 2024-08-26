<?php
namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;

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

    public function get_clients_overview() {

        $clientsData = Client::getActiveClients();

        $wp_user_ids = $clientsData->pluck('eic_crm_user.wp_user_id')->toArray();

        $wpUsersDb = get_users([
            'include' => $wp_user_ids,
        ]);
        
        $wpUsers = [];
        foreach ($wpUsersDb as $user) {
            $wpUsers[$user->ID] = [
                'name'  => $user->user_login,
                'email' => $user->user_email,
            ];
        }

        $clientIds = $clientsData->pluck('id')->toArray();
        $invoices  = Invoice::whereIn('client_id', $clientIds)
                    ->with('status')
                    ->get();

        $invoiceTotalsByClient = $invoices->groupBy('client_id')->map(function ($invoices) {

            $total = $invoices->sum('total');
            $paid = $invoices->where('status.name', 'paid')->where('status.type', 'invoice')->sum('total');
            $unpaid = $total - $paid;

            return [
                'total' => $total,
                'revenue'  => $paid,
                'due' => $unpaid,
            ];
        });

        $clientsWithDetails = $clientsData->map(function ($client) use ($wpUsers, $invoiceTotalsByClient) {
            $eicCrmUser = $client->eic_crm_user;
            $wpUserId   = $eicCrmUser->wp_user_id;
            $wpUser     = $wpUsers[$wpUserId] ?? [];

            $invoices = $invoiceTotalsByClient->get($client->id, [
                'total' => 0, 'revenue' => 0, 'due' => 0
            ]);

            return [
                'client_id'             => $client->id,
                'invoice'               => $invoices,
                'country'               => $eicCrmUser->country,
                'organization'          => $client->organization,
                'project_count'         => $client->projects_count,
                'name'                  => $wpUser['name'] ?? null,
                'email'                 => $wpUser['email'] ?? null,
            ];
        });

        return new \WP_REST_Response([
            'clients' => $clientsWithDetails,
        ]);
    }
}
