<?php
namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class GetSingleClientOverview {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/client/(?P<id>\d+)/overview';

    protected array $rules = [
        'id'       => 'required|integer|exists:eic_clients,id',
        'currency' => 'nullable|exists:eic_currencies,code',
        'from'     => 'nullable|date',
        'to'       => 'nullable|date'
    ];

    protected array $validationMessages = [
        'id.required'     => 'The client ID is required.',
        'id.integer'      => 'The client ID must be an integer.',
        'id.exists'       => 'The client does not exist.',
        'currency.exists' => 'Invalid currency code.',
        'from.date'       => 'Invalid from date.',
        'to.date'         => 'Invalid to date.',
    ];

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_client_overview'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_client_overview(\WP_REST_Request $request)
    {
        global $validator;

        $id       = $request->get_param('id');
        $currency = $request->get_param('currency');
        $from     = $request->get_param('from');
        $to       = $request->get_param('to');

        if(!isset($id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = [];
        $data['id']       = $id;
        $data['currency'] = $currency ? $currency : 'USD';
        $data['from']     = $from ? $from. ' 00:00:00' : date('Y-m-d', strtotime('-3 months'));
        $data['to']       = $to ? $to. ' 23:59:59' : date('Y-m-d 23:59:59');

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $clientData = Client::getClientData($id);
        $wp_user_id = $clientData->eic_crm_user->wp_user_id;
        $wpUser     = get_user_by('ID', $wp_user_id);

        $profile = [
            'name'         => $wpUser->user_login,
            'email'        => $wpUser->user_email,
            'phone'        => $clientData->eic_crm_user->phone,
            'address'      => $clientData->eic_crm_user->address,
            'organization' => $clientData->organization,
        ];

        $totalProjects  = Project::where('client_id', $data['id'])->count();
        $clientInvoices = Invoice::getSingleClientInvoices($data['id'], $data['currency'], $data['from'], $data['to']);

        $totalInvoiceAmount = $clientInvoices->sum('total');
        $totalInvoiceCount  = $clientInvoices->count();

        $paidInvoices       = $clientInvoices->where('status.name', 'paid')->where('status.type', 'invoice');
        $totalRevenueAmount = $paidInvoices->sum('total');
        $paidInvoiceCount   = $paidInvoices->count();

        $unpaidInvoiceCount = $totalInvoiceCount - $paidInvoiceCount;
        $totalDueAmount     = $totalInvoiceAmount - $totalRevenueAmount;

        $topBar = [
            "invoice" => [
                'name'    => 'Total Invoice',
                'amount'  => $totalInvoiceAmount,
                'subText' => $totalInvoiceCount . ($totalInvoiceCount == 1 ? ' invoice' : ' invoices')
            ],
            "revenue" => [
                'name'    => 'Total Revenue',
                'amount'  => $totalRevenueAmount,
                'subText' => $paidInvoiceCount . ($paidInvoiceCount == 1 ? ' invoice' : ' invoices')
            ],
            "due" => [
                'name'    => 'Total Due',
                'amount'  => $totalDueAmount,
                'subText' => $unpaidInvoiceCount . ($unpaidInvoiceCount == 1 ? ' invoice' : ' invoices')
            ],
            "project" => [
                'name'    => 'Total Projects',
                'amount'  => $totalProjects,
                'subText' => 'last 3 months'
            ],
            'currency'    => $data['currency']
        ];

        return new \WP_REST_Response([
            'profile'    => $profile,
            'topBar'     => $topBar
        ]);
    }
}