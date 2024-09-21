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

    public static function getClientFiles($id, $page)
    {
        return self::where('client_id', $id)->paginate(3, ['*'], 'file', $page);
    }

    public static function getProjectFiles($id, $page)
    {
        return self::with('eic_crm_user')
                    ->where('project_id', $id)
                    ->paginate(5, ['*'], 'file', $page);
    }

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