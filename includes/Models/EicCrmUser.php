<?php 

namespace WpClientManagement\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class EicCrmUser extends Model
{
    protected $table = 'eic_crm_users';

    
    public function user() :BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function client() :HasOne {
        return $this->hasOne(Client::class);
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_eic_crm_users');
    }

}
