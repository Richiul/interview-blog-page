<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class CustomAuthenticate extends Middleware
{
    protected function unauthenticated($request, array $guards)
    {
        abort(401, 'Unauthorized');
    }
}
