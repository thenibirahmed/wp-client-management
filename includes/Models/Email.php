<?php 

namespace WpClientManagement\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Email extends Model
{
    protected $table = 'emails';

    
    public function client() :BelongsTo {
        return $this->belongsTo(Client::class);
    }

}
