<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * The request instance.
     *
     * @var \Illuminate\Http\Request
     */
    private $request;

    /**
     * Create a new controller instance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Exmple function returns phpinfo for current system.
     *
     * @return json
     */
    public function getClientList()
    {
        $active = $this->request->auth->clients()->where('isActive', true)->get();

        $inactive = $this->request->auth->clients()->where('isActive', false)->get();

        $clients = [
            'active' => $active,
            'inactive' => $inactive,
        ];

        return response()->json($clients);
    }

    public function getClient($pid)
    {
        /*
        This allows coaches to only see their clients. This will probably have to be modified when we implement super coaches.
         */
        $person = $this->request->auth->clients()->where('pid', $pid)->first();
        if ($person == null) {
            abort(404, 'This client could not be found. They might not be your client.');
        }

        return response()->json($person);
    }
}
