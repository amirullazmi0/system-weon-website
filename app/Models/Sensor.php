<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Expr\FuncCall;

class Sensor extends Model
{
    use HasFactory;
    protected $fillable = [
        'value1',
        'value2',
        'value3',
        'value4',
        'value5',
    ];

    public function aveWeeklyValue1($jumlahData)
    {
        $value = [
            Sensor::whereDay('created_at', '<=', '7')->sum('value1')  / $jumlahData,
            Sensor::whereDay('created_at', '>', '7')->whereDay('created_at', '<=', '14')->sum('value1')  / $jumlahData,
            Sensor::whereDay('created_at', '>', '14')->whereDay('created_at', '<=', '21')->sum('value1') / $jumlahData,
            Sensor::whereDay('created_at', '>', '21')->whereDay('created_at', '<=', '31')->sum('value1') / $jumlahData,
        ];

        return $value;
    }
}
