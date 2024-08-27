<?php

namespace WpClientManagement;

use WpClientManagement\API\Clients\ClientOverview;
use WpClientManagement\API\Clients\CreateClient;
use WpClientManagement\API\Clients\DeleteClient;
use WpClientManagement\API\Clients\GetClientProjects;
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
use WpClientManagement\API\Clients\UpdateClient;
use WpClientManagement\API\DealPipelines\CreateDealPipeline;
use WpClientManagement\API\DealPipelines\DeleteDealPipeline;
use WpClientManagement\API\DealPipelines\UpdateDealPipeline;
use WpClientManagement\API\EicCrmUsers\CreateEicCrmUser;
use WpClientManagement\API\EicCrmUsers\DeleteCrmUser;
use WpClientManagement\API\EicCrmUsers\UpdateEicCrmUser;
use WpClientManagement\API\Emails\CreateEmail;
use WpClientManagement\API\Emails\DeleteEmail;
use WpClientManagement\API\Emails\UpdateEmail;
use WpClientManagement\API\Files\CreateFile;
use WpClientManagement\API\Files\DeleteFile;
use WpClientManagement\API\Files\UpdateFile;
use WpClientManagement\API\Invoices\CreateInvoice;
use WpClientManagement\API\Invoices\DeleteInvoice;
use WpClientManagement\API\Invoices\UpdateInvoice;
use WpClientManagement\API\Notes\CreateNote;
use WpClientManagement\API\Notes\DeleteNote;
use WpClientManagement\API\Notes\UpdateNote;
use WpClientManagement\API\Posts\GetSinglePost;
use WpClientManagement\API\Priorities\CreatePriority;
use WpClientManagement\API\Priorities\DeletePriority;
use WpClientManagement\API\Priorities\GetPriorities;
use WpClientManagement\API\Priorities\GetSinglePriority;
use WpClientManagement\API\Priorities\UpdatePriority;
use WpClientManagement\API\Projects\CreateProject;
use WpClientManagement\API\Projects\DeleteProject;
use WpClientManagement\API\Projects\GetProjects;
use WpClientManagement\API\Projects\GetSingleProject;
use WpClientManagement\API\Projects\ProjectOverview;
use WpClientManagement\API\Projects\UpdateProject;
use WpClientManagement\API\Schedules\CreateSchedule;
use WpClientManagement\API\Schedules\DeleteSchedule;
use WpClientManagement\API\Schedules\GetSchedules;
use WpClientManagement\API\Schedules\GetSingleSchedule;
use WpClientManagement\API\Schedules\UpdateSchedule;
use WpClientManagement\API\Statuses\CreateStatus;
use WpClientManagement\API\Statuses\DeleteStatus;
use WpClientManagement\API\Statuses\GetSingleStatus;
use WpClientManagement\API\Statuses\GetStatuses;
use WpClientManagement\API\Statuses\UpdateStatus;
use WpClientManagement\API\Tasks\CreateTask;
use WpClientManagement\API\Tasks\DeleteTask;
use WpClientManagement\API\Tasks\GetSingleTask;
use WpClientManagement\API\Tasks\GetTasks;
use WpClientManagement\API\Tasks\UpdateTask;
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


        // Overview
        new ProjectOverview();

        // Post
        new GetPosts();
        new GetSinglePost();
        // new DeletePost();

        // Client
        new GetClients();
        new GetSingleClient();
        new DeleteClient();
        new CreateClient();
        new UpdateClient();
        new ClientOverview();
        new GetClientProjects();

        // DealPipeline
        new GetDealPipelines();
        new GetSingleDealPipeline();
        new DeleteDealPipeline();
        new CreateDealPipeline();
        new UpdateDealPipeline();

        // EicCrmUser
        new GetEicCrmUsers();
        new GetSingleEicCrmUser();
        new DeleteCrmUser();
        new CreateEicCrmUser();
        new UpdateEicCrmUser();

        // Email
        new GetEmails();
        new GetSingleEmail();
        new DeleteEmail();
        new CreateEmail();
        new UpdateEmail();

        // File
        new GetFiles();
        new GetSingleFile();
        new DeleteFile();
        new CreateFile();
        new UpdateFile();

        // Invoice
        new GetInvoices();
        new GetSingleInvoice();
        new DeleteInvoice();
        new CreateInvoice();
        new UpdateInvoice();

        // Note
        new GetNotes();
        new GetSingleNote();
        new DeleteNote();
        new CreateNote();
        new UpdateNote();

        // Priority
        new GetPriorities();
        new GetSinglePriority();
        new DeletePriority();
        new CreatePriority();
        new UpdatePriority();

        // Project
        new GetProjects();
        new GetSingleProject();
        new DeleteProject();
        new CreateProject();
        new UpdateProject();
        new ProjectOverview();

        // Schedule
        new GetSchedules();
        new GetSingleSchedule();
        new DeleteSchedule();
        new CreateSchedule();
        new UpdateSchedule();

        // Status
        new GetStatuses();
        new GetSingleStatus();
        new DeleteStatus();
        new CreateStatus();
        new UpdateStatus();

        // Task
        new GetTasks();
        new GetSingleTask();
        new DeleteTask();
        new CreateTask();
        new UpdateTask();

    }
}