<?php

namespace App\Http\Controllers;

use DateTime;
use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Sensor;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Validated;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

class AdminController extends Controller
{
    //
    public function index()
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
                    'name' =>  $namaBulan,
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
                    'name' =>  $namaBulan,
                    'total' => 0,
                    'value1' => 0,
                    'value2' => 0,
                    'value3' => 0,
                    'value4' => 0,
                    'value5' => 0,
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
                    'name' => "Week " . $minggu,
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
                    'name' => "Week " . $minggu,
                    'total' => 0,
                    'value1' => 0,
                    'value2' => 0,
                    'value3' => 0,
                    'value4' => 0,
                    'value5' => 0,
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

                    if ($totalDataHari > 0) {
                        $namaHari = \Carbon\Carbon::parse("Sunday")->addDays($hari - 1)->locale('en_US')->dayName;
                        $harian[] = [
                            'id' => $hari,
                            'name' => $namaHari,
                            'total' => $totalDataHari,
                            'value1' => number_format($rataValue1 / $totalDataHari, 2),
                            'value2' => number_format($rataValue2 / $totalDataHari, 2),
                            'value3' => number_format($rataValue3 / $totalDataHari, 2),
                            'value4' => number_format($rataValue4 / $totalDataHari, 2),
                            'value5' => number_format($rataValue5 / $totalDataHari, 2),
                        ];
                    } else {
                        $namaHari = \Carbon\Carbon::parse("Sunday")->addDays($hari - 1)->locale('en_US')->dayName;
                        $harian[] = [
                            'id' => $hari,
                            'name' => $namaHari,
                            'total' => 0,
                            'value1' => 0,
                            'value2' => 0,
                            'value3' => 0,
                            'value4' => 0,
                            'value5' => 0,
                        ];
                    }
                }
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
                    'name' => $formattedJam,
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
                    'name' => $formattedJam,
                    'total' => 0,
                    'value1' => 0,
                    'value2' => 0,
                    'value3' => 0,
                    'value4' => 0,
                    'value5' => 0,
                ];
            }
        }

        $rata = [
            "bulanan" => $bulanan,
            "mingguan" => $mingguan,
            "harian" => $harian,
            "perjam" => $perjam,
        ];

        $data = [
            "title" => "Dashboard",
            "active" => "dashboard",
            "sensor" => Sensor::latest('id')->first(),
            "auth" => auth()->user(),
            "allSensor" => Sensor::latest('id')->get(),
            "rata" => $rata
        ];
        return Inertia::render('Admin/Home', $data);
    }

    public function allTable()
    {

        $jumlahData = Sensor::all()->count();
        $data = [
            "title" => "Data Tabel",
            "active" => "allTable",
            "sensor" => Sensor::orderBy('id', 'desc')->get(),
            "auth" => auth()->user(),
            "jumlahData" => $jumlahData,
        ];
        // dd($data['sensor'][0]->created_at->format('d M Y'));
        return Inertia::render('Admin/AllTable', $data);
    }

    public function deleteSensor(Sensor $sensor)
    {
        Sensor::destroy($sensor->id);

        return back()->with('delete', 'Delete data sensor suksess');
    }
    public function calibrate()
    {
        $data = [
            "title" => "Kalibrasi",
            "active" => "calibrate",
            "auth" => auth()->user(),
            "sensor" => Sensor::orderBy('id', 'desc')->get(),
        ];
        return Inertia::render('Admin/Calibrate', $data);
    }
    public function prediction()
    {
        $data = [
            "title" => "Prediction",
            "active" => "prediction",
            "sensor" => Sensor::orderBy('id', 'desc')->get(),
            "auth" => auth()->user(),
        ];
        return Inertia::render('Admin/Prediction', $data);
    }

    public function profil()
    {
        $data = [
            "title" => "Profil",
            "active" => "profil",
            "sensor" => Sensor::orderBy('id', 'desc')->get(),
            "auth" => auth()->user(),
        ];
        return Inertia::render('Admin/Profil', $data);
    }
    public function profil_update(User $user, Request $request)
    {
        $rules = ([
            'name' => 'required',
        ]);

        if ($request->email != auth()->user()->email) {
            # code...
            $rules['email'] = 'required|email:dns|unique:users';
        };
        $validateData = $request->validate($rules);

        User::where('id', auth()->user()->id)
            ->update($validateData);

        return back()->with('message', 'update data profil berhasil');
    }

    public function password_update(User $user, Request $request)
    {
        $validateData = $request->validate([
            'password' => 'required',
            'password2' => 'required'
        ]);

        if ($validateData['password'] !== $validateData['password2']) {

            return back()->with('error', 'konfirmasi password tidak sama');
        }

        $hash = Hash::make($validateData['password']);
        User::whereId(auth()->user()->id)->update([
            'password' => $hash
        ]);

        return back()->with('success', 'update Password Berhasil');
    }
}
