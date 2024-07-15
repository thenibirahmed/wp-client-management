<?php 

namespace WpClientManagement\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Client extends Model
{
    protected $table = 'clients';

    public function eic_crm_user() :BelongsTo{
        return $this->belongsTo(EicCrmUser::class);
    }

    public function projects() :HasMany {
        return $this->hasMany(Project::class);
    }

    public function emails() :HasMany {
        return $this->hasMany(Email::class);
    }

    public function schedules() :HasMany {
        return $this->hasMany(Schedule::class);
    }

    public function invoices() :HasMany {
        return $this->hasMany(Invoice::class);
    }

}
