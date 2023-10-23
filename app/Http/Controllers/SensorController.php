<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use Inertia\Controller;
use App\Events\SensorEvent;
use App\Models\Calibrate;
use Illuminate\Http\Request;

class SensorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = [
            "sensor" => Sensor::latest('id')->first(),
        ];

        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $data = [
            'value1' => $request->value1,
            'value2' => $request->value2,
            'value3' => $request->value3,
            'value4' => $request->value4,
            'value5' => $request->value5
        ];

        $socket = [
            'value1' => $request->value1,
            'value2' => $request->value2,
            'value3' => $request->value3,
            'value4' => $request->value4,
            'value5' => $request->value5,
            'aPH' => $request->aPH,
            'aTDS' => $request->aTDS,
            'aSUHU' => $request->aSUHU,
            'aSAL' => $request->aSAL,
            'aAMO' => $request->aAMO,
        ];

        SensorEvent::dispatch($socket);
        // event(new SensorEvent($data));

        if ($request->upload == true) {
            Sensor::create($data);
        }
        // simpan data ke database jika diperlukan
        return response()->json(['message' => 'Data berhasil diterima', $data]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sensor  $sensor
     * @return \Illuminate\Http\Response
     */
    public function show(Sensor $sensor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Sensor  $sensor
     * @return \Illuminate\Http\Response
     */
    public function edit(Sensor $sensor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sensor  $sensor
     * @return \Illuminate\Http\Response
     */
    public function editCalibrate(Request $request)
    {
        // dd($request);
        $data = [
            // "name" => $request->calibrate,
            "a" => $request->a,
            "b" => $request->b,
        ];

        // dd($data);
        Calibrate::where('name', $request->calibrate)
            ->update($data);
        return back()->with('message', 'Calibration Success');
    }


    public function getCalibrate()
    {
        $data = Calibrate::all();
        return response()->json($data);
    }
}