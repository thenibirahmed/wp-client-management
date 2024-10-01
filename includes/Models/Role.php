<?php

namespace WpClientManagement\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'eic_roles';

    protected $fillable = ['name'];

    public function eic_users() {
        return $this->hasMany(EicCrmUser::class);
    }


}