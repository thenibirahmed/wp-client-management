<?php

namespace WpClientManagement\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    protected $table = 'eic_payment_methods';

    protected $fillable = ['name'];

}