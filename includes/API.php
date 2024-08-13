<?php

namespace WpClientManagement;

use WpClientManagement\API\Clients\CreateClient;
use WpClientManagement\API\Clients\DeleteClient;
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
use WpClientManagement\API\Clients\GetClients;
use WpClientManagement\API\DealPipelines\DeleteDealPipeline;
use WpClientManagement\API\EicCrmUsers\DeleteCrmUser;
use WpClientManagement\API\Emails\DeleteEmail;
use WpClientManagement\API\Files\DeleteFile;
use WpClientManagement\API\Invoices\DeleteInvoice;
use WpClientManagement\API\Notes\DeleteNote;
use WpClientManagement\API\Posts\DeletePost;
use WpClientManagement\API\Posts\GetSinglePost;
use WpClientManagement\API\Priorities\DeletePriority;
use WpClientManagement\API\Priorities\GetPriorities;
use WpClientManagement\API\Priorities\GetSinglePriority;
use WpClientManagement\API\Projects\DeleteProject;
use WpClientManagement\API\Projects\GetProjects;
use WpClientManagement\API\Projects\GetSingleProject;
use WpClientManagement\API\Schedules\DeleteSchedule;
use WpClientManagement\API\Schedules\GetSchedules;
use WpClientManagement\API\Schedules\GetSingleSchedule;
use WpClientManagement\API\Statuses\CreateStatus;
use WpClientManagement\API\Statuses\DeleteStatus;
use WpClientManagement\API\Statuses\GetSingleStatus;
use WpClientManagement\API\Statuses\GetStatuses;
use WpClientManagement\API\Tasks\DeleteTask;
use WpClientManagement\API\Tasks\GetSingleTask;
use WpClientManagement\API\Tasks\GetTasks;
use WpClientManagement\API\Users\DeleteUser;
use WpClientManagement\API\Users\GetSingleUser;

class API {
    /**
     * Operates all the API functionalities
     */
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {

        // User
        new GetUsers();
        new GetSingleUser();
        // new DeleteUser();

        // Post
        new GetPosts();
        new GetSinglePost();
        // new DeletePost();

        // Client
        new GetClients();
        new GetSingleClient();
        new DeleteClient();
        // new CreateClient();

        // DealPipeline
        new GetDealPipelines();
        new GetSingleDealPipeline();
        new DeleteDealPipeline();

        // EicCrmUser
        new GetEicCrmUsers();
        new GetSingleEicCrmUser();
        new DeleteCrmUser();

        // Email
        new GetEmails();
        new GetSingleEmail();
        new DeleteEmail();

        // File
        new GetFiles();
        new GetSingleFile();
        new DeleteFile();

        // Invoice
        new GetInvoices();
        new GetSingleInvoice();
        new DeleteInvoice();

        // Note
        new GetNotes();
        new GetSingleNote();
        new DeleteNote();

        // Priority
        new GetPriorities();
        new GetSinglePriority();
        new DeletePriority();

        // Project
        new GetProjects();
        new GetSingleProject();
        new DeleteProject();

        // Schedule
        new GetSchedules();
        new GetSingleSchedule();
        new DeleteSchedule();

        // Status
        new GetStatuses();
        new GetSingleStatus();
        new DeleteStatus();
        new CreateStatus();

        // Task
        new GetTasks();
        new GetSingleTask();
        new DeleteTask();

    }
}