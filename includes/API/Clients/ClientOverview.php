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
        $invoices  = Invoice::whereIn('client_id', $clientIds)->get();

        $invoiceTotals = $invoices->groupBy('client_id')->map(function ($group) {
            return $group->sum('total');
        });

        $clientsWithDetails = $clientsData->map(function ($client) use ($wpUsers, $invoiceTotals) {
            $eicCrmUser = $client->eic_crm_user;
            $wpUserId   = $eicCrmUser->wp_user_id;
            $wpUser     = $wpUsers[$wpUserId] ?? [];

            $totalInvoiceAmount = $invoiceTotals->get($client->id, 0);

            return [
                'client_id'             => $client->id,
                'total_invoice_amount'  => $totalInvoiceAmount,
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
