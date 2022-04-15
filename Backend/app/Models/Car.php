<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'model',
        'license_plate',
        'owner_id',
        'mechanic_id',
        'service_id',
        'service_date',
        'status'
    ];

}
