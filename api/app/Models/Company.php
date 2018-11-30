<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'companies';
    protected $primaryKey = 'company_id';

    public function employees()
    {
        return $this->hasMany('App\User', 'company_id', 'company_id');
    }
}
