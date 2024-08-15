<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Project;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $table = 'eic_notes';

    protected $fillable = [
        'eic_crm_user_id',
        'project_id',
        'client_id',
        'note',
    ];

    public function eic_crm_user() {
        return $this->belongsTo(EicCrmUser::class);
    }

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function project() {
        return $this->belongsTo(Project::class);
    }
}