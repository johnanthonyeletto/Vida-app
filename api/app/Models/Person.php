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

    public function relationships()
    {
        // FIX THIS PLEASE TO INCLUDE BOTH PID1 AND PID2
        return $this->belongsToMany('App\Models\Person', 'relationships', 'client_id', 'pid1')->withPivot('relationshiptoclient');
    }
}
