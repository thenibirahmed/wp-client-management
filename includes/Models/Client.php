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
