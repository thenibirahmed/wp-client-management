<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Client;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $table = 'eic_schedules';

    protected $fillable = [
        'created_by',
        'hosted_by',
        'guest_ids',
        'topic',
        'description',
        'scheduled_at',
        'link',
        'duration',
        'duration_type',
    ];

    public const DURATION_TYPES = [
        'minutes' => 'Minutes',
        'hours'   => 'Hours',
        'days'    => 'Days',
    ];

    public static function getGuests($ids)
    {
        return EicCrmUser::whereIn('id', $ids)->get();
    }

    public static function getSchedules($id, $page) {

        return Schedule::whereRaw("JSON_CONTAINS(guest_ids, '$id')")->paginate(5, ['*'], 'page', $page);
    }

    public static function getTeamMemberSchedules($id, $page)
    {

        return Schedule::whereRaw("JSON_CONTAINS(guest_ids, '$id')")->paginate(5, ['*'], 'page', $page);
    }

    public function creator()
    {
        return $this->belongsTo(EicCrmUser::class, 'created_by');
    }

    public function host()
    {
        return $this->belongsTo(EicCrmUser::class, 'hosted_by');
    }

    public function author() {
        return $this->belongsTo(EicCrmUser::class, 'created_by');
    }

    public function client() {
        return $this->belongsTo(Client::class);
    }

}