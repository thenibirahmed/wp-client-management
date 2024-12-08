<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Project;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table = 'eic_files';

    protected $fillable = [
        'eic_crm_user_id',
        'project_id',
        'client_id',
        'title',
        'url',
        'type',
        'image_url',
    ];

    public static function getClientFiles($id, $page, $from, $to, $search = '')
    {
        $query = self::where('client_id', $id)
                ->with('project')
                ->whereBetween('created_at', [$from, $to]);

        if(!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                ->orWhere('url', 'like', '%' . $search . '%')
                ->orWhereHas('eic_crm_user.wp_user', function($q2) use ($search) {
                      $q2->where('user_login', 'like', '%' . $search . '%');
                  });
            });
        }

        return $query ->paginate(3, ['*'], 'file', $page);
    }

    public static function getProjectFiles($id, $page, $from, $to, $search = '')
    {
        $query = self::with('eic_crm_user')
                    ->where('project_id', $id)
                    ->whereBetween('created_at', [$from, $to]);

        if(!empty($search)) {
            $query->where('title', 'like', '%' . $search . '%')
                  ->orWhere('url', 'like', '%' . $search . '%')
                  ->orWhereHas('eic_crm_user.wp_user', function($q2) use ($search) {
                      $q2->where('user_login', 'like', '%' . $search . '%');
                  });
        }

        return $query->paginate(5, ['*'], 'file', $page);
    }

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function eic_crm_user() {
        return $this->belongsTo(EicCrmUser::class);
    }

    public function project() {
        return $this->belongsTo(Project::class);
    }


}