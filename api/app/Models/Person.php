<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

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
      $relationships = DB::select("SELECT person1.pid, person1.fname, person1.lname , person2.pid,
      person2.fname,person2.lname,relationships.relationshiptoclient
      from relationships join people person1 on relationships.pid1 = person1.pid
      join people person2 on relationships.pid2 = person2.pid
      WHERE relationships.client_id = 11");
      return $relationships;
    }

}

//client id =! to pid
