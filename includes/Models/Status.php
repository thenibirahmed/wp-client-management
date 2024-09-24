<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Task;
use WpClientManagement\Models\Project;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $table = 'eic_statuses';

    protected $fillable = [
        'name',
        'type'
    ];

    public CONST TYPES = [
        'project' => 'project',
        'task'    => 'task',
        'deal'    => 'deal',
        'invoice' => 'invoice',
    ];

    public static function getStatuses($type)
    {
        return Status::where('type', $type)->get();
    }

    public function projects() {
        return $this->hasMany(Project::class);
    }

    public function tasks() {
        return $this->hasMany(Task::class);
    }
}