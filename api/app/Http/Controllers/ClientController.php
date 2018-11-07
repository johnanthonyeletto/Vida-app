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

        $validatedData = $this->validate($this->request, [
            'pid' => 'numeric|nullable',
            'fname' => 'required|max:100',
            'lname' => 'required|max:100',
            'address' => 'max:100|string|nullable',
            'address2' => 'max:255|string|nullable',
            'city' => 'max:100|string|nullable',
            'state_province' => 'max:100|string|nullable',
            'cell_phone' => 'max:20|numeric|nullable',
            'home_phone' => 'max:20|numeric|nullable',
            'email' => 'max:100|email|nullable',
            'occupation' => 'string|nullable',
        ]);

        if ($this->request->input('pid') == null) {
            $newClient = new Person();
        } else {

            $newClient = Person::find($this->request->input('pid'));
            if ($newClient == null) {
                abort(404);
            }
        }

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

        $image = $this->request->input('image_base64'); // your base64 encoded
        $image_path = $this->request->input('image_path'); // your base64 encoded
        if ($image != null) {
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = '/img/people_images/' . $this->request->auth->pid . "-" . time() . "-" . str_random(100) . '.' . 'png';
            File::put(base_path() . '/public' . $imageName, base64_decode($image));
        } else if ($image_path == null) {
            $imageName = "/img/people_images/default.png";
        } else {
            $imageName = $image_path;
        }
        $newClient->image_path = $imageName;

        $newClient->save();

        if ($this->request->input('pid') == null) {
            \DB::table('coach_clients')->insert(
                [
                    'coach_id' => $this->request->auth->pid,
                    'client_id' => $newClient->pid,
                    "created_at" => \Carbon\Carbon::now(), # \Datetime()
                    "updated_at" => \Carbon\Carbon::now(), # \Datetime()
                ]
            );
        }

        return response()->json($newClient->pid);

    }

    public function updateClient()
    {

        $validatedData = $this->validate($this->request, [
            'pid' => 'required|numeric|nullable',
            'fname' => 'required|max:100',
            'lname' => 'required|max:100',
            'address' => 'max:100|string|nullable',
            'address2' => 'max:255|string|nullable',
            'city' => 'max:100|string|nullable',
            'state_province' => 'max:100|string|nullable',
            'cell_phone' => 'max:20|numeric|nullable',
            'home_phone' => 'max:20|numeric|nullable',
            'email' => 'max:100|email|nullable',
            'occupation' => 'string|nullable',
        ]);

        $client = Person::find($this->request->input('pid'));
        if ($client == null) {
            abort(404);
        }

        $client->fname = $this->request->input('fname');
        $client->lname = $this->request->input('lname');
        $client->address = $this->request->input('address');
        $client->address2 = $this->request->input('address2');
        $client->city = $this->request->input('city');
        $client->state_province = $this->request->input('state_province');
        $client->cell_phone = $this->request->input('cell_phone');
        $client->home_phone = $this->request->input('home_phone');
        $client->email = $this->request->input('email');
        $client->occupation = $this->request->input('occupation');

        $image = $this->request->input('image_base64'); // your base64 encoded

        if ($image != null) {
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = '/img/people_images/' . $this->request->auth->pid . "-" . time() . "-" . str_random(100) . '.' . 'png';
            File::put(base_path() . '/public' . $imageName, base64_decode($image));
            $newClient->image_path = $imageName;
        }

        $newClient->save();

        return response()->json($newClient->pid);

    }
}
