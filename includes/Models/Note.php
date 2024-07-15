<?php 

namespace WpClientManagement\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    protected $table = 'notes';

    public function project() :BelongsTo{
        return $this->belongsTo(Project::class);
    }
}
