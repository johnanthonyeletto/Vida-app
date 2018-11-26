<?php

namespace App\Http\Middleware;

use Closure;

class SuperCoachMiddleware
{
    public function handle($request, Closure $next, $guard = null)
    {

        if (!$request->auth->super_coach) {
            // Unauthorized response if token not there
            return response()->json([
                'error' => 'Not an admin.',
            ], 401);
        }

        return $next($request);
    }
}
