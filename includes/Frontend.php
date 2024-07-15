<?php

namespace WpClientManagement;

use WpClientManagement\Frontend\FrontPageTemplate;

class Frontend {
    /**
     * Operates all the frontend functionalities like adding shortcode
     */
    public function __construct() {
        new FrontPageTemplate();
    }
}
