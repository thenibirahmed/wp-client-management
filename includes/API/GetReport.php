<?php

namespace WpClientManagement\API;

use Carbon\Carbon;
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

        $data['from'] = $from ? Carbon::parse($from)->startOfDay() : Carbon::now()->subMonths(5)->startOfDay();

        $data['to'] = $to ? Carbon::parse($to)->endOfDay() : Carbon::now()->endOfDay();

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if (!empty($data['from']) && !empty($data['to'])) {
            if($data['from'] >= $data['to']) {
                $validator->errors()->add('from', 'The from date must be less than the to date.');
                    return new \WP_REST_Response([
                    'errors' => $validator->errors(),
           ], 400);
           }
        }

        $invoices = Invoice::with(['status' => function ($query) {
            $query->where('type', 'invoice')->where('name', 'paid');
        }])
            ->whereBetween('date', [$data['from'], $data['to']])
            ->get()
            ->filter(function($invoice) {
                return $invoice->status;
             })
            ->groupBy(function ($invoice) {
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
        $current = Carbon::parse($startDate)->startOfMonth();
        $end = Carbon::parse($endDate)->endOfMonth();

        while ($current <= $end) {
            $monthName = $current->format('M');
            $months[$monthName] = 0;
            $current->addMonth();
        }

        return $months;
    }

}