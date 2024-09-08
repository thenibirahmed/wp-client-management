<?php

namespace WpClientManagement\API\Currencies;

use WpClientManagement\Models\Currency;

class SelectCurrency {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/select-currency';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'select_currency'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function select_currency()
    {
        $currencies = Currency::all();

        $data = [];
        foreach ($currencies as $currency) {
            $data[] = [
                'id' => $currency->id,
                'name' => $currency->name,
                'symbol' => $currency->symbol,
                'code' => $currency->code
            ];
        }

        return new \WP_REST_Response([
            'currencies' => $data
        ]);
    }
}