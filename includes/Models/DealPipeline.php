<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Project;
use Illuminate\Database\Eloquent\Model;

class DealPipeline extends Model
{
    protected $table = 'eic_deal_pipelines';

    public function projects() {
        return $this->hasMany(Project::class);
    }

}