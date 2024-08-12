<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Project;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $table = 'eic_notes';

    public function project() {
        return $this->belongsTo(Project::class);
    }
}