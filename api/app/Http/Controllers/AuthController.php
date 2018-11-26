<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Models\SignupCode;
use App\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Lumen\Routing\Controller as BaseController;

class AuthController extends BaseController
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
     * Create a new token.
     *
     * @param  \App\User   $user
     * @return string
     */
    protected function jwt(User $user)
    {
        $payload = [
            'iss' => "lumen-jwt", // Issuer of the token
            'sub' => $user->pid, // Subject of the token
            'iat' => time(), // Time when JWT was issued.
            // Not sure if we want to add an expiration date...
            // 'exp' => time() + 60 * 60, // Expiration time
        ];

        // As you can see we are passing `JWT_SECRET` as the second parameter that will
        // be used to decode the token in the future.
        return JWT::encode($payload, env('JWT_SECRET'));
    }

    /**
     * Authenticate a user and return the token if the provided credentials are correct.
     *
     * @param  \App\User   $user
     * @return mixed
     */
    public function authenticate(User $user)
    {
        $this->validate($this->request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Find the user by email
        // $user = app('db')->select("SELECT * FROM coach_profiles WHERE email = :email", ['email' => $this->request->input('email')])[0];
        $user = User::where('email', $this->request->input('email'))->first();

        if (!$user) {
            // You wil probably have some sort of helpers or whatever
            // to make sure that you have the same response format for
            // differents kind of responses. But let's return the
            // below respose for now.
            return response()->json([
                'error' => 'Email does not exist.',
            ], 400);
        }

        // Verify the password and generate the token
        if (Hash::check($this->request->input('password'), $user->password)) {
            return response()->json([
                'token' => $this->jwt($user),
            ], 200);
        }

        // Bad Request response
        return response()->json([
            'error' => 'Email or password is wrong.',
        ], 400);
    }

    public function getCurrentUser()
    {
        $coach = $this->request->auth;
        $person = Person::find($this->request->auth->pid);

        $response = [
            'pid' => $person->pid,
            'fname' => $person->fname,
            'lname' => $person->lname,
            'email' => $coach->email,
            'super_coach' => $coach->super_coach,
        ];
        return response()->json($response);
    }

    public function updateCurrentUser()
    {

        $validatedData = $this->validate($this->request, [
            'fname' => 'required|max:100',
            'lname' => 'required|max:100',
            'email' => 'max:100|email|nullable',
        ]);

        $coach = $this->request->auth;

        $person = Person::find($coach->pid);

        $coach->email = $this->request->input('email');

        if ($this->request->input('newPassword') != null &&
            $this->request->input('newPassword') == $this->request->input('confirmNewPassword') &&
            Hash::check($this->request->input('currentPassword'), $coach->password)) {
            $coach->password = Hash::make($this->request->input('newPassword'));
        }

        $coach->save();

        $person->fname = $this->request->input('fname');
        $person->lname = $this->request->input('lname');

        $person->save();

        return response()->json($person->pid);

    }

    public function checkCode()
    {
        $validatedData = $this->validate($this->request, [
            'code' => 'required|max:6',
            'email' => 'max:255|email|required',
        ]);

        $check = SignupCode::where([
            ['email', trim($this->request->input('email'))],
            ['code', trim($this->request->input('code'))],
        ])->exists();

        return response()->json($check);
    }

    public function signup()
    {
        $validatedData = $this->validate($this->request, [
            'code' => 'required|max:6',
            'email' => 'max:255|email|required',
            'fname' => 'required|max:100',
            'lname' => 'required|max:100',
            'newPassword' => 'required',
            'confirmNewPassword' => 'required',
        ]);

        $existingUser = User::where('email', $this->request->input('email'))->first();

        if ($existingUser != null) {
            abort(400, "A coach already exists with that email.");
        }

        $check = SignupCode::where([
            ['email', trim($this->request->input('email'))],
            ['code', trim($this->request->input('code'))],
        ])->first();

        if ($check == null) {
            abort();
        }

        // if we get to here, we're good to make an account.

        $person = new Person();
        $person->fname = $this->request->input('fname');
        $person->lname = $this->request->input('lname');
        $person->save();

        $user = new User();
        $user->pid = $person->pid;
        $user->email = $this->request->input('email');
        $user->password = Hash::make($this->request->input('newPassword'));
        $user->company_id = $check->company_id;
        $user->super_coach = false;

        $user->save();

        SignupCode::where('email', $user->email)->delete();

        return response()->json([
            'token' => $this->jwt($user),
        ], 200);

    }
}
