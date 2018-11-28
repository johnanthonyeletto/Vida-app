<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Person;

class GraphController extends Controller
{
    /**
     * The request instance.
     *
     *
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

    // We want a function to get all Meetings
    /**
     * Exmple function returns phpinfo for current system.
     *
     * @return json
     */
      // public function getRelationshipList()
      // {
      //     return response()->json($this->request->auth->Relationships());
      // }

      public function getRelationshipList($client_id){


        $client = Person::find($client_id)->Relationships();

        if ($client == null) {
            abort(404, 'This client could not be found.');
        }
        return response()->json($client);
      }

}
