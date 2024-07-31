<?php

namespace WpClientManagement;

use WpClientManagement\API\Clients\GetClient;
use WpClientManagement\API\DealPipelines\GetDealPipelines;
use WpClientManagement\API\EicCrmUsers\GetEicCrmUsers;
use WpClientManagement\API\Emails\GetEmail;
use WpClientManagement\API\Files\GetFiles;
use WpClientManagement\API\Invoices\GetInvoices;
use WpClientManagement\API\Notes\GetNotes;
use WpClientManagement\API\Posts\GetPosts;
use WpClientManagement\API\Users\GetUsers;
use WpClientManagement\API\Posts\GetSinglePost;
use WpClientManagement\API\Priorities\GetPriorities;
use WpClientManagement\API\Projects\GetProjects;
use WpClientManagement\API\Schedules\GetSchedules;
use WpClientManagement\API\Statuses\GetStatuses;
use WpClientManagement\API\Tasks\GetTasks;

class API {
    /**
     * Operates all the API functionalities
     */
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        new GetPosts();
        new GetUsers();
        new GetSinglePost();

        // Client 
        new GetClient();

        // DealPipeline
        new GetDealPipelines();

        // EicCrmUser
        new GetEicCrmUsers();

        // Email
        new GetEmail();

        // File
        new GetFiles();

        // Invoice
        new GetInvoices();

        // Note
        new GetNotes();

        // Priority
        new GetPriorities();

        // Project
        new GetProjects();

        // Schedule
        new GetSchedules();

        // Status
        new GetStatuses();

        // Task
        new GetTasks();

    }
}