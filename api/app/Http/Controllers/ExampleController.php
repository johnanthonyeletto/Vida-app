<?php

namespace App\Http\Controllers;

class ExampleController extends Controller
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
    public function phpInfo()
    {
        return response()->json(phpinfo());
    }
}
