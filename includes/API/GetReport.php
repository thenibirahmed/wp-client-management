<?php

namespace WpClientManagement\API;

use WpClientManagement\Middlewares\AuthMiddleware;
use WpClientManagement\Models\Invoice;

class GetReport {

    private $namespace = 'wp-client-management/v1';

    private $endpoint  = '/reports';

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
            'callback' => array($this, 'get_report'),
            'permission_callback' => [AuthMiddleware::class, 'admin'],
        ]);
    }

    public function get_report(\WP_REST_Request $request)
    {
        global $validator;

        $from   = $request->get_param('from');
        $to     = $request->get_param('to');

        $data = [];
        $data['from']  = $from ? $from.' 00:00:00' : date('Y-m-d', strtotime('-5 months'));
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

        $invoices = Invoice::with('status')
                ->whereHas('status', function ($query) {
                    $query->where('type', 'invoice')
                        ->where('name','paid');
                })
                ->whereBetween('date', [$data['from'], $data['to']])
                ->get()
                ->groupBy(function($invoice) {
                    return date('M', strtotime($invoice->date));
        });

        $months = $this->generateMonths($data['from'], $data['to']);

        $chartData = [];

        foreach ($months as $month => &$revenue) {
            if ($invoices->has($month)) {
                $revenue = $invoices[$month]->sum('total');
            }

            $chartData[] = [
                'month' => $month,
                'revenue' => $revenue
            ];
        }

        return new \WP_REST_Response([
            'chartData' => $chartData,
        ]);
    }

    private function generateMonths($startDate, $endDate)
    {
        $months = [];
        $current = strtotime($startDate);

        while ($current < strtotime($endDate)) {
            $monthName = date('M', $current);
            $months[$monthName] = 0;
            $current = strtotime('+1 month', $current);
        }

        return $months;
    }

}