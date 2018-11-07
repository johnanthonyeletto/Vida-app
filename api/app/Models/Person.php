<?php

namespace App\Models;

use Carbon\Carbon;
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
}
