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

        $data = [
            "title" => "Dashboard",
            "active" => "dashboard",
            "sensor" => Sensor::latest('id')->first(),
            "auth" => auth()->user(),
            "allSensor" => Sensor::latest('id')->take(20)->get(),
            "base_url" => env('APP_URL')
            // "rata" => $rata
        ];
        return Inertia::render('Admin/Home', $data);
    }

    public function allTable()
    {

        $jumlahData = Sensor::all()->count();
        $data = [
            "title" => "Data Tabel",
            "active" => "allTable",
            "auth" => auth()->user(),
            "jumlahData" => $jumlahData,
            "base_url" => env('APP_URL')
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
            // "sensor" => Sensor::orderBy('id', 'desc')->get(),
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
            // "sensor" => Sensor::orderBy('id', 'desc')->get(),
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
