<?php
namespace WpClientManagement\API;

use WpClientManagement\Helpers\AuthUser;
use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class Overview {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/overview';

    protected array $rules = [
        'currency' => 'nullable|exists:eic_currencies,code',
        'from'     => 'nullable|date',
        'to'       => 'nullable|date',
    ];

    protected array $validationMessages = [
        'currency.exists'  => 'Invalid currency code.',
        'from.date'        => 'Invalid date format.',
        'to.date'          => 'Invalid date format.',
    ];

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
        global $validator;

        $currency = $request->get_param('currency');
        $from     = $request->get_param('from');
        $to       = $request->get_param('to');

        $data = [];
        $data['currency'] = $currency ?: 'USD';
        $data['from']     = $from ? $from. ' 00:00:00' : date('Y-m-d', strtotime('-3 months'));
        $data['to']       = $to ? $to. ' 23:59:59' : date('Y-m-d 23:59:59');

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $invoices = Invoice::with('client', 'project', 'status')
            ->whereBetween('date', [$data['from'], $data['to']])->get();

        $projectsCount = Project::whereBetween('start_date', [$data['from'], $data['to']])->count();
        $clientsCount  = Client::whereBetween('created_at', [$data['from'], $data['to']])->count();

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
                'amount'  => $clientsCount,
                'subText' => 'last 3 months'
            ],
            "project" => [
                'name'    => 'Total Projects',
                'amount'  => $projectsCount,
                'subText' => 'last 3 months'
            ],
        ];

        return new \WP_REST_Response([
            'topBar'     => $topBar,
            'profile'    => AuthUser::user()->name,
        ]);
    }
}