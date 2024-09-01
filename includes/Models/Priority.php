<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Task;
use WpClientManagement\Models\Project;
use Illuminate\Database\Eloquent\Model;

class Priority extends Model
{
    protected $table = 'eic_priorities';

    protected $fillable = [
        'name',
        'type',
    ];

    public CONST TYPES = [
        'project' => 'project',
        'task' => 'task',
    ];


    public static function getPriorities($type)
    {
        return Priority::where('type', $type)->get();
    }

    public function projects() {
        return $this->hasMany(Project::class);
    }

    public function tasks() {
        return $this->hasMany(Task::class);
    }

}