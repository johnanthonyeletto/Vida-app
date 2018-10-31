<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
 */

/*
GET - get information
POST - add a record
DELETE - delete a record (also soft delete)
PUT - update

 */

$router->get('/', function () use ($router) {
    return 'Welcome To The Vida API!';
});

// Example route returns phpinfo fur current system.
$router->get('/phpinfo', 'ExampleController@phpInfo');

$router->get('/DBTEST', function () use ($router) {
    $results = app('db')->select("SELECT * FROM coach_profiles");
    return response()->json($results);
});

/*
PUT ALL ROUTES IN HERE -
THIS WILL AUTOMATICALLY ADD THE /1.0/ PREFIX TO ALL ROUTES IN HERE
 */
$router->group(['prefix' => '1.0'], function () use ($router) {

    $router->post('auth/login', 'AuthController@authenticate');

    /*
    All routes within this group will require authentication.
    Most routes should be in here. With the exception of
    login and signup routes
     */
    $router->group(['middleware' => 'jwt.auth'], function () use ($router) {

        $router->get('current-user', 'AuthController@currentUser');

        $router->get('client-list', 'ClientController@getClientList');

        $router->get('client/{pid}', 'ClientController@getClient');

    });
});
