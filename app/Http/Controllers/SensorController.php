<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Sensor;
use Inertia\Controller;
use App\Models\Calibrate;
use App\Events\SensorEvent;
use Illuminate\Http\Request;

use Kreait\Laravel\Firebase\Facades\Firebase;
use Kreait\Firebase\Messaging\CloudMessage;


class SensorController extends Controller
{
    protected $notification;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
        $this->notification = Firebase::messaging();
    }
    public function notification(Request $request)
    {
        $FcmToken = "cMed80h7QDukBeAuZxv2sK:APA91bEU_utVGAqP1lBqmmqTIoWXWjM3GZhJQInY3iU2iXwHEJoNsBkHhnSHkMpykktZkPfh_DqBPu0HJVAWfezEMhr5S4CfoXZCtXRcYfGjurhOD5FlvykT5yx8Cr1Tnrxq8ltqdRnm";
        $title = $request->input('title');
        $body = $request->input('body');
        $message = CloudMessage::fromArray([
            'token' => $FcmToken,
            'notification' => [
                'title' => '$title',
                'body' => '$body'
            ],
        ]);

        $this->notification->send($message);
    }
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

        $phMin = 7.5;
        $phMax = 8.5;
        $tdsMin = 0;
        $tdsMax = 800;
        $suhuMin = 26;
        $suhuMax = 28;
        $salMin = 2;
        $salMax = 12;
        $amoMin = 0;
        $amoMax = 1;
        $FcmToken = "cMed80h7QDukBeAuZxv2sK:APA91bEU_utVGAqP1lBqmmqTIoWXWjM3GZhJQInY3iU2iXwHEJoNsBkHhnSHkMpykktZkPfh_DqBPu0HJVAWfezEMhr5S4CfoXZCtXRcYfGjurhOD5FlvykT5yx8Cr1Tnrxq8ltqdRnm";
        $FcmToken2 = "fKsl6_zPTiek8SZki82K2b:APA91bH594uurpOeHWL_k-savFXHcf93qEl87KVZCrhaabAZZVI_cXSI3LJJp7iEFs6xiPl6AtStR42MShmAg-uIyA8B-3b_hbsVp-7VFzMAl9MQGt6Gq-ccsSqT3ywXW4TJtPxyZ9Kp";


        SensorEvent::dispatch($socket);
        // event(new SensorEvent($data));

        if ($request->upload == true) {
            if (($request->value1 < $phMin || $request->value1 > $phMax)) {
                $message = CloudMessage::fromArray([
                    'token' => $FcmToken,
                    'notification' => [
                        'title' => 'Periksa Kondisi Air',
                        'body' => 'pH tidak stabil'
                    ],
                ]);
                $message = CloudMessage::fromArray([
                    'token' => $FcmToken2,
                    'notification' => [
                        'title' => 'Periksa Kondisi Air',
                        'body' => 'pH tidak stabil'
                    ],
                ]);
            }
            if (($request->value2 < $tdsMin || $request->value2 > $tdsMax)) {
                $message = CloudMessage::fromArray([
                    'token' => $FcmToken,
                    'notification' => [
                        'title' => 'Periksa Kondisi Air',
                        'body' => 'TDS tidak Stabil'
                    ],
                ]);
                $message = CloudMessage::fromArray([
                    'token' => $FcmToken2,
                    'notification' => [
                        'title' => 'Periksa Kondisi Air',
                        'body' => 'TDS tidak Stabil'
                    ],
                ]);
            }
            if (($request->value3 < $suhuMin || $request->value3 > $suhuMax)) {
                $message = CloudMessage::fromArray([
                    'token' => $FcmToken,
                    'notification' => [
                        'title' => 'Periksa Kondisi Air',
                        'body' => 'Suhu tidak Stabil'
                    ],
                ]);
                $message = CloudMessage::fromArray([
                    'token' => $FcmToken2,
                    'notification' => [
                        'title' => 'Periksa Kondisi Air',
                        'body' => 'Suhu tidak Stabil'
                    ],
                ]);
            }
            if (($request->value4 < $salMin || $request->value4 > $salMax)) {
                $message = CloudMessage::fromArray([
                    'token' => $FcmToken,
                    'notification' => [
                        'title' => 'Periksa Kondisi Air',
                        'body' => 'Kadar Salinitas tidak Stabil'
                    ],
                ]);
                $message = CloudMessage::fromArray([
                    'token' => $FcmToken2,
                    'notification' => [
                        'title' => 'Periksa Kondisi Air',
                        'body' => 'Kadar Salinitas tidak Stabil'
                    ],
                ]);
            }
            if (($request->value5 < $amoMin || $request->value5 > $amoMax)) {
                $message = CloudMessage::fromArray([
                    'token' => $FcmToken,
                    'notification' => [
                        'title' => 'Periksa Kondisi Air',
                        'body' => 'Kadar Amonia tidak Stabil'
                    ],
                ]);
                $message = CloudMessage::fromArray([
                    'token' => $FcmToken2,
                    'notification' => [
                        'title' => 'Periksa Kondisi Air',
                        'body' => 'Kadar Amonia tidak Stabil'
                    ],
                ]);
            }
            Sensor::create($data);
        }


        $this->notification->send($message);
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

    public function notif(Request $request)
    {
        return response()->json([
            'status' => true,
            'notif' => 'ini notif'
        ]);
    }
}
