<?php

namespace WpClientManagement\API\Files;

use WpClientManagement\Helpers\AuthUser;
use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\File;

class GetFiles {

    private $namespace = 'wp-client-management/v1';

    private $endpoint = '/files';

    public function __construct() {
        register_rest_route($this->namespace, $this->endpoint, [
            'methods'  => \WP_REST_Server::READABLE,
            'callback' => array($this, 'get_files'),
            'permission_callback' => 'is_user_logged_in',
        ]);
    }

    public function get_files(\WP_REST_Request $request) {

        $page = $request->get_param('page');

        if(AuthUser::user()->role == 'admin') {

            $files = File::paginate(5, ['*'], 'page', $page);

        }elseif(AuthUser::user()->role == 'team-member') {

            $authUser = EicCrmUser::find(AuthUser::user()->id);

            $projecIds = $authUser->assignedProjects->pluck('id')->toArray();

            $files = File::whereIn('project_id', $projecIds)->paginate(5, ['*'], 'page', $page);
        }else{
            return new \WP_REST_Response([
                'error' => 'Unauthorized',
            ],401);
        }

        $data = [];
        foreach ($files as $file) {
            $data[] = [
                'id'          => $file->id,
                'title'       => $file->title,
                'url'         => $file->url,
                'project_id'  => $file->project_id,
                'created_at'  => $file->created_at,
            ];
        }

        return new \WP_REST_Response([
            'data' => $data,
            'pagination' => [
                'total'         => $files->total(),
                'per_page'      => $files->perPage(),
                'current_page'  => $files->currentPage(),
                'last_page'     => $files->lastPage(),
                'next_page_url' => $files->nextPageUrl(),
                'prev_page_url' => $files->previousPageUrl(),
            ],
        ]);
    }
}