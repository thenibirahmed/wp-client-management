<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class ProjectOverview {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/project-overview';

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
        $projects     = Project::pluck('id')->toArray();
        $projectCount = count($projects);
        $invoices     = Invoice::whereIn('client_id', $projects)->get();

        $totalInvoicesAmount = $invoices->sum('total');
        $totalInvoiceCount   = $invoices->count();

        $totalPaidInvoices = $invoices->where('status.type','invoice')
                            ->where('status.name','paid');

        $totalPaidInvoiceAmount = $totalPaidInvoices->sum('total');
        $totalPaidInvoiceCount  = $totalPaidInvoices->count();

        $totalUnpaidInvoiceAmount = $totalInvoicesAmount - $totalPaidInvoiceAmount;
        $totalUnpaidInvoiceCount  = $totalInvoiceCount - $totalPaidInvoiceCount;

        return new \WP_REST_Response([
            'topBar' => [
                'invoice' => [
                    'name'    => 'Total Invoices',
                    'total'   => $totalInvoicesAmount,
                    'subText' => $totalInvoiceCount . ($totalInvoiceCount == 1 ? ' invoice' : ' invoices')
                ],
                'revenue' => [
                    'name'    => 'Total Revenue',
                    'total'   => $totalPaidInvoiceAmount,
                    'subText' => $totalPaidInvoiceCount . ($totalPaidInvoiceCount == 1 ? ' invoice' : ' invoices')
                ],
                'due' => [
                    'name'    => 'Total Due',
                    'total'   => $totalUnpaidInvoiceAmount,
                    'subText' => $totalUnpaidInvoiceCount . ($totalUnpaidInvoiceCount == 1 ? ' invoice' : ' invoices')
                ],
                'projects' => [
                    'name'    => 'Total Projects',
                    'count'   => $projectCount,
                    'subText' => 'Last 3 months'
                ]
            ]
        ]);

    }
}