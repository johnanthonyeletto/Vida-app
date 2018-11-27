<?php

namespace App;

use DB;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'coach_profiles';

    protected $primaryKey = 'pid';

    protected $fillable = [
        'name', 'email', 'username', 'super_coach', 'created_at', 'updated_at', 'password',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    public function clients()
    {
        return $this->belongsToMany('App\Models\Person', 'coach_clients', 'coach_id', 'client_id');
    }

    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'company_id', 'company_id');
    }

    public function Person()
    {
        return $this->hasOne('App\Models\Person', 'pid', 'pid');
    }

    public function ActiveClients()
    {
        return DB::select('SELECT people.* FROM people join coach_clients on people.pid = coach_clients.client_id where people."isActive" = true AND coach_clients.coach_id = :coach_id', ["coach_id" => $this->pid]);
    }

    public function InactiveClients()
    {
        return DB::select('SELECT people.* FROM people join coach_clients on people.pid = coach_clients.client_id where people."isActive" = false AND coach_clients.coach_id = :coach_id', ["coach_id" => $this->pid]);
    }

    public function Meetings()
    {
        // I want to get all meetings that the coach logged in has in the system

        $meetings = DB::table('events')->join('people', 'events.pid', '=', 'people.pid')->join('coach_clients', 'people.pid', '=', 'coach_clients.client_id')->where('coach_clients.coach_id', $this->pid)->select('events.*')->orderBy('event_datetime', 'asc')->get();
        // $meetings = app('db')->select("SELECT ev.* FROM events as ev, coach_clients as cc, people as pe where cc.client_id = pe.pid and pe.pid = ev.pid and cc.coach_id = :coach_id", ["coach_id" => $this->pid]);
        return $meetings;
    }

    public function Relationships()
    {
        $relationships = DB::select("SELECT person1.pid, person1.fname, person1.lname , person2.pid,
      person2.fname,person2.lname,relationships.relationshiptoclient
      from relationships join people person1 on relationships.pid1 = person1.pid
      join people person2 on relationships.pid2 = person2.pid
      WHERE relationships.client_id = 11");
        return $relationships;
    }

}
