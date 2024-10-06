<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Client;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $table = 'eic_schedules';

    protected $fillable = [
        'eic_crm_user_id',
        'client_id',
        'date',
        'duration',
        'link',
        'hosts'
    ];

    public const DURATION_TYPES = ['minutes', 'hours', 'days'];

    public static function getClientSchedules($client_id, $page = 1) {

        return Schedule::whereJsonContains('guest_ids->guest_ids', $client_id)->paginate(5, ['*'], 'page', $page);
    }

    public function creator()
    {
        return $this->belongsTo(EicCrmUser::class, 'created_by');
    }

    public function host()
    {
        return $this->belongsTo(EicCrmUser::class, 'hosted_by');
    }

    public function eic_crm_user() {
        return $this->belongsTo(EicCrmUser::class);
    }

    public function client() {
        return $this->belongsTo(Client::class);
    }

}