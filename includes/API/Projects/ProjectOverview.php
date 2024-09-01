<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class ProjectOverview {

    private $namespace = 'wp-client-management/v1';
    private $endpoint = '/project-overview';

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_project_overview'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_project_overview()
    {
        $projects = Project::pluck('id')->toArray();
        $invoices  = Invoice::whereIn('client_id', $projects)->get();

        $totalInvoicesAmount = $invoices->sum('total');
        $totalInvoiceCount = $invoices->count();

        $totalPaidInvoices = $invoices->where('status.type','invoice')
                            ->where('status.name','paid');

        $totalPaidInvoiceAmount = $totalPaidInvoices->sum('total');
        $totalPaidInvoiceCount = $totalPaidInvoices->count();

        $totalUnpaidInvoiceAmount = $totalInvoicesAmount - $totalPaidInvoiceAmount;
        $totalUnpaidInvoiceCount = $totalInvoiceCount - $totalPaidInvoiceCount;

        return new \WP_REST_Response([
            'topBar' => [
                'invoice' => [
                    'total' => $totalInvoicesAmount,
                    'count' => $totalInvoiceCount
                ],
                'revenue' => [
                    'total' => $totalPaidInvoiceAmount,
                    'count' => $totalPaidInvoiceCount
                ],
                'due' => [
                    'total' => $totalUnpaidInvoiceAmount,
                    'count' => $totalUnpaidInvoiceCount
                ]
            ]
        ]);

    }
}