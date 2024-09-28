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

    public static function getClientNotes($id, $page, $from, $to,  $search = '')
    {
        $query = self::with('eic_crm_user')
                    ->where('client_id',$id)
                    ->whereBetween('created_at', [$from, $to]);

        if(!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('note', 'like', '%' . $search . '%')
                  ->orWhereHas('eic_crm_user.wp_user', function($q2) use ($search) {
                      $q2->where('user_login', 'like', '%' . $search . '%');
                  });
            });
        }

        return $query->paginate(30, ['*'], 'note', $page);
    }

    public static function getProjectNotes($id, $page, $from, $to, $search)
    {
        $query = self::with('eic_crm_user')
                    ->where('project_id',$id)
                    ->whereBetween('created_at', [$from, $to]);

        if(!empty($search)) {
            $query->where('note', 'like', '%' . $search . '%')
                  ->orWhereHas('eic_crm_user.wp_user', function($q) use ($search) {
                      $q->where('user_login', 'like', '%' . $search . '%');
                  });
        }

        return $query->paginate(30, ['*'], 'note', $page);
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