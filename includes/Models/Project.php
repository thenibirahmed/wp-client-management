<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\File;
use WpClientManagement\Models\Note;
use WpClientManagement\Models\Client;
use WpClientManagement\Models\Status;
use WpClientManagement\Models\Invoice;
use Illuminate\Database\Eloquent\Model;
use WpClientManagement\Helpers\AuthUser;
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
        'currency_id',
        'start_date',
        'due_date',
        'description',
        'is_deal'
    ];

    public static function getActiveProjects()
    {
        return self::whereHas('status', function ($query) {
            $query->where('type', 'project')
                  ->where('name','!=','in_progress');
        })->get();
    }

    public static function getAllProjects($page, $from, $to, $status_id, $priority_id, $search = '')
    {
        $query = self::with('invoices','priority')
                ->whereBetween('start_date', [$from, $to]);

        if($status_id){
            $query->where('status_id', $status_id);
        }

        if($priority_id){
            $query->where('priority_id', $priority_id);
        }

        if(!empty($search)){
            $query->where('title', 'like', '%'.$search.'%')
                  ->orWhereHas('client.eic_crm_user.wp_user', function ($q) use ($search) {
                     $q->where('user_login', 'like', '%'.$search.'%');
                  });
        }

        return $query->paginate(3, ['*'], 'project', $page);
    }

    public static function getClientProjects($id, $page, $from, $to, $priority_id, $status_id, $search = '')
    {
        $query = self::with('invoices','priority')
                ->where('client_id', $id)
                ->whereBetween('start_date', [$from, $to]);


        if($status_id){
            $query->where('status_id', $status_id);
        }

        if($priority_id){
            $query->where('priority_id', $priority_id);
        }

        if(!empty($search)){
            $query->where('title', 'like', '%'.$search.'%');
        }

        return $query->paginate(20, ['*'], 'project', $page);
    }

    public static function getTeamMemberProjects($id, $page, $from, $to, $priority_id, $status_id, $search = '')
    {
        $authUser = EicCrmUser::find($id);

        $projectIds = $authUser->assignedProjects->pluck('id')->toArray(); ;

        $query = self::with('invoices','priority')
                ->whereIn('id', $projectIds)
                ->whereBetween('start_date', [$from, $to]);

        if($status_id){
            $query->where('status_id', $status_id);
        }

        if($priority_id){
            $query->where('priority_id', $priority_id);
        }

        if(!empty($search)){
            $query->where('title', 'like', '%'.$search.'%');
        }

        return $query->paginate(20, ['*'], 'project', $page);
    }

    // public static function getTeamMemberProjects($id, $search, $page)
    // {
    //     $query = Project::with('status', 'priority')
    //                 ->whereHas('eicCrmUsers', function ($query) use ($id) {
    //         $query->where('eic_crm_user_id', $id);
    //     });

    //     if(!empty($search)){
    //         $query->where('title', 'like', '%'.$search.'%');
    //     }

    //     return $query->paginate(3, ['*'], 'project', $page);
    // }

    public static function getProjectData($id)
    {
        return self::where('id', $id)->first();
    }

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function manager() {
        return $this->belongsTo(EicCrmUser::class, 'manager_id');
    }

    public function notes() {
        return $this->hasMany(Note::class);
    }

    public function files() {
        return $this->hasMany(File::class);
    }

    public function eicCrmUsers() {
        return $this->belongsToMany(EicCrmUser::class, 'eic_project_eic_crm_user', 'project_id', 'eic_crm_user_id');
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

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function tasks() {
        return $this->hasMany(Task::class);
    }


}