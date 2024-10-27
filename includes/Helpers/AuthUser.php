<?php

namespace WpClientManagement\Helpers;

use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\WpUser;

class AuthUser
{
    public static function user()
    {
        $me = wp_get_current_user();

        if (!$me || !$me->ID) {
            return null;
        }

        $wp_user = WpUser::find($me->ID);

        if (!$wp_user) {
            return null;
        }

        $eic_user = EicCrmUser::where('wp_user_id', $wp_user->ID)->first();

        if (!$eic_user || !$eic_user->role) {
            return null;
        }

        return (object) [
            'id'        => $eic_user->role->name === 'client' ? $eic_user->client->id : $eic_user->id,
            'name'      => $wp_user->user_login,
            'email'     => $wp_user->user_email,
            'role'      => $eic_user->role->name,
            'guest_id'  => $eic_user->id,
        ];
    }
}

?>