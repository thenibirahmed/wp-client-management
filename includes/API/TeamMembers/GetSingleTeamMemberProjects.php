<?php
namespace WpClientManagement\API\TeamMembers;

use WpClientManagement\Middlewares\AuthMiddleware;
use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Project;

class GetSingleTeamMemberProjects {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/team-member/(?P<id>\d+)/projects';

    protected array $rules = [
        'id'          => 'required|integer|exists:eic_eic_crm_users,id',
        'from'        => 'nullable|date',
        'to'          => 'nullable|date',
        'status_id'   => 'nullable|exists:eic_statuses,id',
        'priority_id' => 'nullable|exists:eic_priorities,id',
    ];

    protected array $validationMessages = [
        'id.required'  => 'The client ID is required.',
        'id.integer'   => 'The client ID must be an integer.',
        'id.exists'    => 'The team member does not exist.',
        'from.date'    => 'The from date is not valid.',
        'to.date'      => 'The from date is not valid.',
        'status_id'    => 'The status ID is not valid.',
        'priority_id'  => 'The priority ID is not valid.'
    ];

    public function __construct()
    {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_team_member_projects'),
            'permission_callback' => [AuthMiddleware::class, 'teamMember'],
        ]);
    }

    public function get_team_member_projects(\WP_REST_Request $request)
    {
        global $validator;

        $id          = $request->get_param('id');
        $page        = $request->get_param('project');
        $from        = $request->get_param('from');
        $to          = $request->get_param('to');
        $priority_id = $request->get_param('priority_id');
        $status_id   = $request->get_param('status_id');
        $search      = $request->get_param('search');

        if(!isset($id)) {
            return new \WP_REST_Response([
                'error' => 'Id param is required',
            ]);
        }

        $data = [];
        $data['id'] = intval($id);
        $data['from'] = $from ? $from . ' 00:00:00' : date('Y-m-d', strtotime('-3 months'));
        $data['to'] = $to ? $to . ' 23:59:59' : date('Y-m-d 23:59:59');
        $data['status_id'] = isset($status_id) ? intval($status_id) : null;
        $data['priority_id'] = isset($priority_id) ? intval($priority_id) : null;

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

        $projects = Project::getTeamMemberProjects($data['id'], $page, $data['from'], $data['to'], $data['priority_id'], $data['status_id'], $search);

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