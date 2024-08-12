<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Client;
use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    protected $table = 'eic_emails';


    public function client() {
        return $this->belongsTo(Client::class);
    }

}