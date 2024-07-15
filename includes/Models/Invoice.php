<?php 

namespace WpClientManagement\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    protected $table = 'invoices';
    
    public function client() :BelongsTo{
        return $this->belongsTo(Client::class);
    }

    public function project() :BelongsTo{
        return $this->belongsTo(Project::class);
    }

}
