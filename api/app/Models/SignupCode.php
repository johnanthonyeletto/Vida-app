<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SignupCode extends Model
{
    protected $table = 'signup_codes';
    protected $primaryKey = null;
    public $incrementing = false;
}
