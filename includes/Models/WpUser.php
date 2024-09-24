<?php
namespace WpClientManagement\Models;
use Illuminate\Database\Eloquent\Model;

class WpUser extends Model
{
    protected $table = 'users';

    protected $fillable = [
        'user_login',
        'user_email',
        'user_pass'
    ];

}

?>