<?php
namespace WpClientManagement\API\TeamMembers;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;
use WpClientManagement\Models\Task;

class GetSingleTeamMember {

    private $namespace = 'wp-client-management/v1';
    private $endpoint  = '/team-member/(?P<id>\d+)/overview';

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
            'callback' => array($this, 'get_team_member_overview'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_team_member_overview(\WP_REST_Request $request)
    {
        global $validator;

        $id = $request->get_param('id');
        
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

        $teamMemberData = EicCrmUser::find($id);

        $teamMemberProjects = Project::getTeamMemberProjects($data['id']);
        $teamMemberTasks = Task::getTeamMemberTasks($data['id']);

        $wp_user = get_user_by('id', $teamMemberData->wp_user_id);

        if(!$wp_user) {
            return new \WP_REST_Response([
                'error' => 'User not found',
            ]);
        }

        $teamMemberResponseData = [
            'id' => $teamMemberData->id,
            'name' => $wp_user->user_login,
            'email' => $wp_user->user_email,
            'phone' => $teamMemberData->phone,
            'designation' => $teamMemberData->designation,
            'address' => $teamMemberData->address,
        ];

        return new \WP_REST_Response([
            'profile' => $teamMemberResponseData,
            'bottomTab' => [
                'projectsCount' => $teamMemberProjects->count(),
                'tasksCount' => $teamMemberTasks->count()
            ]
        ]);
    }
}
