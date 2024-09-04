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
        'due_date',
        'status_id',
        'priority_id',
        'description'
    ];

    public static function getTeamMemberTasks($id, $page)
    {
        return Task::where('assigned_to', $id)
                ->paginate(2, ['*'], 'page', $page);
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