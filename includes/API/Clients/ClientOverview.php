<?php
namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class ClientOverview {

    private $namespace = 'wp-client-management/v1';
    private $endpoint = '/clients-overview';

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
        $clientIds = Client::pluck('id')->toArray();
        $invoices  = Invoice::getActiveClientsInvoices($clientIds);

        $projectCount = Project::getActiveProjects()->count();

        $invoiceTotalsByClient = $invoices->groupBy('client_id')->map(function ($invoices) {

            $total  = $invoices->sum('total');
            $paid   = $invoices->where('status.name', 'paid')->where('status.type', 'invoice')->sum('total');
            $unpaid = $total - $paid;

            return [
                'total'    => $total,
                'revenue'  => $paid,
                'due'      => $unpaid,
            ];
        });

        $totalInvoices = $invoiceTotalsByClient->sum('total');
        $totalRevenue  = $invoiceTotalsByClient->sum('revenue');
        $totalDue      = $invoiceTotalsByClient->sum('due');

        $totalInvoiceCount  = $invoices->count();
        $paidInvoiceCount   = $invoices->where('status.name', 'paid')->where('status.type', 'invoice')->count();
        $unpaidInvoiceCount = $totalInvoiceCount - $paidInvoiceCount;

        $topBar = [
            "invoice" => [
                'name'    => 'Total Invoice',
                'amount'  => $totalInvoices,
                'subText' => $totalInvoiceCount . ($totalInvoiceCount == 1 ? ' invoice' : ' invoices')
            ],
            "revenue" => [
                'name'    => 'Total Revenue',
                'amount'  => $totalRevenue,
                'subText' => $paidInvoiceCount . ($paidInvoiceCount == 1 ? ' invoice' : ' invoices')
            ],
            "due" => [
                'name'    => 'Total Due',
                'amount'  => $totalDue,
                'subText' => $unpaidInvoiceCount . ($unpaidInvoiceCount == 1 ? ' invoice' : ' invoices')
            ],
            "project" => [
                'name'    => 'Total Projects',
                'amount'  => $projectCount,
                'subText' => 'last 3 months'
            ]
        ];

        return new \WP_REST_Response([
            'topBar'     => $topBar,
        ]);
    }
}