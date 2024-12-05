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
        'status',
        'image_url',
    ];

    public static function getActiveClients($page, $from, $to, $search = '')
    {
        $query = self::with('eic_crm_user')
                    ->whereBetween('created_at', [$from, $to]);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('eic_crm_user.wp_user', function ($q2) use ($search) {
                    $q2->where('user_login', 'like', '%' . $search . '%')
                       ->orWhere('user_email', 'like', '%' . $search . '%');
                })
                ->orWhere('organization', 'like', '%' . $search . '%');
            });
        }

        return $query->paginate(10, ['*'], 'page', $page);
    }

    public static function getTopClients($data)
    {
        return self::whereHas('invoices', function ($query) use ($data) {
                $query->whereHas('status', function ($q) {
                 $q->where('type', 'invoice')
                    ->where('name', 'paid');
                })->whereBetween('date', [$data['from'], $data['to']]);
            })
            ->with('invoices')
            ->get()
            ->map(function ($client) {
                $client->total_amount = $client->invoices->sum('total');
                return $client;
            })
            ->sortByDesc('total_amount')
            ->take(5);
    }


    // Older one.
    // public static function getActiveClients($page)
    // {
    //     return self::withCount('projects')->with(['eic_crm_user'])
    //             ->whereHas('projects', function ($query)
    //     {
    //         $query->whereHas('status', function ($subQuery)
    //         {
    //             $subQuery->where('type', 'project')
    //                      ->where('name', 'in_progress');
    //         });
    //     })->paginate(20, ['*'], 'page', $page);
    // }

    public static function getClientData($id)
    {
        return self::with('eic_crm_user')->find($id);
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