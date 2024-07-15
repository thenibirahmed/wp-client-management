<?php 

namespace WpClientManagement\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DealPipeline extends Model
{
    protected $table = 'deal_pipelines';

    public function projects() :HasMany {
        return $this->hasMany(Project::class);
    }

}
