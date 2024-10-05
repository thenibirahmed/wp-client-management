<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Client;
use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    protected $table = 'eic_emails';

    protected $fillable = [
        'eic_crm_user_id',
        'project_id',
        'client_id',
        'subject',
        'body',
        'scheduled_at',
        'sent'
    ];

    public static function getClientEmails($id, $page, $from, $to, $search = '')
    {
        $query = self::with('eic_crm_user')
                ->whereBetween('created_at',[$from, $to]);

        if(!empty($id ?? null)) {
            $query->where('client_id', $id);
        }

        if(!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('subject', 'like', '%' . $search . '%')
                  ->orWhere('body', 'like', '%' . $search . '%')
                  ->orWhereHas('eic_crm_user.wp_user', function($q2) use ($search) {
                      $q2->where('user_login', 'like', '%' . $search . '%');
                  });
            });
        }

        return $query->paginate(3, ['*'], 'email', $page);
    }

    public static function getProjectEmails($id, $page, $from, $to, $search = '')
    {
        $query = self::where('project_id', $id)
                ->with('eic_crm_user')
                ->whereBetween('created_at',[$from, $to]);

        if(!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('subject', 'like', '%' . $search . '%')
                  ->orWhere('body', 'like', '%' . $search . '%')
                  ->orWhereHas('eic_crm_user.wp_user', function($q2) use ($search) {
                      $q2->where('user_login', 'like', '%' . $search . '%');
                  });
            });
        }

        return $query->paginate(3, ['*'], 'email', $page);
    }

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function eic_crm_user() {
        return $this->belongsTo(EicCrmUser::class);
    }

    public function project() {
        return $this->belongsTo(Project::class);
    }

}