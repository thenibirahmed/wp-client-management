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

    public static function getClientEmails($id, $page)
    {
        return self::where('client_id', $id)
                ->paginate(2, ['*'], 'email', $page);
    }

    public static function getProjectEmails($id, $page)
    {
        return self::where('project_id', $id)
                ->paginate(2, ['*'], 'email', $page);
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