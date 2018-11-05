<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $table = 'people';
    protected $primaryKey = 'pid';

    public function getNextMeeting()
    {
        return app('db')->select("select * from events where events.pid = :pid", ["pid" => $this->pid])->get();
    }
}
