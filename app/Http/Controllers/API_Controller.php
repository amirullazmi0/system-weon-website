<?php

namespace App\Http\Controllers;

use DateTime;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Sensor;
use App\Models\Calibrate;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class API_Controller extends Controller
{
    //
    public function auth()
    {
        $data = [
            'success' => true,
            'data' => Auth()->user()
        ];
        return response()->json($data);
    }

    public function latestSensor()
    {
        $data = [
            'success' => true,
            'data' => Sensor::latest()->first()
        ];
        return response()->json($data);
    }

    public function sensor()
    {
        $data = [
            'success' => true,
            'data' => [
                'jumlah' => Sensor::all()->count(),
                'sensor' => Sensor::orderBy('id', 'desc')->get(),
            ]
        ];
        return response()->json($data);
    }

    public function ratarata()
    {
        $sensor = Sensor::all();

        $bulanan = [];

        for ($bulan = 1; $bulan <= 12; $bulan++) {
            $totalDataBulan = 0;
            $rataValue1 = 0;
            $rataValue2 = 0;
            $rataValue3 = 0;
            $rataValue4 = 0;
            $rataValue5 = 0;

            foreach ($sensor as $dataSensor) {
                if ($dataSensor->created_at->month === $bulan) {
                    $totalDataBulan++;
                    $rataValue1 += $dataSensor->value1;
                    $rataValue2 += $dataSensor->value2;
                    $rataValue3 += $dataSensor->value3;
                    $rataValue4 += $dataSensor->value4;
                    $rataValue5 += $dataSensor->value5;
                }
            }

            $namaBulan = DateTime::createFromFormat('!m', $bulan)->format('F');

            if ($totalDataBulan > 0) {
                $bulanan[] = [
                    'id' => $bulan,
                    'bulan' =>  $namaBulan,
                    'total' => $totalDataBulan,
                    'value1' => number_format($rataValue1 / $totalDataBulan, 2),
                    'value2' => number_format($rataValue2 / $totalDataBulan, 2),
                    'value3' => number_format($rataValue3 / $totalDataBulan, 2),
                    'value4' => number_format($rataValue4 / $totalDataBulan, 2),
                    'value5' => number_format($rataValue5 / $totalDataBulan, 2),
                ];
            } else {
                $bulanan[] = [
                    'id' => $bulan,
                    'bulan' =>  $namaBulan,
                    'total' => null,
                    'value1' => null,
                    'value2' => null,
                    'value3' => null,
                    'value4' => null,
                    'value5' => null,
                ];
            }
        }

        $mingguan = [];

        for ($minggu = 1; $minggu <= 4; $minggu++) {
            $totalDataMinggu = 0;
            $rataValue1 = 0;
            $rataValue2 = 0;
            $rataValue3 = 0;
            $rataValue4 = 0;
            $rataValue5 = 0;

            foreach ($sensor as $dataSensor) {
                $mingguDalamBulan = $dataSensor->created_at->weekOfMonth;
                // $bulanData = $dataSensor->created_at->month;
                // $bulanSekarang = Carbon::now()->month;
                // if ($bulanData === $bulanSekarang) {
                if ($mingguDalamBulan === $minggu) {
                    $totalDataMinggu++;
                    $rataValue1 += $dataSensor->value1;
                    $rataValue2 += $dataSensor->value2;
                    $rataValue3 += $dataSensor->value3;
                    $rataValue4 += $dataSensor->value4;
                    $rataValue5 += $dataSensor->value5;
                }
                // }
            }

            if ($totalDataMinggu > 0) {
                $mingguan[] = [
                    'id' => $minggu,
                    'minggu' => "Week " . $minggu,
                    'total' => $totalDataMinggu,
                    'value1' => number_format($rataValue1 / $totalDataMinggu, 2),
                    'value2' => number_format($rataValue2 / $totalDataMinggu, 2),
                    'value3' => number_format($rataValue3 / $totalDataMinggu, 2),
                    'value4' => number_format($rataValue4 / $totalDataMinggu, 2),
                    'value5' => number_format($rataValue5 / $totalDataMinggu, 2),
                ];
            } else {
                $mingguan[] = [
                    'id' => $minggu,
                    'minggu' => "Week " . $minggu,
                    'total' => null,
                    'value1' => null,
                    'value2' => null,
                    'value3' => null,
                    'value4' => null,
                    'value5' => null,
                ];
            }
        }

        $harian = [];

        for ($hari = 1; $hari <= 7; $hari++) {
            $totalDataHari = 0;
            $rataValue1 = 0;
            $rataValue2 = 0;
            $rataValue3 = 0;
            $rataValue4 = 0;
            $rataValue5 = 0;

            foreach ($sensor as $dataSensor) {
                $tanggalData = $dataSensor->created_at;

                $tanggalAwalHari = $tanggalData->copy()->startOfWeek()->addDays($hari - 1)->startOfDay();
                $tanggalAkhirHari = $tanggalData->copy()->startOfWeek()->addDays($hari - 1)->endOfDay();

                if ($tanggalData->isBetween($tanggalAwalHari, $tanggalAkhirHari)) {
                    $totalDataHari++;
                    $rataValue1 += floatval($dataSensor->value1);
                    $rataValue2 += floatval($dataSensor->value2);
                    $rataValue3 += floatval($dataSensor->value3);
                    $rataValue4 += floatval($dataSensor->value4);
                    $rataValue5 += floatval($dataSensor->value5);
                }
            }

            if ($totalDataHari > 0) {
                $harian = [];

                for ($hari = 1; $hari <= 7; $hari++) {
                    $totalDataHari = 0;
                    $rataValue1 = 0;
                    $rataValue2 = 0;
                    $rataValue3 = 0;
                    $rataValue4 = 0;
                    $rataValue5 = 0;

                    foreach ($sensor as $dataSensor) {
                        $tanggalData = $dataSensor->created_at;

                        $tanggalAwalHari = $tanggalData->copy()->startOfWeek()->addDays($hari - 1)->startOfDay();
                        $tanggalAkhirHari = $tanggalData->copy()->startOfWeek()->addDays($hari - 1)->endOfDay();

                        if ($tanggalData->isBetween($tanggalAwalHari, $tanggalAkhirHari)) {
                            $totalDataHari++;
                            $rataValue1 += floatval($dataSensor->value1);
                            $rataValue2 += floatval($dataSensor->value2);
                            $rataValue3 += floatval($dataSensor->value3);
                            $rataValue4 += floatval($dataSensor->value4);
                            $rataValue5 += floatval($dataSensor->value5);
                        }
                    }


                    $namaHari = \Carbon\Carbon::parse("Sunday")->addDays($hari - 1)->locale('en_US')->dayName;
                    $harian[] = [
                        'id' => $hari,
                        'hari' => $namaHari,
                        'total' => $totalDataHari,
                        'value1' => number_format($rataValue1 / $totalDataHari, 2),
                        'value2' => number_format($rataValue2 / $totalDataHari, 2),
                        'value3' => number_format($rataValue3 / $totalDataHari, 2),
                        'value4' => number_format($rataValue4 / $totalDataHari, 2),
                        'value5' => number_format($rataValue5 / $totalDataHari, 2),
                    ];
                }
            } else {
                $namaHari = \Carbon\Carbon::parse("Sunday")->addDays($hari - 1)->locale('en_US')->dayName;
                $harian[] = [
                    'id' => $hari,
                    'hari' => $namaHari,
                    'total' => null,
                    'value1' => null,
                    'value2' => null,
                    'value3' => null,
                    'value4' => null,
                    'value5' => null,
                ];
            }
        }

        $perjam = [];

        for ($jam = 0; $jam <= 23; $jam++) {
            $totalDataJam = 0;
            $rataValue1 = 0;
            $rataValue2 = 0;
            $rataValue3 = 0;
            $rataValue4 = 0;
            $rataValue5 = 0;

            foreach ($sensor as $dataSensor) {
                $tanggalData = $dataSensor->created_at;

                $tanggalAwalJam = $tanggalData->copy()->startOfDay()->addHours($jam);
                $tanggalAkhirJam = $tanggalData->copy()->startOfDay()->addHours($jam)->addHour();

                if ($tanggalData->isBetween($tanggalAwalJam, $tanggalAkhirJam)) {
                    $totalDataJam++;
                    $rataValue1 += floatval($dataSensor->value1);
                    $rataValue2 += floatval($dataSensor->value2);
                    $rataValue3 += floatval($dataSensor->value3);
                    $rataValue4 += floatval($dataSensor->value4);
                    $rataValue5 += floatval($dataSensor->value5);
                }
            }

            $formattedJam = str_pad($jam, 2, '0', STR_PAD_LEFT);
            $formattedJam = $formattedJam . ':00';

            if ($totalDataJam > 0) {
                $perjam[] = [
                    'id' => $jam + 1,
                    'jam' => $formattedJam,
                    'total' => $totalDataJam,
                    'value1' => number_format($rataValue1 / $totalDataJam, 2),
                    'value2' => number_format($rataValue2 / $totalDataJam, 2),
                    'value3' => number_format($rataValue3 / $totalDataJam, 2),
                    'value4' => number_format($rataValue4 / $totalDataJam, 2),
                    'value5' => number_format($rataValue5 / $totalDataJam, 2),
                ];
            } else {
                $perjam[] = [
                    'id' => $jam + 1,
                    'jam' => $formattedJam,
                    'total' => null,
                    'value1' => null,
                    'value2' => null,
                    'value3' => null,
                    'value4' => null,
                    'value5' => null,
                ];
            }
        }
        $ratarata = [
            'bulanan' => $bulanan,
            'mingguan' =>  $mingguan,
            'harian' => $harian,
            'perjam' => $perjam,

        ];
        $data = [
            'success' => true,
            'data' => $ratarata
        ];
        return response()->json($data);
    }


    public function register(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'confirm_password' => 'required|same:password'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'ada kesalahan',
                'data' => $validate->errors()
            ]);
        }

        $input = $request->all();
        $input['password'] = bcrypt($request->password);
        $user = User::create($input);

        $success['token'] = $user->createToken('auth_token')->plainTextToken;
        $success['name'] = $user->name;
        return response()->json([
            'success' => false,
            'message' => 'success',
            'data' => $success
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credentials)) {
            // $auth = Auth::user();
            $success['token'] = Auth()->user()->createToken('auth_token')->plainTextToken;
            $success['name'] = Auth()->user()->name;
            $success['email'] = Auth()->user()->email;
            return response()->json([
                "success" => true,
                "message" => "login success",
                "data" => $success
            ]);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Check Email and Password",
                "data" => null
            ]);
        }
    }

    public function allData()
    {
        $sensor = Sensor::all();

        $bulanan = [];

        for ($bulan = 1; $bulan <= 12; $bulan++) {
            $totalDataBulan = 0;
            $rataValue1 = 0;
            $rataValue2 = 0;
            $rataValue3 = 0;
            $rataValue4 = 0;
            $rataValue5 = 0;

            foreach ($sensor as $dataSensor) {
                if ($dataSensor->created_at->month === $bulan) {
                    $totalDataBulan++;
                    $rataValue1 += $dataSensor->value1;
                    $rataValue2 += $dataSensor->value2;
                    $rataValue3 += $dataSensor->value3;
                    $rataValue4 += $dataSensor->value4;
                    $rataValue5 += $dataSensor->value5;
                }
            }

            $namaBulan = DateTime::createFromFormat('!m', $bulan)->format('F');

            if ($totalDataBulan > 0) {
                $bulanan[] = [
                    'id' => $bulan,
                    'bulan' =>  $namaBulan,
                    'total' => $totalDataBulan,
                    'value1' => number_format($rataValue1 / $totalDataBulan, 2),
                    'value2' => number_format($rataValue2 / $totalDataBulan, 2),
                    'value3' => number_format($rataValue3 / $totalDataBulan, 2),
                    'value4' => number_format($rataValue4 / $totalDataBulan, 2),
                    'value5' => number_format($rataValue5 / $totalDataBulan, 2),
                ];
            } else {
                $bulanan[] = [
                    'id' => $bulan,
                    'bulan' =>  $namaBulan,
                    'total' => null,
                    'value1' => null,
                    'value2' => null,
                    'value3' => null,
                    'value4' => null,
                    'value5' => null,
                ];
            }
        }

        $mingguan = [];

        for ($minggu = 1; $minggu <= 4; $minggu++) {
            $totalDataMinggu = 0;
            $rataValue1 = 0;
            $rataValue2 = 0;
            $rataValue3 = 0;
            $rataValue4 = 0;
            $rataValue5 = 0;

            foreach ($sensor as $dataSensor) {
                $mingguDalamBulan = $dataSensor->created_at->weekOfMonth;
                // $bulanData = $dataSensor->created_at->month;
                // $bulanSekarang = Carbon::now()->month;
                // if ($bulanData === $bulanSekarang) {
                if ($mingguDalamBulan === $minggu) {
                    $totalDataMinggu++;
                    $rataValue1 += $dataSensor->value1;
                    $rataValue2 += $dataSensor->value2;
                    $rataValue3 += $dataSensor->value3;
                    $rataValue4 += $dataSensor->value4;
                    $rataValue5 += $dataSensor->value5;
                }
                // }
            }

            if ($totalDataMinggu > 0) {
                $mingguan[] = [
                    'id' => $minggu,
                    'minggu' => "Week " . $minggu,
                    'total' => $totalDataMinggu,
                    'value1' => number_format($rataValue1 / $totalDataMinggu, 2),
                    'value2' => number_format($rataValue2 / $totalDataMinggu, 2),
                    'value3' => number_format($rataValue3 / $totalDataMinggu, 2),
                    'value4' => number_format($rataValue4 / $totalDataMinggu, 2),
                    'value5' => number_format($rataValue5 / $totalDataMinggu, 2),
                ];
            } else {
                $mingguan[] = [
                    'id' => $minggu,
                    'minggu' => "Week " . $minggu,
                    'total' => null,
                    'value1' => null,
                    'value2' => null,
                    'value3' => null,
                    'value4' => null,
                    'value5' => null,
                ];
            }
        }

        $harian = [];

        for ($hari = 1; $hari <= 7; $hari++) {
            $totalDataHari = 0;
            $rataValue1 = 0;
            $rataValue2 = 0;
            $rataValue3 = 0;
            $rataValue4 = 0;
            $rataValue5 = 0;

            foreach ($sensor as $dataSensor) {
                $tanggalData = $dataSensor->created_at;

                $tanggalAwalHari = $tanggalData->copy()->startOfWeek()->addDays($hari - 1)->startOfDay();
                $tanggalAkhirHari = $tanggalData->copy()->startOfWeek()->addDays($hari - 1)->endOfDay();

                if ($tanggalData->isBetween($tanggalAwalHari, $tanggalAkhirHari)) {
                    $totalDataHari++;
                    $rataValue1 += floatval($dataSensor->value1);
                    $rataValue2 += floatval($dataSensor->value2);
                    $rataValue3 += floatval($dataSensor->value3);
                    $rataValue4 += floatval($dataSensor->value4);
                    $rataValue5 += floatval($dataSensor->value5);
                }
            }

            if ($totalDataHari > 0) {
                $harian = [];

                for ($hari = 1; $hari <= 7; $hari++) {
                    $totalDataHari = 0;
                    $rataValue1 = 0;
                    $rataValue2 = 0;
                    $rataValue3 = 0;
                    $rataValue4 = 0;
                    $rataValue5 = 0;

                    foreach ($sensor as $dataSensor) {
                        $tanggalData = $dataSensor->created_at;

                        $tanggalAwalHari = $tanggalData->copy()->startOfWeek()->addDays($hari - 1)->startOfDay();
                        $tanggalAkhirHari = $tanggalData->copy()->startOfWeek()->addDays($hari - 1)->endOfDay();

                        if ($tanggalData->isBetween($tanggalAwalHari, $tanggalAkhirHari)) {
                            $totalDataHari++;
                            $rataValue1 += floatval($dataSensor->value1);
                            $rataValue2 += floatval($dataSensor->value2);
                            $rataValue3 += floatval($dataSensor->value3);
                            $rataValue4 += floatval($dataSensor->value4);
                            $rataValue5 += floatval($dataSensor->value5);
                        }
                    }


                    $namaHari = \Carbon\Carbon::parse("Sunday")->addDays($hari - 1)->locale('en_US')->dayName;
                    $harian[] = [
                        'id' => $hari,
                        'hari' => $namaHari,
                        'total' => $totalDataHari,
                        'value1' => number_format($rataValue1 / $totalDataHari, 2),
                        'value2' => number_format($rataValue2 / $totalDataHari, 2),
                        'value3' => number_format($rataValue3 / $totalDataHari, 2),
                        'value4' => number_format($rataValue4 / $totalDataHari, 2),
                        'value5' => number_format($rataValue5 / $totalDataHari, 2),
                    ];
                }
            } else {
                $namaHari = \Carbon\Carbon::parse("Sunday")->addDays($hari - 1)->locale('en_US')->dayName;
                $harian[] = [
                    'id' => $hari,
                    'hari' => $namaHari,
                    'total' => null,
                    'value1' => null,
                    'value2' => null,
                    'value3' => null,
                    'value4' => null,
                    'value5' => null,
                ];
            }
        }

        $perjam = [];

        for ($jam = 0; $jam <= 23; $jam++) {
            $totalDataJam = 0;
            $rataValue1 = 0;
            $rataValue2 = 0;
            $rataValue3 = 0;
            $rataValue4 = 0;
            $rataValue5 = 0;

            foreach ($sensor as $dataSensor) {
                $tanggalData = $dataSensor->created_at;

                $tanggalAwalJam = $tanggalData->copy()->startOfDay()->addHours($jam);
                $tanggalAkhirJam = $tanggalData->copy()->startOfDay()->addHours($jam)->addHour();

                if ($tanggalData->isBetween($tanggalAwalJam, $tanggalAkhirJam)) {
                    $totalDataJam++;
                    $rataValue1 += floatval($dataSensor->value1);
                    $rataValue2 += floatval($dataSensor->value2);
                    $rataValue3 += floatval($dataSensor->value3);
                    $rataValue4 += floatval($dataSensor->value4);
                    $rataValue5 += floatval($dataSensor->value5);
                }
            }

            $formattedJam = str_pad($jam, 2, '0', STR_PAD_LEFT);
            $formattedJam = $formattedJam . ':00';

            if ($totalDataJam > 0) {
                $perjam[] = [
                    'id' => $jam + 1,
                    'jam' => $formattedJam,
                    'total' => $totalDataJam,
                    'value1' => number_format($rataValue1 / $totalDataJam, 2),
                    'value2' => number_format($rataValue2 / $totalDataJam, 2),
                    'value3' => number_format($rataValue3 / $totalDataJam, 2),
                    'value4' => number_format($rataValue4 / $totalDataJam, 2),
                    'value5' => number_format($rataValue5 / $totalDataJam, 2),
                ];
            } else {
                $perjam[] = [
                    'id' => $jam + 1,
                    'jam' => $formattedJam,
                    'total' => null,
                    'value1' => null,
                    'value2' => null,
                    'value3' => null,
                    'value4' => null,
                    'value5' => null,
                ];
            }
        }

        $data = [
            'sensor' => Sensor::orderBy('id', 'desc')->get(),
            "latestSensor" => Sensor::latest('id')->first(),
            'calibrate' => Calibrate::all(),
            'user' => Auth()->user(),
            'bulanan' => $bulanan,
            'mingguan' =>  $mingguan,
            'harian' => $harian,
            'perjam' => $perjam,
        ];

        return response()->json([
            'success' => true,
            'authUser' => Auth()->user(),
            'message' => 'auth sanctum success',
            'data' => $data
        ]);
    }

    public function updateUser(Request $request)
    {
        $rules = ([
            'name' => 'required',
        ]);

        if ($request->email != auth()->user()->email) {
            # code...
            $rules['email'] = 'required|email:dns|unique:users';
        }

        try {
            $validateData = $request->validate($rules);

            User::where('id', auth()->user()->id)
                ->update($validateData);

            return response()->json([
                'success' => true,
                'message' => 'Update profil success',
                'user' => Auth()->user()
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Update profil errors',
                'errors' => $e->errors(),
            ]);
        }
    }

    public function updatePasswordUser(Request $request)
    {

        try {
            $validateData = $request->validate([
                'password' => 'required',
                'password2' => 'required'
            ]);

            if ($request->password != $request->password2) {
                return response()->json([
                    'success' => false,
                    'errors' => [
                        'password2' => 'konfirmasi password salah'
                    ],
                ]);
            }

            $hash = Hash::make($validateData['password']);

            User::whereId(auth()->user()->id)->update([
                'password' => $hash
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Update password success',
                'user' => Auth()->user()
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Update password error',
                'errors' => $e->errors(),
            ]);
        }
    }

    public function updateCalibrate(Request $request)
    {
        try {
            $validateData = $request->validate([
                'name' => 'required',
                'a' => 'required',
                'b' => 'required'
            ]);

            Calibrate::where('name', $request->name)
                ->update($validateData);

            return response()->json([
                'success' => true,
                'message' => 'Calibration success',
                'calibrate' => Calibrate::all()
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            //throw $th;
            return response()->json([
                'success' => false,
                'message' => 'Update password error',
                'errors' => $e->errors(),
            ]);
        }
    }

    public function deleteSensor(Request $request)
    {
        try {
            Sensor::destroy($request->id);

            return response()->json([
                'success' => true,
                'message' => 'Delete data sensor success',
                'sensor' => Sensor::orderBy('id', 'desc')->get()
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            //throw $th;
            return response()->json([
                'success' => false,
                'message' => 'Delete data sensor error',
                'errors' => $e->errors(),
            ]);
        }
    }

    public function logout(User $user, Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json(
            [
                "success" => true,
                "message" => "Token berhasil di hapus",
            ],
        );
    }
}
