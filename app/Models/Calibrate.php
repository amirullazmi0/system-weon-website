<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calibrate extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'a',
        'b',
    ];
}
