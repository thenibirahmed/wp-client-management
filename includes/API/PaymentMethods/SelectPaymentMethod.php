<?php

namespace WpClientManagement\API\PaymentMethods;

use WpClientManagement\Models\PaymentMethod;

class SelectPaymentMethod {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/select-payment-method';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'select_payment_method'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function select_payment_method()
    {
        $payment_methods = PaymentMethod::all();

        $data = [];
        foreach ($payment_methods as $method) {
            $data[] = [
                'id' => $method->id,
                'name' => $method->name
            ];
        }

        return new \WP_REST_Response([
            'payment_methods' => $data
        ]);
    }
}