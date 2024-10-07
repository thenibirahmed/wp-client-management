<?php
namespace WpClientManagement\Middlewares;
use WP_Error;
use WpClientManagement\Helpers\AuthUser;

class AuthMiddleware
{
    public static function auth()
    {
        return is_user_logged_in();
    }

    public static function admin()
    {
        if(is_user_logged_in() && AuthUser::user()->role == 'admin') {
            return true;
        } else {
            return false;
        }
    }
}

?>