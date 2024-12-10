<?php

namespace WpClientManagement;

use WpClientManagement\API\Auth\Login;
use WpClientManagement\API\Clients\ClientBulkDelete;
use WpClientManagement\API\Clients\ClientOverview;
use WpClientManagement\API\Clients\CreateClient;
use WpClientManagement\API\Clients\DeleteClient;
use WpClientManagement\API\Clients\EditClient;
use WpClientManagement\API\Clients\GetClientEmails;
use WpClientManagement\API\Clients\GetClientFiles;
use WpClientManagement\API\Clients\GetClientInvoices;
use WpClientManagement\API\Clients\GetClientNotes;
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
use WpClientManagement\API\Clients\GetSelectedClientDetails;
use WpClientManagement\API\Projects\GetProjectFiles;
use WpClientManagement\API\Clients\GetSingleClientOverview;
use WpClientManagement\API\Clients\GetTopClients;
use WpClientManagement\API\Clients\UpdateClient;
use WpClientManagement\API\Contacts\AddTeamMember;
use WpClientManagement\API\Contacts\DeleteTeamMember;
use WpClientManagement\API\Contacts\GetTeamMembers;
use WpClientManagement\API\Contacts\UpdateTeamMember;
use WpClientManagement\API\Currencies\SelectCurrency;
use WpClientManagement\API\DealPipelines\CreateDealPipeline;
use WpClientManagement\API\DealPipelines\DeleteDealPipeline;
use WpClientManagement\API\DealPipelines\UpdateDealPipeline;
use WpClientManagement\API\EicCrmUsers\CreateEicCrmUser;
use WpClientManagement\API\EicCrmUsers\DeleteCrmUser;
use WpClientManagement\API\EicCrmUsers\GetSelectedEmployeeDetails;
use WpClientManagement\API\EicCrmUsers\SelectEmployee;
use WpClientManagement\API\EicCrmUsers\UpdateEicCrmUser;
use WpClientManagement\API\Emails\CreateEmail;
use WpClientManagement\API\Emails\DeleteEmail;
use WpClientManagement\API\Emails\EmailsBulkDelete;
use WpClientManagement\API\Emails\UpdateEmail;
use WpClientManagement\API\Files\CreateFile;
use WpClientManagement\API\Files\DeleteFile;
use WpClientManagement\API\Files\EditFile;
use WpClientManagement\API\Files\FilesBulkDelete;
use WpClientManagement\API\Files\UpdateFile;
use WpClientManagement\API\GetReport;
use WpClientManagement\API\Invoices\InvoiceBulkDelete;
use WpClientManagement\API\InvoiceItems\CreateInvoiceItem;
use WpClientManagement\API\Invoices\CreateInvoice;
use WpClientManagement\API\Invoices\DeleteInvoice;
use WpClientManagement\API\Invoices\EditInvoice;
use WpClientManagement\API\Invoices\InvoiceBulkComplete;
use WpClientManagement\API\Tasks\TaskBulkComplete;
use WpClientManagement\API\Invoices\UpdateInvoice;
use WpClientManagement\API\Notes\CreateNote;
use WpClientManagement\API\Notes\DeleteNote;
use WpClientManagement\API\Notes\EditNote;
use WpClientManagement\API\Notes\NoteBulkDelete;
use WpClientManagement\API\Notes\UpdateNote;
use WpClientManagement\API\Overview;
use WpClientManagement\API\PaymentMethods\SelectPaymentMethod;
use WpClientManagement\API\Posts\GetSinglePost;
use WpClientManagement\API\Priorities\CreatePriority;
use WpClientManagement\API\Priorities\DeletePriority;
use WpClientManagement\API\Priorities\GetPriorities;
use WpClientManagement\API\Priorities\GetSinglePriority;
use WpClientManagement\API\Priorities\SelectPriority;
use WpClientManagement\API\Priorities\UpdatePriority;
use WpClientManagement\API\Projects\CreateProject;
use WpClientManagement\API\Projects\DeleteProject;
use WpClientManagement\API\Projects\EditProject;
use WpClientManagement\API\Projects\GetProjectAdditionalInfo;
use WpClientManagement\API\Projects\GetProjects;
use WpClientManagement\API\Projects\GetProjectEmails;
use WpClientManagement\API\Projects\GetProjectInvoices;
use WpClientManagement\API\Projects\GetProjectList;
use WpClientManagement\API\Projects\GetProjectNotes;
use WpClientManagement\API\Projects\GetProjectTasks;
use WpClientManagement\API\Projects\GetSingleProject;
use WpClientManagement\API\Projects\GetSingleProjectOverview;
use WpClientManagement\API\Projects\ProjectBulkComplete;
use WpClientManagement\API\Projects\ProjectBulkDelete;
use WpClientManagement\API\Projects\ProjectOverview;
use WpClientManagement\API\Projects\SelectClientForProject;
use WpClientManagement\API\Projects\SelectProject;
use WpClientManagement\API\Projects\SelectProjectManager;
use WpClientManagement\API\Projects\SelectScheduleClient;
use WpClientManagement\API\Projects\UpdateProject;
use WpClientManagement\API\Schedules\CreateSchedule;
use WpClientManagement\API\Schedules\DeleteSchedule;
use WpClientManagement\API\Schedules\GetSchedules;
use WpClientManagement\API\Schedules\GetSingleSchedule;
use WpClientManagement\API\Schedules\GetUpcomingSchedules;
use WpClientManagement\API\Schedules\UpdateSchedule;
use WpClientManagement\API\Statuses\CreateStatus;
use WpClientManagement\API\Statuses\DeleteStatus;
use WpClientManagement\API\Statuses\GetSingleStatus;
use WpClientManagement\API\Statuses\GetStatuses;
use WpClientManagement\API\Statuses\SelectStatus;
use WpClientManagement\API\Statuses\UpdateStatus;
use WpClientManagement\API\TaskComments\AddTaskComment;
use WpClientManagement\API\Tasks\CreateTask;
use WpClientManagement\API\Tasks\DeleteTask;
use WpClientManagement\API\Tasks\EditTask;
use WpClientManagement\API\Tasks\GetSingleTask;
use WpClientManagement\API\Tasks\GetTasks;
use WpClientManagement\API\Tasks\TasksBulkDelete;
use WpClientManagement\API\Tasks\UpdateTask;
use WpClientManagement\API\TeamMembers\GetSelectedTeamMemberDetails;
use WpClientManagement\API\TeamMembers\GetSingleTeamMember;
use WpClientManagement\API\TeamMembers\GetSingleTeamMemberProjects;
use WpClientManagement\API\TeamMembers\GetSingleTeamMemberTasks;
use WpClientManagement\API\TeamMembers\TeamMembersBulkDelete;
use WpClientManagement\API\TestApi;
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

        // Overview
        new Overview();

        // Test
        new TestApi();


        // Auth
        new Login();

        // User
        new GetUsers();
        new GetSingleUser();
        // new DeleteUser();


        // Overview
        new ProjectOverview();
        new GetReport();

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
        new GetClientInvoices();
        new GetClientNotes();
        new GetClientFiles();
        new GetClientEmails();
        new GetSingleClientOverview();
        new EditClient();
        new ClientBulkDelete();
        new GetTopClients();

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
        new SelectEmployee();
        new GetSelectedEmployeeDetails();

        // Team Member
        new GetTeamMembers();
        new AddTeamMember();
        new GetSingleTeamMember();
        new GetSingleTeamMemberProjects();
        new GetSingleTeamMemberTasks();
        new UpdateTeamMember();
        new DeleteTeamMember();
        new TeamMembersBulkDelete();
        new GetSelectedTeamMemberDetails();

        // Email
        new GetEmails();
        new GetSingleEmail();
        new DeleteEmail();
        new CreateEmail();
        new UpdateEmail();
        new EmailsBulkDelete();

        // File
        new GetFiles();
        new GetSingleFile();
        new DeleteFile();
        new CreateFile();
        new UpdateFile();
        new EditFile();
        new FilesBulkDelete();

        // Invoice
        new GetInvoices();
        new GetSingleInvoice();
        new DeleteInvoice();
        new CreateInvoice();
        new UpdateInvoice();
        new CreateInvoiceItem();
        new EditInvoice();
        new InvoiceBulkDelete();
        new InvoiceBulkComplete();

        // Note
        new GetNotes();
        new GetSingleNote();
        new DeleteNote();
        new CreateNote();
        new UpdateNote();
        new EditNote();
        new NoteBulkDelete();

        // Priority
        new GetPriorities();
        new GetSinglePriority();
        new DeletePriority();
        new CreatePriority();
        new UpdatePriority();
        new SelectPriority();

        // Project
        new GetProjects();
        new GetSingleProject();
        new DeleteProject();
        new CreateProject();
        new UpdateProject();
        new ProjectOverview();
        new SelectProjectManager();
        new SelectClientForProject();
        new SelectScheduleClient();
        new GetSingleProjectOverview();
        new GetProjectTasks();
        new GetProjectNotes();
        new GetProjectFiles();
        new GetProjectEmails();
        new GetProjectAdditionalInfo();
        new GetProjectInvoices();
        new SelectProject();
        new GetSelectedClientDetails();
        new EditProject();
        new ProjectBulkDelete();
        new ProjectBulkComplete();
        new GetProjectList();

        // Schedule
        new GetSchedules();
        new GetSingleSchedule();
        new DeleteSchedule();
        new CreateSchedule();
        new UpdateSchedule();
        new GetUpcomingSchedules();

        // Status
        new GetStatuses();
        new GetSingleStatus();
        new DeleteStatus();
        new CreateStatus();
        new UpdateStatus();
        new SelectStatus();

        // Task
        new GetTasks();
        new GetSingleTask();
        new DeleteTask();
        new CreateTask();
        new UpdateTask();
        new EditTask();
        new TasksBulkDelete();
        new TaskBulkComplete();

        // TaskComment
        new AddTaskComment();

        // Currency
        new SelectCurrency();

        // Payment Methods
        new SelectPaymentMethod();


    }
}