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

    public function eic_crm_user() {
        return $this->belongsTo(EicCrmUser::class,);
    }

    public function status() {
        return $this->belongsTo(Status::class);
    }

    public function priority() {
        return $this->belongsTo(Priority::class);
    }

    public function comments() {
        return $this->hasMany(TaskComment::class);
    }


}