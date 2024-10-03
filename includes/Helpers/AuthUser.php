<?php

namespace WpClientManagement\Helpers;

use WpClientManagement\Models\EicCrmUser;
use WpClientManagement\Models\WpUser;

trait AuthUser
{
    public function AuthUser()
    {
        $me = wp_get_current_user();
        $wp_user = WpUser::find($me->ID);
        $eic_user = EicCrmUser::where('wp_user_id', $wp_user->ID)->first();
        $role= $eic_user->role->name;

        $responses = [
            'name'         => $wp_user->user_login,
            'email'        => $wp_user->user_email,
            'designation'  => $eic_user->designation ?? '',
            'organization' => $eic_user->client?->organization ?? '',
            'role'         => $role
        ];

        return $responses;
    }
}

?>