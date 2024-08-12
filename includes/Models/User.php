<?php

namespace WpClientManagement\Models;

use Illuminate\Database\Eloquent\Model;
use WpClientManagement\Models\EicCrmUser;

class User extends Model
{
    protected $table = 'users';

    public function eic_crm_user() {
        return $this->hasOne(EicCrmUser::class);
    }

}