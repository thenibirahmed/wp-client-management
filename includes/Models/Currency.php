<?php

namespace WpClientManagement\Models;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $table = 'eic_currencies';

    protected $fillable = [
        'name',
        'symbol',
        'code'
    ];

    public static function getCurrencyData($code)
    {
        return self::where('code',$code)->select('code','symbol')->first();
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);

    }


}