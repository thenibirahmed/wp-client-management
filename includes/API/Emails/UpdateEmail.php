<?php

namespace WpClientManagement\API\Emails;

use WpClientManagement\Models\Email;

class UpdateEmail {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/email/update/(?P<id>\d+)';

    protected array $rules = [
        'eic_crm_user_id' => 'required|exists:eic_eic_crm_users,id',
        'client_id' => 'required|exists:eic_clients,id',
        'project_id' => 'nullable|exists:eic_projects,id',
        'subject' => 'nullable|string',
        'body' => 'required|string',
        'scheduled_at' => 'required|date',
        'sent' => 'required|boolean',
    ];

    protected array $validationMessages = [
        'eic_crm_user_id.required' => 'The User field is required.',
        'eic_crm_user_id.exists' => 'The selected User does not exist.',
        'client_id.required' => 'The client field is required.',
        'client_id.exists' => 'The selected client does not exist.',
        'project_id.exists' => 'The selected project does not exist.',
        'subject.string' => 'The subject must be a valid string.',
        'body.required' => 'The body field is required.',
        'body.string' => 'The body must be a valid string.',
        'scheduled_at.required' => 'The date field is required.',
        'scheduled_at.date' => 'The date must be a valid date.',
        'sent.required' => 'The sent field is required.',
        'sent.boolean' => 'The sent field must be true or false.',
    ];

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_email'],
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function update_email(\WP_REST_Request $request) {
        global $validator;
        $id = $request->get_param('id');
        $data = $request->get_params();

        $validator = $validator->make($data, $this->rules, $this->validationMessages);

        if ($validator->fails()) {
            return new \WP_REST_Response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $email = Email::find($id);

        if (!$email) {
            return new \WP_REST_Response([
                'message' => 'Email not found.',
            ], 404);
        }

        $email->update([
            'eic_crm_user_id' => $data['eic_crm_user_id'],
            'project_id' => $data['project_id'],
            'client_id' => $data['client_id'],
            'subject' => $data['subject'],
            'body' => $data['body'],
            'scheduled_at' => $data['scheduled_at'],
            'sent' => $data['sent'],
        ]);

        return new \WP_REST_Response([
            'message' => 'Email updated successfully.',
            'status' => $email,
        ], 200);
    }
}