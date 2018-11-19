<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use DB;

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

    public function addEvent()
    {

        $validatedData = $this->validate($this->request, [
            'event_id' => 'numeric|nullable',
            'pid' => 'numeric|required',
            'event_datetime' => 'date|required',
            'location' => 'max:255|string|nullable',
            'notes' => 'max:255|string|nullable',
        ]);

        $event = Event::findOrNew($this->request->input('event_id'));

        $event->pid = trim($this->request->input('pid'));
        $event->event_datetime = trim($this->request->input('event_datetime'));
        $event->location = trim($this->request->input('location'));
        $event->notes = trim($this->request->input('notes'));

        $event->save();

        // if ($this->request->input('event_id') == null) {
        //     \DB::table('coach_clients')->insert(
        //         [
        //             'coach_id' => $this->request->auth->pid,
        //             'client_id' => $client->pid,
        //             "created_at" => \Carbon\Carbon::now(), # \Datetime()
        //             "updated_at" => \Carbon\Carbon::now(), # \Datetime()
        //         ]
        //     );
        // }

        return response()->json($event->event_id);

    }

    // We want a function to delete a specific meeting

    public function deleteEvent($event_id){
      Event::find($event_id)->delete();
      return response()->json("deleted");
    }

}
