<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Task;
use Illuminate\Database\Eloquent\Model;
use WpClientManagement\Models\EicCrmUser;
class TaskComment extends Model
{
    protected $table = 'eic_task_comments';

    public function task() {
        return $this->belongsTo(Task::class);
    }

    public function eic_crm_user() {
        return $this->belongsTo(EicCrmUser::class);
    }

    public function reply_to() {
        return $this->belongsTo(TaskComment::class,'reply_to');
    }

}