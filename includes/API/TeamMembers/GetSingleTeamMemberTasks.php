<?php
namespace WpClientManagement\API\TeamMembers;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;
use WpClientManagement\Models\Task;

class GetSingleTeamMemberTasks {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/team-member/(?P<id>\d+)/tasks';

    protected array $rules = [
        'id' => 'required|integer|exists:eic_eic_crm_users,id',
    ];

    protected array $validationMessages = [
        'id.required' => 'The client ID is required.',
        'id.integer'  => 'The client ID must be an integer.',
        'id.exists'   => 'The team member does not exist.',
    ];

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_team_member_tasks'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_team_member_tasks(\WP_REST_Request $request)
    {
        global $validator;

        $id   = $request->get_param('id');
        $page = $request->get_param('page');

        if(!isset($id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = ['id' => $id];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $teamMember = EicCrmUser::find($id);

        if(!$teamMember) {
            return new \WP_REST_Response([
                'error' => 'No Team Member found',
            ]);
        }

        $tasks = Task::getTeamMemberTasks($id, $page);

        $data = [];

        foreach ($tasks as $task) {

            $data[] = [
                'id'           => $task->id,
                'task_title' => $task->title,
                'owner'     => $task->eic_crm_usre,
            ];
        }

        return new \WP_REST_Response([
            'projects' => $data,
            'pagination' => [
                'total'         => $tasks->total(),
                'per_page'      => $tasks->perPage(),
                'current_page'  => $tasks->currentPage(),
                'last_page'     => $tasks->lastPage(),
                'next_page_url' => $tasks->nextPageUrl(),
                'prev_page_url' => $tasks->previousPageUrl(),
            ],
            
        ]);
    }
}
