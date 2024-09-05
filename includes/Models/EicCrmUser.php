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
        return EicCrmUser::where('role', 'admin')
                    ->paginate(5, ['*'], 'page', $page);
    }

    public static function selectManager()
    {
        $clientIds = Client::pluck('eic_crm_user_id')->toArray();

        return self::whereNotIn('id', $clientIds)->get();
    }

    public static function getEmployee()
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

    public function assignedProjects() {
        return $this->belongsToMany(Project::class, 'eic_project_eic_crm_user', 'eic_crm_user_id', 'project_id');
    }

}