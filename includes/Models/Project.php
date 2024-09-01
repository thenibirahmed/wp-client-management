<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\File;
use WpClientManagement\Models\Note;
use WpClientManagement\Models\User;
use WpClientManagement\Models\Client;
use WpClientManagement\Models\Status;
use WpClientManagement\Models\Invoice;
use Illuminate\Database\Eloquent\Model;
use WpClientManagement\Models\Priority;
use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\DealPipeline;

class Project extends Model
{
    protected $table = 'eic_projects';

    protected $fillable = [
        'client_id',
        'manager_id',
        'deal_pipeline_id',
        'status_id',
        'priority_id',
        'title',
        'budget',
        'currency',
        'start_date',
        'due_date',
        'description',
        'is_deal'
    ];

    public static function getActiveProjects()
    {
        return self::whereHas('status', function ($query) {
            $query->where('type', 'project')
                  ->where('name', 'in_progress');
        })->get();
    }
    
    public static function getClientProjects($id)
    {
        return self::with('invoices','priority')->where('client_id', $id)->get();
    }

    public static function getTeamMemberProjects($id, $page)
    {
        return Project::with('status', 'priority')->whereHas('eicCrmUsers', function ($query) use ($id) {
            $query->where('eic_crm_user_id', $id);
        })->paginate(20, ['*'], 'page', $page);
    }

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function manager() {
        return $this->belongsTo(EicCrmUser::class);
    }

    public function notes() {
        return $this->hasMany(Note::class);
    }

    public function files() {
        return $this->hasMany(File::class);
    }

    public function eicCrmUsers() {
        return $this->belongsToMany(EicCrmUser::class, 'eic_project_eic_crm_users', 'project_id', 'eic_crm_user_id');
    }

    public function status() {
        return $this->belongsTo(Status::class, 'status_id');
    }

    public function priority() {
        return $this->belongsTo(Priority::class);
    }

    public function deal_pipeline()   {
        return $this->belongsTo(DealPipeline::class);
    }

    public function invoices() {
        return $this->hasMany(Invoice::class);
    }

}