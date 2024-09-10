<?php
namespace WpClientManagement\API\TeamMembers;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;
use WpClientManagement\Models\Task;

class GetSingleTeamMemberProjects {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/team-member/(?P<id>\d+)/projects';

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
            'callback' => array($this, 'get_team_member_projects'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_team_member_projects(\WP_REST_Request $request)
    {
        global $validator;

        $id   = $request->get_param('id');
        $page = $request->get_param('project');

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

        $projects = Project::getTeamMemberProjects($teamMember->id, $page);

        $data = [];

        foreach ($projects as $project) {

            $data[] = [
                'id'           => $project->id,
                'project_name' => $project->title,
                'priority'     => $project->priority->name,
                'status'       => $project->status->name,
                'assignee'     => $project->eicCrmUsers->count(),
            ];
        }

        return new \WP_REST_Response([
            'projects' => $data,
            'pagination' => [
                'total'         => $projects->total(),
                'per_page'      => $projects->perPage(),
                'current_page'  => $projects->currentPage(),
                'last_page'     => $projects->lastPage(),
                'next_page_url' => $projects->nextPageUrl(),
                'prev_page_url' => $projects->previousPageUrl(),
            ],

        ]);
    }
}