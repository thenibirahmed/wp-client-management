<?php

namespace WpClientManagement\Models;
use WpClientManagement\Models\Email;
use WpClientManagement\Models\Invoice;
use WpClientManagement\Models\Project;
use Illuminate\Database\Eloquent\Model;
use WpClientManagement\Models\Schedule;
use WpClientManagement\Models\EicCrmUser;

class Client extends Model
{
    protected $table = 'eic_clients';

    protected $fillable  = [
        'eic_crm_user_id',
        'organization',
        'designation',
        'status'
    ];

    public static function getActiveClients()
    {
        return self::withCount('projects')->with(['eic_crm_user'])
                ->whereHas('projects', function ($query)
        {
            $query->whereHas('status', function ($subQuery)
            {
                $subQuery->where('type', 'project')
                         ->where('name', 'in_progress');
            });
        })->get();
    }

    public function eic_crm_user() {
        return $this->belongsTo(EicCrmUser::class);
    }

    public function projects() {
        return $this->hasMany(Project::class);
    }

    public function emails() {
        return $this->hasMany(Email::class);
    }

    public function schedules() {
        return $this->hasMany(Schedule::class);
    }

    public function invoices() {
        return $this->hasMany(Invoice::class);
    }

}