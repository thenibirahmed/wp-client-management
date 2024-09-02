<?php
namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;

class GetSingleProjectOverview {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/project/(?P<id>\d+)/overview';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_projects,id',
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
            'callback' => array($this, 'get_project_overview'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_project_overview(\WP_REST_Request $request)
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

        $projectData = Project::getProjectData($data['id']);

        $working_employee = $projectData->eicCrmUsers->count();

        if(!$projectData) {
            return new \WP_REST_Response([
                'error' => 'Project not found',
            ], 404);
        }

        $client  = get_user_by('ID', $projectData->client->eic_crm_user->wp_user_id);
        $manager = get_user_by('ID', $projectData->manager->wp_user_id);

        $projectHeader = [
            'name'         => $projectData->title,
            'client_name'  => $client->user_login,
            'manager_name' => $manager->user_login,
            'status'       => $projectData->status->name,
            'priority'     => $projectData->priority->name,
        ];

        $invoices = Invoice::getSingleProjectInvoices($id);

        $totalInvoiceAmount = $invoices->sum('total');
        $totalInvoiceCount  = $invoices->count();

        $totalPaidInvoiceAmount = $invoices->where('status.type', 'invoice')->where('status.name','paid')->sum('total');
        $paidInvoiceCount       = $invoices->where('status.type', 'invoice')->where('status.name','paid')->count();

        $totalDueAmount     = $totalInvoiceAmount - $totalPaidInvoiceAmount;
        $unpaidInvoiceCount = $totalInvoiceCount - $paidInvoiceCount;

        $topBar = [
            "invoice" => [
                'name'    => 'Total Invoice',
                'amount'  => $totalInvoiceAmount,
                'subText' => $totalInvoiceCount . ($totalInvoiceCount == 1 ? ' invoice' : ' invoices')
            ],
            "revenue" => [
                'name'    => 'Total Revenue',
                'amount'  => $totalPaidInvoiceAmount,
                'subText' => $paidInvoiceCount . ($paidInvoiceCount == 1 ? ' invoice' : ' invoices')
            ],
            "due" => [
                'name'    => 'Total Due',
                'amount'  => $totalDueAmount,
                'subText' => $unpaidInvoiceCount . ($unpaidInvoiceCount == 1 ? ' invoice' : ' invoices')
            ],
            "employee" => [
                'name'    => 'Working Employee',
                'amount'  => $working_employee,
                'subText' => $working_employee . ($working_employee == 1 ? ' employee' : ' employees')
            ],
        ];

        return new \WP_REST_Response([
            'header' => $projectHeader,
            'topBar' => $topBar
        ]);
    }
}