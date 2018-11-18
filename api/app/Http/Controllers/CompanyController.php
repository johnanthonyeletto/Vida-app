<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
        $activeEmployees = $this->request->auth->company()->first()->employees()->with("Person")->get()->where('person.isActive', true);
        $inactiveEmployees = $this->request->auth->company()->first()->employees()->with("Person")->get()->where('person.isActive', false);

        $employees = [
            'active' => $activeEmployees,
            'inactive' => $inactiveEmployees,
        ];

        return response()->json($employees);
    }
}
