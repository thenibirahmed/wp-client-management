<?php 

namespace WpClientManagement\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    protected $table = 'users';

    public function eic_crm_user():HasOne {
        return $this->hasOne(EicCrmUser::class);
    }

}
