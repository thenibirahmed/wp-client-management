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

    protected $casts = [
        'date'      => 'date',
        'due_date'  => 'date',
        'sub_total' => 'float',
        'total'     => 'float',
        'discount'  => 'float',
        'tax'       => 'float',
        'fee'       => 'float'
    ];

    public static function getAllClientsInvoices($clientIds)
    {
        return self::with(['status','project','paymentMethod'])
                ->whereIn('client_id',$clientIds)
                ->get();
    }

    public static function getClientInvoices($id ,$page, $currency, $from, $to, $status_id, $search = '')
    {
        $query = self::with(['status','project','paymentMethod'])
                ->where('client_id',$id)
                ->whereBetween('date', [$from, $to]);

        if (!empty($currency)) {
            $query->whereHas('currency', function ($q) use ($currency) {
                $q->where('code', $currency);
            });
        }

        if(!empty($status_id)) {
            $query->where('status_id', $status_id);
        }

        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('code', 'like', '%' . $search . '%')
                  ->orWhere('total', 'like', '%' . $search . '%')
                  ->orWhereHas('project', function($q2) use ($search) {
                      $q2->where('title', 'like', '%' . $search . '%');
                  });
            });
        }

        return $query->paginate(5, ['*'] , 'invoice', $page);
    }

    public static function getSingleClientInvoices($id, $currency)
    {
        $query =  self::with(['status'])
                    ->where('client_id',$id);

        if($currency) {
            $query->whereHas('currency', function ($q) use ($currency) {
                $q->where('code', $currency);
            });
        }

        return $query->get();
    }

    public static function getSingleProjectInvoices($id, $currency)
    {
        $query = self::with(['status'])
                ->where('project_id',$id);

            $query->whereHas('currency', function ($q) use ($currency) {
                $q->where('code', $currency);
            });

        return $query->get();
    }

    public static function getPorjectInvoices($id, $page)
    {
        return self::with(['status','project','paymentMethod'])
                    ->where('project_id', $id)
                    ->paginate(5, ['*'] , 'invoice', $page);
    }

    public static function getAllProjectInvoices($projectIds, $currency, $from, $to)
    {
        $query = self::whereIn('project_id', $projectIds)
                ->whereBetween('date', [$from, $to]);

        if($currency) {
            $query->whereHas('currency', function ($q) use ($currency) {
                $q->where('code', $currency);
            });
        }

        return $query->get();
    }

    public static function getAllPaidInvoices()
    {
        return self::where('status.type','invoice')
                ->where('status.name','paid')
                ->get();
    }

    public static function getActiveClientsInvoices($clientIds, $currency, $from, $to)
    {
        $query = self::whereIn('client_id', $clientIds)
                ->whereBetween('created_at', [$from, $to]);

        if($currency) {
            $query->whereHas('currency', function ($q) use ($currency) {
                $q->where('code', $currency);
            });
        }

        return $query->get();

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