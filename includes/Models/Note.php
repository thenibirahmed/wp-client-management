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

    public static function getClientNotes($id, $page)
    {
        return self::with('eic_crm_user')
                    ->where('client_id',$id)
                    ->paginate(5, ['*'], 'note', $page);
    }

    public static function getProjectNotes($id, $page)
    {
        return self::with('eic_crm_user')
                    ->where('project_id',$id)
                    ->paginate(3, ['*'], 'note', $page);
    }

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