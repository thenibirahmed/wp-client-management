<?php
namespace WpClientManagement\API;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class Overview {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/overview';

    // protected array $rules = [
    //     'currency' => 'nullable|exists:eic_currencies,code',
    //     'from'     => 'nullable|date',
    //     'to'       => 'nullable|date',
    // ];

    // protected array $validationMessages = [
    //     'currency.exists'  => 'Invalid currency code.',
    //     'from.date'        => 'Invalid date format.',
    //     'to.date'          => 'Invalid date format.',
    // ];

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_overview'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_overview(\WP_REST_Request $request)
    {
        // global $validator;

        // $data = [];

        // $validator = $validator->make($data, $this->rules, $this->validationMessages);

        // if ($validator->fails()) {
        //     return new \WP_REST_Response([
        //         'errors' => $validator->errors(),
        //     ], 400);
        // }

        $invoices     = Invoice::with('client', 'project', 'status')->get();

        $totalInvoiceAmount = $invoices->sum('total');
        $totalInvoiceCount  = $invoices->count();

        $revenueInvoices    = $invoices->where('status.name', 'paid')->where('status.type', 'invoice');
        $totalRevenueAmount = $revenueInvoices->sum('total');
        $totalRevenueCount  = $revenueInvoices->count();


        $totalDueAmount = $totalInvoiceAmount - $totalRevenueAmount;
        $totalDueCount  = $totalInvoiceCount - $totalRevenueCount;

        $topBar = [
            "invoice" => [
                'name'    => 'Total Invoice',
                'amount'  => $totalInvoiceAmount,
                'subText' => $totalInvoiceCount . ($totalInvoiceCount == 1 ? ' invoice' : ' invoices')
            ],
            "revenue" => [
                'name'    => 'Total Revenue',
                'amount'  => $totalRevenueAmount,
                'subText' => $totalRevenueCount . ($totalRevenueCount == 1 ? ' invoice' : ' invoices')
            ],
            "due" => [
                'name'    => 'Total Due',
                'amount'  => $totalDueAmount,
                'subText' => $totalDueCount . ($totalDueCount == 1 ? ' invoice' : ' invoices')
            ],
            "client" => [
                'name'    => 'Total Client',
                'amount'  => Client::count(),
                'subText' => 'last 3 months'
            ],
            "project" => [
                'name'    => 'Total Projects',
                'amount'  => Project::count(),
                'subText' => 'last 3 months'
            ],
        ];

        return new \WP_REST_Response([
            'topBar'     => $topBar,
        ]);
    }
}