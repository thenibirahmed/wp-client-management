<?php

namespace WpClientManagement\Models;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    protected $table = 'eic_invoice_items';

    protected $fillable = [
        'invoice_id',
        'details',
        'name',
        'quantity',
        'unit_price',
        'discount_type',
        'discount_value',
        'tax_type',
        'tax_value',
        'line_total'
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);

    }
}