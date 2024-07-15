<?php 

namespace WpClientManagement\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $table = 'projects';

    
    public function client() :BelongsTo {
        return $this->belongsTo(Client::class);
    }

    public function manager() :BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function notes() :HasMany {
        return $this->hasMany(Note::class);
    }

    public function files() :HasMany {
        return $this->hasMany(File::class);
    }
    
    public function eicCrmUsers()
    {
        return $this->belongsToMany(EicCrmUser::class, 'project_eic_crm_users');
    }

    public function status() :BelongsTo {
        return $this->belongsTo(Status::class);
    }

    public function priority() :BelongsTo {
        return $this->belongsTo(Priority::class);
    }

    public function deal_pipeline() :BelongsTo {
        return $this->belongsTo(DealPipeline::class);
    }

    public function invoices() :HasMany {
        return $this->hasMany(Invoice::class);
    }

}
