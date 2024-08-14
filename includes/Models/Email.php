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

    public function client() {
        return $this->belongsTo(Client::class);
    }

}