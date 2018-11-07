<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
     public function getRelationshipList()
     {
         return response()->json($this->request->auth->Relationships());
     }
  /*
  // We want a function to get pid1
   public function getClientPid($pid1){
     $clientPid = $this->request->auth->Relationships()->where('pid1', $pid1)->first();
     if ($clientPid == null) {
         abort(404, 'This client could not be found.');
     }
     return response()->json($clientPid);
   }

    // We want a function to get a specific meeting

    public function getEvent($event_id){
      $event = $this->request->auth->Meetings()->where('event_id', $event_id)->first();
      if ($event == null) {
          abort(404, 'This event could not be found.');
      }
      return response()->json($event);
    }
*/

}
