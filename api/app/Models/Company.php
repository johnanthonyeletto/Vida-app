<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Company extends Model
{
    protected $table = 'companies';
    protected $primaryKey = 'company_id';

}