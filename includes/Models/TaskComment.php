<?php 

namespace WpClientManagement\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class TaskComment extends Model
{
    protected $table = 'task_comments';

    public function task() :BelongsTo {
        return $this->belongsTo(Task::class);
    }

    public function eic_crm_user() :BelongsTo {
        return $this->belongsTo(EicCrmUser::class);
    }

    public function reply_to() :BelongsTo {
        return $this->belongsTo(TaskComment::class,'reply_to');
    }

}
