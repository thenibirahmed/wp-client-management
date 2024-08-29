<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\User;
use WpClientManagement\Models\Client;
use WpClientManagement\Models\Project;
use Illuminate\Database\Eloquent\Model;

class EicCrmUser extends Model
{
    protected $table = 'eic_eic_crm_users';

    protected $fillable = [
        'wp_user_id',
        'phone',
        'address',
        'city',
        'country',
        'state',
        'zip',
        'role'
    ];

    public static function getTeamMembers($page)
    {
        return EicCrmUser::where('role', 'team')
                    ->paginate(20, ['*'], 'page', $page);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function client() {
        return $this->hasOne(Client::class);
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_eic_crm_users');
    }

}