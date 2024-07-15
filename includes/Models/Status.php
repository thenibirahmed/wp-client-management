<?php 

namespace WpClientManagement\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Status extends Model
{
    protected $table = 'statuses';

    
    public function projects() :HasMany {
        return $this->hasMany(Project::class);
    }
    
    public function tasks() :HasMany {
        return $this->hasMany(Task::class);
    }


}
