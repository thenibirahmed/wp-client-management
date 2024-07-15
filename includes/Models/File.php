<?php 

namespace WpClientManagement\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    protected $table = 'files';

    public function project() :BelongsTo{
        return $this->belongsTo(Project::class);
    }

}
