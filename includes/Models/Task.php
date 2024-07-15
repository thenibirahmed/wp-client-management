<?php 

namespace WpClientManagement\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    protected $table = 'tasks';

    public function eic_crm_user() :BelongsTo {
        return $this->belongsTo(EicCrmUser::class,);
    }
    
    public function status() :BelongsTo {
        return $this->belongsTo(Status::class);
    }

    public function priority() :BelongsTo {
        return $this->belongsTo(Priority::class);
    }

    public function comments() :HasMany {
        return $this->hasMany(TaskComment::class);
    }


}
