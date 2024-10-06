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
        'role_id',
        'designation'
    ];

    public static function getTeamMembers($page, $search = '')
    {
        $clientIds = Client::pluck('eic_crm_user_id')->toArray();

        $query = self::whereNotIn('id', $clientIds);

        if ($search) {
            $query->where('phone', 'like', '%' . $search . '%')
                ->orWhereHas('wp_user', function ($query) use ($search) {
                $query->where('user_login', 'like', '%' . $search . '%')
                    ->orWhere('user_email', 'like', '%' . $search . '%');
            });
        }

        return $query->paginate(3, ['*'], 'member', $page);
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

    public static function getGuests($ids)
    {
        return self::whereIn('id', $ids)->get()->keyBy('id');
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

    public function wp_user()
    {
        return $this->belongsTo(WpUser::class,'wp_user_id');
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }


}