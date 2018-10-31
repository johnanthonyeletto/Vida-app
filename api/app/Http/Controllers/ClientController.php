<?php

namespace App\Http\Controllers;

use App\Models\Person;
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
        $active = $this->request->auth->ActiveClients();

        $inactive = $this->request->auth->InactiveClients();

        $clients = [
            'active' => $active,
            'inactive' => $inactive,
        ];

        return response()->json($clients);
    }

    public function getClient($pid)
    {
        $person = Person::where('pid', $pid)->first();
        return response()->json($person);
    }
}
