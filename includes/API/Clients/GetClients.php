<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;

class GetClients {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/clients';

    protected array $rules = [
        'from'     => 'nullable|date',
        'to'       => 'nullable|date',
    ];

    protected array $validationMessages = [
        'from.date' => 'Invalid date format.',
        'to.date'   => 'Invalid date format.',
    ];

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_clients'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_clients(\WP_REST_Request $request)
    {
        global $validator;

        $page   = $request->get_param('page');
        $search = $request->get_param('search');
        $from   = $request->get_param('from');
        $to     = $request->get_param('to');

        $data = [];
        $data['from']  = $from ? $from.' 00:00:00' : date('Y-m-d', strtotime('-3 months'));
        $data['to']    = $to ? $to.' 23:59:59' : date('Y-m-d 23:59:59');

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if (!empty($data['from']) && !empty($data['to'])) {
            if($data['from'] >= $data['to']) {
                $validator->errors()->add('from', 'The from date must be less than the to date.');
                    return new \WP_REST_Response([
                    'errors' => $validator->errors(),
           ], 400);
           }
        }

        $clientsData = Client::getActiveClients($page, $data['from'], $data['to'], $search);

        $wp_user_ids = $clientsData->pluck('eic_crm_user.wp_user_id')->toArray();

        $wpUsersDb = get_users([
            'include' => $wp_user_ids,
        ]);

        $wpUsers = [];
        foreach ($wpUsersDb as $user) {
            $wpUsers[$user->ID] = [
                'name'  => $user->user_login,
                'email' => $user->user_email,
            ];
        }

        $clientIds = $clientsData->pluck('id')->toArray();
        $invoices  = Invoice::getAllClientsInvoices($clientIds);

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

        // $totalInvoices = $invoiceTotalsByClient->sum('total');
        // $totalRevenue  = $invoiceTotalsByClient->sum('revenue');
        // $totalDue      = $invoiceTotalsByClient->sum('due');

        // $totalInvoiceCount  = $invoices->count();
        // $paidInvoiceCount   = $invoices->where('status.name', 'paid')->where('status.type', 'invoice')->count();
        // $unpaidInvoiceCount = $totalInvoiceCount - $paidInvoiceCount;

        $clientsWithDetails = $clientsData->map(function ($client) use ($wpUsers, $invoiceTotalsByClient) {
            $eicCrmUser = $client->eic_crm_user;
            $wpUserId   = $eicCrmUser->wp_user_id;
            $wpUser     = $wpUsers[$wpUserId] ?? [];

            $invoices = $invoiceTotalsByClient->get($client->id, [
                'total' => 0, 'revenue' => 0, 'due' => 0
            ]);

            return [
                'client_id'     => $client->id,
                'organization'  => $client->organization,
                'project_count' => $client->projects->count() ?? 0,
                'invoice'       => $invoices ?? [],
                'name'          => $wpUser['name'] ?? null,
                'email'         => $wpUser['email'] ?? null,
            ];
        });

    //    if($search) {
    //         $clientsWithDetails = $clientsWithDetails->filter(function ($client) use ($search) {
    //             return stripos($client['name'], $search) !== false;
    //         });
    //    }

        // $topBar = [
        //     "invoice" => [
        //         'name'    => 'Total Invoice',
        //         'amount'  => $totalInvoices,
        //         'subText' => $totalInvoiceCount . ($totalInvoiceCount == 1 ? ' invoice' : ' invoices')
        //     ],
        //     "revenue" => [
        //         'name'    => 'Total Revenue',
        //         'amount'  => $totalRevenue,
        //         'subText' => $paidInvoiceCount . ($paidInvoiceCount == 1 ? ' invoice' : ' invoices')
        //     ],
        //     "due" => [
        //         'name'    => 'Total Due',
        //         'amount'  => $totalDue,
        //         'subText' => $unpaidInvoiceCount . ($unpaidInvoiceCount == 1 ? ' invoice' : ' invoices')
        //     ],
        //     "project" => [
        //         'name'    => 'Total Projects',
        //         'amount'  => $projectCount,
        //         'subText' => 'last 3 months'
        //     ]
        // ];

        return new \WP_REST_Response([
            'clients'    => $clientsWithDetails,
            // 'topBar'     => $topBar,
            'pagination' => [
                'total'         => $clientsData->total(),
                'per_page'      => $clientsData->perPage(),
                'current_page'  => $clientsData->currentPage(),
                'last_page'     => $clientsData->lastPage(),
                'next_page_url' => $clientsData->nextPageUrl(),
                'prev_page_url' => $clientsData->previousPageUrl(),
            ],
        ]);
    }
}