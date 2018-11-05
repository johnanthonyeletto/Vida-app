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
}
