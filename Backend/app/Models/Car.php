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
        'status'
    ];

    protected $with = ['owner', 'mechanic', 'service'];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function mechanic()
    {
        return $this->belongsTo(User::class, 'mechanic_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

}
