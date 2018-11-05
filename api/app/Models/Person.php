<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $table = 'people';
    protected $primaryKey = 'pid';

    public function nextMeeting()
    {
        return $this->hasMany('App\Models\Event', 'pid', 'pid')->latest();
    }

    public function relationships()
    {
        // FIX THIS PLEASE TO INCLUDE PID1 AND PID2
        return $this->belongsToMany('App\Models\Person', 'relationships', 'client_id', 'pid1')->withPivot('relationshiptoclient');
    }
}
