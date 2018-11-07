<?php

namespace App\Http\Controllers;

use App\Models\Person;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

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
        $person = $this->request->auth->clients()->where('pid', $pid)->with('nextMeeting', 'relationshipsPID1', 'relationshipsPID2')->first();
        if ($person == null) {
            abort(404, 'This client could not be found. They might not be your client.');
        }

        $person->relationships = $person->relationshipsPID1->merge($person->relationshipsPID2)->unique()->all();
        unset($person->relationshipsPID1);
        unset($person->relationshipsPID2);

        if (sizeof($person->relationships) < 1) {
            unset($person->relationships);
        }

        return response()->json($person);
    }

    public function createClient()
    {

        $image = $this->request->input('image_path'); // your base64 encoded
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = $this->request->auth->pid . "-" . time() . "-" . str_random(20) . '.' . 'png';
        File::put(base_path() . '/public/img/people_images/' . $imageName, base64_decode($image));

        $newClient = new Person();
        $newClient->fname = $this->request->input('fname');
        $newClient->lname = $this->request->input('lname');
        $newClient->address = $this->request->input('address');
        $newClient->address2 = $this->request->input('address2');
        $newClient->city = $this->request->input('city');
        $newClient->state_province = $this->request->input('state_province');
        $newClient->cell_phone = $this->request->input('cell_phone');
        $newClient->home_phone = $this->request->input('home_phone');
        $newClient->email = $this->request->input('email');
        $newClient->occupation = $this->request->input('occupation');
        $newClient->image_path = $imageName;

        $newClient->save();

        \DB::table('coach_clients')->insert(
            [
                'coach_id' => $this->request->auth->pid,
                'client_id' => $newClient->pid,
                "created_at" => \Carbon\Carbon::now(), # \Datetime()
                "updated_at" => \Carbon\Carbon::now(), # \Datetime()
            ]
        );

        return response()->json($newClient->pid);

    }
}
