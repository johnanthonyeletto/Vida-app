<?php

namespace App\Http\Controllers;

class ExampleController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Exmple function returns phpinfo for current system.
     *
     * @return json
     */
    public function phpInfo()
    {
        return response()->json(phpinfo());
    }
}
