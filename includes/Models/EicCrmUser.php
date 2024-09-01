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
        'role',
        'designation'
    ];

    public static function getTeamMembers($page)
    {
        return EicCrmUser::where('role', 'team')
                    ->paginate(20, ['*'], 'page', $page);
    }

    public static function selectManager()
    {
        $clientIds = Client::pluck('eic_crm_user_id')->toArray();

        return self::whereNotIn('id', $clientIds)->get();
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function client() {
        return $this->hasOne(Client::class);
    }

    public function projects() {
        return $this->belongsToMany(Project::class, 'eic_project_eic_crm_users', 'eic_crm_user_id', 'project_id');
    }

}