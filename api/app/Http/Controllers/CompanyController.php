<?php

namespace App\Http\Controllers;

use App\Mail\SignupCodeEmail;
use App\Models\SignupCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CompanyController extends Controller
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

    public function getCompany()
    {
        $company = $this->request->auth->company()->first();

        return response()->json($company);
    }

    public function saveCompany()
    {
        $validatedData = $this->validate($this->request, [
            'name' => 'required|max:100',
        ]);

        $company = $this->request->auth->company()->first();

        $company->name = $this->request->input('name');

        $company->save();

        return response()->json($company);
    }

    public function getEmployees()
    {
        $activeEmployees = $this->request->auth->company()->first()->employees()->with("Person")->get()->where('person.isActive', true)->sortBy('person.fname')->values()->all();
        $inactiveEmployees = $this->request->auth->company()->first()->employees()->with("Person")->get()->where('person.isActive', false)->sortBy('person.fname')->values()->all();
        $pendingEmployees = SignupCode::where('company_id', $this->request->auth->company_id)->orderBy('created_at', 'desc')->get();

        $activeEmployees = collect($activeEmployees);

        $activeEmployees->where('pid', $this->request->auth->pid)->first()->me = true;

        $employees = [
            'active' => $activeEmployees,
            'inactive' => $inactiveEmployees,
            'pending' => $pendingEmployees,
        ];

        return response()->json($employees);
    }

    public function getEmployee($pid)
    {
        $employee = $this->request->auth->company()->first()->employees()->where('pid', $pid)->with("Person")->first();
        $active = $employee->ActiveClients();
        $inactive = $employee->InactiveClients();

        $employee->clients = [
            'active' => $active,
            'inactive' => $inactive,
        ];

        return response()->json($employee);
    }

    public function addEmployee()
    {
        $validatedData = $this->validate($this->request, [
            'email' => 'required|max:255|email',
        ]);

        $existingCoachCheck = User::where('email', $this->request->input('email'))->first();

        if ($existingCoachCheck != null) {
            return (new Response("Coach already exists.", 400));

        }

        $pendingCheck = SignupCode::where('email', $this->request->input('email'))->first();

        $code;
        if ($pendingCheck != null) {
            $code = $pendingCheck->code;
        } else {

            $code = strtoupper(str_random(6));

            while (SignupCode::where('code', $code)->exists()) {
                $code = strtoupper(str_random(6));
            }

            $signupCode = new SignupCode();

            $signupCode->email = $this->request->input('email');
            $signupCode->code = $code;
            $signupCode->company_id = $this->request->auth->company_id;

            $signupCode->save();

        }

        Mail::to($this->request->input('email'))->send(new SignupCodeEmail($code, $this->request->auth->company()->first()));

        return response()->json();
    }

    public function setSuperCoach()
    {
        $pid = $this->request->input('pid');

        $employee = $this->request->auth->company()->first()->employees()->where('pid', $pid)->first();

        $employee->super_coach = $this->request->input('super_coach');

        $employee->save();

        return response()->json();
    }

    public function setActive()
    {
        $pid = $this->request->input('pid');

        $employee = $this->request->auth->company()->first()->employees()->where('pid', $pid)->first()->person()->first();

        $employee->isActive = $this->request->input('isActive');

        $employee->save();

        return response()->json();
    }
}
