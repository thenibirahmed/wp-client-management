<?php

namespace WpClientManagement\API\Clients;

use WpClientManagement\Middlewares\AuthMiddleware;
use WpClientManagement\Models\Client;
use WpClientManagement\Models\Invoice;

class GetTopClients {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/top-clients';

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
            'methods'  => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_top_clients'),
            'permission_callback' => [AuthMiddleware::class, 'admin'],
        ]);
    }

    public function get_top_clients(\WP_REST_Request $request)
    {
        global $validator;

        $from   = $request->get_param('from');
        $to     = $request->get_param('to');

        $data = [];
        $data['from']  = $from ? $from.' 00:00:00' : date('Y-m-d', strtotime('-6 months'));
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

        $topClients = Client::getTopClients($data);

        $paidInvoices = Invoice::getAllPaidInvoices();
        $totalRevenue = $paidInvoices->sum('total');

        $topClients = $topClients->map(function ($client) use ($totalRevenue) {
            if ($totalRevenue > 0) {
                $client->percentage = round(($client->total_amount / $totalRevenue) * 100, 2);
            } else {
                $client->percentage = 0;
            }
            return $client;
        });

        $data = [];

        foreach ($topClients as $client) {
            $data[] = [
                'id'           => $client->id,
                'name'         => $client->eic_crm_user->wp_user->user_login,
                'total_revenue'=> number_format($client->total_amount,2),
                'percentage'   => $client->percentage,
            ];
        }

        return new \WP_REST_Response([
            'clients'    => $data,
        ]);
    }
}