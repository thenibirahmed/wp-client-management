<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Helpers\AuthUser;
use WpClientManagement\Models\Currency;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class ProjectOverview {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/projects-overview';

    protected array $rules = [
        'currency' => 'nullable|exists:eic_currencies,code',
    ];

    protected array $validationMessages = [
        'currency.exists' => 'Invalid currency code.',
    ];

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_project_overview'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_project_overview(\WP_REST_Request $request)
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

        $projects     = Project::pluck('id')->toArray();
        $projectCount = count($projects);

        if(AuthUser::user()->role == 'admin') {
            $invoices     = Invoice::getAllProjectInvoices($projects, $data['currency'], $data['from'], $data['to']);
        }elseif(AuthUser::user()->role == 'client') {
            $invoices = Invoice::getSingleClientInvoices(AuthUser::user()->id, $data['currency'], $data['from'], $data['to']);
        }else{
            return new \WP_REST_Response([
                'error' => 'Unauthorized.',
            ], 401);
        }

        $totalInvoicesAmount = $invoices->sum('total');
        $totalInvoiceCount   = $invoices->count();

        $totalPaidInvoices = $invoices->where('status.type','invoice')
                            ->where('status.name','paid');

        $totalPaidInvoiceAmount = $totalPaidInvoices->sum('total');
        $totalPaidInvoiceCount  = $totalPaidInvoices->count();

        $totalUnpaidInvoiceAmount = $totalInvoicesAmount - $totalPaidInvoiceAmount;
        $totalUnpaidInvoiceCount  = $totalInvoiceCount - $totalPaidInvoiceCount;

        $currency = Currency::getCurrencyData($data['currency']);

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
                ],
                'currency' => $currency
            ]
        ]);

    }
}