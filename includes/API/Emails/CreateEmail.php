<?php
namespace WpClientManagement\API\Emails;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\Email;
use WpClientManagement\Models\Project;

class CreateEmail{

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/email/create';

    protected array $rules = [
        'eic_crm_user_id'  => 'nullable|exists:eic_eic_crm_users,id',
        'client_id'        => 'required|exists:eic_clients,id',
        'project_id'       => 'nullable|exists:eic_projects,id',
        'subject'          => 'nullable|string',
        'body'             => 'required|string',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required'  => 'The User is invalid.',
        'eic_crm_user_id.exists'    => 'The User does not exists.',
        'client_id.required'        => 'The client field is required.',
        'client_id.exists'          => 'The selected client does not exist.',
        'project_id.exists'         => 'The selected project does not exist.',
        'subject.string'            => 'The subject must be a valid string.',
        'body.required'             => 'The body field is required.',
        'body.string'               => 'The body must be a valid string.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_email'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function create_email(\WP_REST_Request $request) {
        global $validator;

        $data = $request->get_params();

        $currentWpUser           = wp_get_current_user();
        $eicCrmUserId            = EicCrmUser::whereWpUserId($currentWpUser->ID)->pluck('id')->first();
        $data['eic_crm_user_id'] = isset($eicCrmUserId) ? intval($eicCrmUserId) : null;
        $data['client_id']       = isset($data['client_id']) ? intval($data['client_id']) : null;
        $data['project_id']      = isset($data['project_id']) ? intval($data['project_id']) : null;
        $data['subject']         = isset($data['subject']) ? sanitize_text_field($data['subject']) : '';
        $data['body']            = $data['body'];

        if(!isset($data['client_id']) && isset($data['project_id'])) {
            $data['client_id'] = Project::find($data['project_id'])->pluck('client_id')->first() ?? null;
        }

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $email = Email::create($data);

        if(!$email) {
            return new \WP_REST_Response([
                'message' => 'Something went wrong',
            ]);
        }

        $response = [
            'id'      => $email->id,
            'from'    => $email->eic_crm_user_id,
            'to'      => $email->client_id,
            'subject' => $email->subject,
            'body'    => $email->body
        ];

        return new \WP_REST_Response([
            'message' => 'Email created successfully.',
            'email' => $response,
        ], 201);
    }
}