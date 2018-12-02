<?php

namespace App\Models;

use Carbon\Carbon;
use DB;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $table = 'people';
    protected $primaryKey = 'pid';

    public function nextMeeting()
    {
        return $this->hasMany('App\Models\Event', 'pid', 'pid')->where('event_datetime', '>', Carbon::now())->oldest();
    }

    public function relationshipsPID1()
    {
        return $this->belongsToMany('App\Models\Person', 'relationships', 'client_id', 'pid1')->withPivot('relationshiptoclient');
    }

    public function relationshipsPID2()
    {
        return $this->belongsToMany('App\Models\Person', 'relationships', 'client_id', 'pid2')->withPivot('relationshiptoclient');
    }

    public function Relationships()
    {
        $relationships = DB::select('SELECT person1.pid as pid1, person1.fname, person1.lname , person2.pid as pid2,
      person2.fname,person2.lname,relationships.relationshiptoclient, relationships.client_id, client.pid as clientpid, client.fname as clientfname, client.lname as clientlname
      from relationships
      join people person1 on relationships.pid1 = person1.pid
      join people person2 on relationships.pid2 = person2.pid
      join people client on relationships.client_id = client.pid
      WHERE relationships.client_id = :client_id', ["client_id" => $this->pid]);
        return $relationships;
    }

    public function coach()
    {
        return $this->belongsToMany('App\User', 'coach_clients', 'client_id', 'coach_id')->latest();
    }

    public function notes()
    {
        return $this->hasMany("App\Models\Note", 'client_id', 'pid')->orderBy('updated_at', 'desc');
    }

}

//client id =! to pid
