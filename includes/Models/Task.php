<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Status;
use Illuminate\Database\Eloquent\Model;
use WpClientManagement\Models\Priority;
use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\TaskComment;

class Task extends Model
{
    protected $table = 'eic_tasks';

    protected $fillable  = [
        'eic_crm_user_id',
        'assigned_to',
        'project_id',
        'title',
        'start_date',
        'end_date',
        'status_id',
        'priority_id',
        'description'
    ];

    public static function getProjectTasks($id, $page, $from, $to, $status_id, $priority_id, $search = '')
    {
        $query = self::where('project_id',$id)
                ->with('eic_crm_user', 'assigned_user', 'status', 'priority')
                ->whereBetween('start_date', [$from, $to]);

        if(!empty($status_id)) {
            $query->where('status_id', $status_id);
        }

        if(!empty($priority_id)) {
            $query->where('priority_id', $priority_id);
        }

        if(!empty($search)) {
            $query->where('title', 'like', '%' . $search . '%')
                  ->orWhereHas('eic_crm_user.wp_user', function($q) use ($search) {
                      $q->where('user_login', 'like', '%' . $search . '%');
                  })
                  ->orWhereHas('assigned_user.wp_user', function($q) use ($search) {
                      $q->where('user_login', 'like', '%' . $search . '%');
                  });
        }

        return $query->paginate(3, ['*'], 'task', $page);
    }

    public static function getTeamMemberTasks($id, $search, $page)
    {
        $query = self::where('assigned_to', $id);

        if(!empty($search)) {
            $query->where('title', 'like', '%' . $search . '%')
                  ->orWhereHas('eic_crm_user.wp_user', function($q) use ($search) {
                      $q->where('user_login', 'like', '%' . $search . '%');
                  });
        }

        return $query->paginate(2, ['*'], 'task', $page);
    }

    public static function getProjectTask($id)
    {
        return self::with('eic_crm_user', 'assigned_user', 'status', 'priority')
                ->find($id);
    }

    public function eic_crm_user() {
        return $this->belongsTo(EicCrmUser::class);
    }

    public function assigned_user() {
        return $this->belongsTo(EicCrmUser::class, 'assigned_to');
    }

    public function status() {
        return $this->belongsTo(Status::class);
    }

    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function priority() {
        return $this->belongsTo(Priority::class);
    }

    public function comments() {
        return $this->hasMany(TaskComment::class);
    }


}