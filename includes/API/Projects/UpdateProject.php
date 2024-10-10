<?php

namespace WpClientManagement\API\Projects;

use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Email;
use WpClientManagement\Models\File;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Note;
use WpClientManagement\Models\Priority;
use WpClientManagement\Models\Project;
use WpClientManagement\Models\Status;

class UpdateProject {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/project/update/(?P<id>\d+)';

    protected array $rules = [
        'client_id'        => 'nullable|exists:eic_clients,id',
        'manager_id'       => 'nullable|exists:eic_eic_crm_users,id',
        'status_id'        => 'nullable|exists:eic_statuses,id',
        'priority_id'      => 'nullable|exists:eic_priorities,id',
        'currency_id'      => 'nullable|exists:eic_currencies,id',
        'title'            => 'required|string',
        'budget'           => 'nullable|numeric',
        'start_date'       => 'nullable|date',
        'due_date'         => 'nullable|date',
        'description'      => 'nullable|string',
    ];

    protected array $validationMessages = [
        'client_id.exists'    => 'The selected client does not exist.',
        'manager_id.exists'   => 'The selected manager does not exist.',
        'status_id.exists'    => 'The selected status does not exist.',
        'priority_id.exists'  => 'The selected priority does not exist.',
        'currency_id.exists'  => 'The selected currency does not exist.',
        'title.required'      => 'The title is required.',
        'title.string'        => 'The title must be a string.',
        'budget.numeric'      => 'The budget must be a numeric value.',
        'start_date.date'     => 'The start date must be in the format.',
        'due_date.date'       => 'The due date must be in the format.',
        'description.string'  => 'The description must be a string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_project'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_project(\WP_REST_Request $request) {
        global $validator;

        $id = intval($request->get_param('id'));
        $data = $request->get_params();

        $data['client_id']    = isset($data['client_id']) ? intval($data['client_id']) : null;
        $data['manager_id']   = isset($data['manager_id']) ? intval($data['manager_id']) : null;
        $data['status_id']    = isset($data['status_id']) ? intval($data['status_id']) : null;
        $data['priority_id']  = isset($data['priority_id']) ? intval($data['priority_id']) : null;
        $data['currency_id']  = isset($data['currency_id']) ? intval($data['currency_id']) : null;
        $data['title']        = sanitize_text_field($data['title'] ?? '');
        $data['budget']       = isset($data['budget']) ? floatval($data['budget']) : null;
        $data['start_date']   = isset($data['start_date']) ? sanitize_text_field($data['start_date']) : null;
        $data['due_date']     = isset($data['due_date']) ? sanitize_text_field($data['due_date']) : null;
        $data['description']  = isset($data['description']) ? sanitize_textarea_field($data['description']) : '';
        $data['assignee_ids'] = isset($data['assignee_ids']) ? $data['assignee_ids'] : [];

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $project = Project::find($id);

        if (!$project) {
            return new \WP_REST_Response([
                'message' => 'Project not found.',
            ], 404);
        }

        $project->update([
            'client_id'    => $data['client_id'],
            'manager_id'   => $data['manager_id'],
            'status_id'    => $data['status_id'],
            'priority_id'  => $data['priority_id'],
            'currency_id'  => $data['currency_id'],
            'title'        => $data['title'],
            'budget'       => $data['budget'],
            'start_date'   => $data['start_date'],
            'due_date'     => $data['due_date'],
            'description'  => $data['description'],
        ]);

        if(isset($data['client_id'])) {
            Invoice::where('project_id', $project->id)->update(['client_id' => $data['client_id']]);
            Email::where('project_id',$project->id)->update(['client_id' => $data['client_id']]);
            File::where('project_id',$project->id)->update(['client_id' => $data['client_id']]);
            Note::where('project_id',$project->id)->update(['client_id' => $data['client_id']]);
        }

        $team_members = EicCrmUser::getTeamMembers(false);
        $teamMemberIds = $team_members->pluck('id')->toArray();

        $validAssigneeIds = array_filter($data['assignee_ids'], function ($id) use ($teamMemberIds) {
            return in_array($id, $teamMemberIds);
        });
        $project->eicCrmUsers()->sync($validAssigneeIds);

        $projectResponse = [
            'id'           => $project->id,
            'title'        => $project->title,
            'description'  => $project->description,
            'client_id'    => $project->client_id,
            'manager_id'   => $project->manager_id,
            'status_id'    => $project->status_id,
            'priority_id'  => $project->priority_id,
            'currency_id'  => $project->currency_id,
            'budget'       => $project->budget,
            'start_date'   => $project->start_date,
            'due_date'     => $project->due_date,
            'description'  => $project->description,
        ];

        return new \WP_REST_Response([
            'message' => 'Project updated successfully.',
            'project' => $projectResponse,
        ], 200);
    }
}