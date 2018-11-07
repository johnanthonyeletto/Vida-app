<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
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
    public function getEventList()
    {
        return response()->json($this->request->auth->Meetings());
    }

    // We want a function to get a specific meeting

    public function getEvent($event_id){
      $event = $this->request->auth->Meetings()->where('event_id', $event_id)->first();
      if ($event == null) {
          abort(404, 'This event could not be found.');
      }
      return response()->json($event);
    }

    // We want a function to update a specific meeting

    public function updateEvent($event_id, $payload){


    }

    // We want a function to add a specific meeting

    public function addEvent($payload){
        // DB::table('event')->insert( [] );
    }

    // We want a function to delete a specific meeting

    public function deleteEvent($event_id){
      Event::find($event_id)->delete();
      return response()->json("deleted");
    }

}
