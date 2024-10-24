<?php
namespace WpClientManagement\API\Notes;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Note;
use WpClientManagement\Models\Project;

class CreateNote{

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/note/create';

    protected array $rules = [
        'eic_crm_user_id'   => 'nullable|exists:eic_eic_crm_users,id',
        'project_id'        => 'nullable|exists:eic_projects,id',
        'client_id'         => 'nullable|exists:eic_clients,id',
        'note'              => 'required|string',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required'   => 'The User is invalid',
        'eic_crm_user_id.exists'     => 'The User does not exist',
        'client_id.exists'           => 'The Client does not exist',
        'note.required'              => 'The note field is required.',
        'note.string'                => 'The note field must be string.'
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_note'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function create_note(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();

        $currentWpUser           = wp_get_current_user();
        $eicCrmUserId            = EicCrmUser::whereWpUserId($currentWpUser->ID)->pluck('id')->first();
        $data['eic_crm_user_id'] = isset($eicCrmUserId) ? intval($eicCrmUserId) : null;
        $data['client_id']       = isset($data['client_id']) ? intval($data['client_id']) : null;
        $data['project_id']      = isset($data['project_id']) ? intval($data['project_id']) : null;
        $data['note']            = sanitize_textarea_field($data['note'] ?? '');

        if(isset($data['project_id']) && !isset($data['client_id'])) {
            $data['client_id'] =  Project::where('id', $data['project_id'])->pluck('client_id')->first() ?? null;
        }

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $note = Note::create($data);

        if(!$note) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        $response = [
            'id'          => $note->id,
            'note'        => $note->note,
            'client_id'   => $note->client_id,
            'project_id'  => $note->project_id,
        ];

        return new \WP_REST_Response([
            'message' => 'Note created successfully.',
            'note'    => $response,
        ], 201);
    }
}