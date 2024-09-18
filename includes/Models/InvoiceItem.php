<?php

namespace WpClientManagement\Models;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    protected $table = 'eic_invoice_items';

    protected $fillable = [
        'invoice_id',
        'details',
        'quantity',
        'unit_price',
        'discount_type',
        'discount_value',
        'tax_type',
        'tax_value',
        'line_total'
    ];

    protected $casts = [
        'unit_price'     => 'float',
        'discount_value' => 'float',
        'tax_value'      => 'float',
        'line_total'     => 'float',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);

    }
}