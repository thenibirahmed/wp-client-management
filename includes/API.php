<?php

namespace WpClientManagement;

use WpClientManagement\API\Clients\GetClient;
use WpClientManagement\API\Clients\GetSingleClient;
use WpClientManagement\API\DealPipelines\GetDealPipelines;
use WpClientManagement\API\DealPipelines\GetSingleDealPipeline;
use WpClientManagement\API\EicCrmUsers\GetEicCrmUsers;
use WpClientManagement\API\EicCrmUsers\GetSingleEicCrmUser;
use WpClientManagement\API\Emails\GetEmails;
use WpClientManagement\API\Emails\GetSingleEmail;
use WpClientManagement\API\Files\GetFiles;
use WpClientManagement\API\Files\GetSingleFile;
use WpClientManagement\API\Invoices\GetInvoices;
use WpClientManagement\API\Invoices\GetSingleInvoice;
use WpClientManagement\API\Notes\GetNotes;
use WpClientManagement\API\Notes\GetSingleNote;
use WpClientManagement\API\Posts\GetPosts;
use WpClientManagement\API\Users\GetUsers;
use WpClientManagement\API\Posts\GetSinglePost;
use WpClientManagement\API\Priorities\GetPriorities;
use WpClientManagement\API\Priorities\GetSinglePriority;
use WpClientManagement\API\Projects\GetProjects;
use WpClientManagement\API\Projects\GetSingleProject;
use WpClientManagement\API\Schedules\GetSchedules;
use WpClientManagement\API\Schedules\GetSingleSchedule;
use WpClientManagement\API\Statuses\GetSingleStatus;
use WpClientManagement\API\Statuses\GetStatuses;
use WpClientManagement\API\Tasks\GetSingleTask;
use WpClientManagement\API\Tasks\GetTasks;

class API {
    /**
     * Operates all the API functionalities
     */
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        new GetUsers();

        // Post
        new GetPosts();
        new GetSinglePost();

        // // Client
        // new GetClient();
        // new GetSingleClient();

        // // DealPipeline
        new GetDealPipelines();
        new GetSingleDealPipeline();

        // // EicCrmUser
        new GetEicCrmUsers();
        new GetSingleEicCrmUser();

        // // Email
        // new GetEmails();
        new GetSingleEmail();

        // // File
        new GetFiles();
        new GetSingleFile();

        // // Invoice
        new GetInvoices();
        new GetSingleInvoice();

        // // Note
        new GetNotes();
        new GetSingleNote();

        // // Priority
        new GetPriorities();
        new GetSinglePriority();

        // // Project
        new GetProjects();
        new GetSingleProject();

        // // Schedule
        new GetSchedules();
        new GetSingleSchedule();

        // // Status
        new GetStatuses();
        new GetSingleStatus();

        // // Task
        new GetTasks();
        new GetSingleTask();

    }
}