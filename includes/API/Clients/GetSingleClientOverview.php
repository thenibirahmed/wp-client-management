<?php
namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class GetSingleClientOverview {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/client/(?P<id>\d+)/overview';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_clients,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The client ID is required.',
        'id.integer'  => 'The client ID must be an integer.',
        'id.exists'   => 'The client does not exist.',
    ];

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_client_overview'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_client_overview(\WP_REST_Request $request)
    {
        global $validator;

        $id = $request->get_param('id');

        if(!isset($id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $id];

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
            'designation'  => $clientData->eic_crm_user->designation,
            'organization' => $clientData->organization,
        ];

        $totalProjects  = Project::getClientProjects($data['id'],false)->count();
        $clientInvoices = Invoice::getSingleClientInvoices($data['id']);

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
            ]
        ];

        return new \WP_REST_Response([
            'profile'    => $profile,
            'topBar'     => $topBar
        ]);
    }
}