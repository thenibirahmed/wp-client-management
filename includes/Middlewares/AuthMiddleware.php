<?php
namespace WpClientManagement\Middlewares;
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

    public static function teamMember()
    {
        if(is_user_logged_in() && AuthUser::user()->role == 'team-member' || AuthUser::user()->role == 'admin') {
            return true;
        } else {
            return false;
        }
    }

    public static function guest()
    {
        if(is_user_logged_in()) {
            return false;
        } else {
            return true;
        }
    }

}

?>