<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Project;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table = 'eic_files';

    protected $fillable = [
        'eic_crm_user_id',
        'project_id',
        'client_id',
        'title',
        'url',
        'type'
    ];

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function eic_crm_user() {
        return $this->belongsTo(EicCrmUser::class);
    }

    public function project() {
        return $this->belongsTo(Project::class);
    }


}