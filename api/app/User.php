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
        'name', 'email', 'username', 'super_coach', 'createdat', 'updatedat',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'passwrd',
    ];

    public function Clients()
    {
        return DB::select("SELECT people.* FROM people join coach_clients on people.pid = coach_clients.client_id where coach_clients.coach_id = :coach_id", ["coach_id" => $this->pid]);
    }

    public function ActiveClients()
    {
        return DB::select('SELECT people.* FROM people join coach_clients on people.pid = coach_clients.client_id where people."isActive" = true AND coach_clients.coach_id = :coach_id', ["coach_id" => $this->pid]);
    }

    public function InactiveClients()
    {
        return DB::select('SELECT people.* FROM people join coach_clients on people.pid = coach_clients.client_id where people."isActive" = false AND coach_clients.coach_id = :coach_id', ["coach_id" => $this->pid]);
    }
}
