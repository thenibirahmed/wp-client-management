<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Project;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table = 'eic_files';

    public function project() {
        return $this->belongsTo(Project::class);
    }

}