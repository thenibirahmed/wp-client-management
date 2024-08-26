<?php

namespace WpClientManagement\Models;

use WpClientManagement\Models\Client;
use WpClientManagement\Models\Project;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $table = 'eic_invoices';

    protected $fillable = [
        'eic_crm_user_id',
        'project_id',
        'client_id',
        'code',
        'type',
        'title',
        'date',
        'due_date',
        'items',
        'note',
        'billing_address',
        'status',
        'total',
        'discount',
        'tax',
        'fee'
    ];

    
   public function getPaidInvoices()
   {

   }


    public function eic_crm_user()
    {
        return $this->belongsTo(EicCrmUser::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class,'status_id');
    }

}