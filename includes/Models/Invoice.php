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
        'currency_id',
        'payment_method_id',
        'status_id',
        'code',
        'type',
        'title',
        'date',
        'due_date',
        'items',
        'note',
        'bill_to_id',
        'billing_address',
        'billing_phone_number',
        'billing_email',
        'bill_from_id',
        'bill_from_address',
        'bill_from_phone_number',
        'bill_from_email',
        'sub_total',
        'total',
        'discount',
        'tax',
        'fee'
    ];

    public static function getClientInvoices($id ,$page)
    {
        return self::with(['status','project','paymentMethod'])
                ->where('client_id',$id)
                ->paginate(2, ['*'], 'invoice', $page);
    }

    public static function getSingleClientInvoices($id)
    {
        return self::with(['status'])
                ->where('client_id',$id)
                ->get();
    }

    public static function getSingleProjectInvoices($id)
    {
        return self::with(['status'])
                ->where('project_id',$id)
                ->get();
    }

    public static function getPorjectInvoices($id, $page)
    {
        return self::where('project_id', $id)
                    ->paginate(5, ['*'] , 'invoice', $page);
    }

    public static function getAllPaidInvoices()
    {
        return self::where('status.type','invoice')
                ->where('status.name','paid')
                ->get();
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function eic_crm_user()
    {
        return $this->belongsTo(EicCrmUser::class);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id');
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

    public function invoice_items()
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function bill_to()
    {
        return $this->belongsTo(Client::class, 'bill_to_id');
    }

    public function bill_from()
    {
        return $this->belongsTo(EicCrmUser::class, 'bill_from_id');
    }

}