<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\Currency;
use WpClientManagement\Models\Email;
use WpClientManagement\Models\File;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Note;
use WpClientManagement\Models\Project;
use WpClientManagement\Models\Task;

class GetSingleProjectOverview {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/project/(?P<id>\d+)/overview';

    protected array $rules = [
        'id'          => 'required|integer|exists:eic_projects,id',
        'currency'    => 'nullable|exists:eic_currencies,code',
    ];

    protected array $validationMessages = [
        'id.required'     => 'The client ID is required.',
        'id.integer'      => 'The client ID must be an integer.',
        'id.exists'       => 'The client does not exist.',
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

        $id          = $request->get_param('id');
        $currency    = $request->get_param('currency');
        $from        = $request->get_param('from');
        $to          = $request->get_param('to');

        if(!isset($id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data= [];
        $data['id']             = intval($id);
        $data['currency']       = $currency ?: 'USD';
        $data['from']           = $from ? $from. ' 00:00:00' : date('Y-m-d', strtotime('-3 months'));
        $data['to']             = $to ? $to. ' 23:59:59' : date('Y-m-d 23:59:59');

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
            'id'           => $projectData->id,
            'name'         => $projectData->title,
            'client_id'    => $client->id,
            'client_name'  => $client->user_login,
            'manager_name' => $manager?->user_login,
            'status'       => $projectData->status->name,
            'priority'     => $projectData->priority->name,
        ];

        $invoices = Invoice::getSingleProjectInvoices($id, $data['currency'], $data['from'], $data['to']);

        $totalInvoiceAmount = $invoices->sum('total');
        $totalInvoiceCount  = $invoices->count();

        $totalPaidInvoiceAmount = $invoices->where('status.type', 'invoice')->where('status.name','paid')->sum('total');
        $paidInvoiceCount       = $invoices->where('status.type', 'invoice')->where('status.name','paid')->count();

        $totalDueAmount     = $totalInvoiceAmount - $totalPaidInvoiceAmount;
        $unpaidInvoiceCount = $totalInvoiceCount - $paidInvoiceCount;

        $currency = Currency::getCurrencyData($data['currency']);

        $topBar = [
            "invoice" => [
                'name'    => 'Total Invoice',
                'total'   => $totalInvoiceAmount,
                'subText' => $totalInvoiceCount . ($totalInvoiceCount == 1 ? ' invoice' : ' invoices')
            ],
            "revenue" => [
                'name'    => 'Total Revenue',
                'total'   => $totalPaidInvoiceAmount,
                'subText' => $paidInvoiceCount . ($paidInvoiceCount == 1 ? ' invoice' : ' invoices')
            ],
            "due" => [
                'name'    => 'Total Due',
                'total'   => $totalDueAmount,
                'subText' => $unpaidInvoiceCount . ($unpaidInvoiceCount == 1 ? ' invoice' : ' invoices')
            ],
            "employee" => [
                'name'    => 'Working Employee',
                'total'   => $working_employee,
                'subText' => $working_employee . ($working_employee == 1 ? ' employee' : ' employees')
            ],
            'currency' => $currency
        ];

        $tabs = [
            'tasks'           => Task::where('project_id', $data['id'])->count(),
            'invoice'         => $totalInvoiceCount,
            'notes'           => Note::where('project_id', $data['id'])->count(),
            'files'           => File::where('project_id', $data['id'])->count(),
            'emails'          => Email::where('project_id', $data['id'])->count(),
            'additional info' => ''
        ];

        return new \WP_REST_Response([
            'header' => $projectHeader,
            'topBar' => $topBar,
            'tabs'   => $tabs
        ]);
    }
}