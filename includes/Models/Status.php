<?php 

namespace WpClientManagement\Models;

use WpClientManagement\Models\Task;
use WpClientManagement\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Status extends Model
{
    protected $table = 'eic_statuses';

    public function projects() {
        return $this->hasMany(Project::class);
    }
    
    public function tasks() {
        return $this->hasMany(Task::class);
    }


}
