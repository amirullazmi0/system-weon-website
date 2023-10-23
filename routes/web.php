<?php

use Inertia\Inertia;
use App\Events\Hello;
use App\Events\SensorEvent;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SensorController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/postSensor', [SensorController::class, 'store']);
Route::get('/getCalibrate', [SensorController::class, 'getCalibrate']);
Route::get('/data', [SensorController::class, 'index']);

Route::get('/latest', [API_Controller::class, 'latestSensor']);
Route::get('/ratarata', [API_Controller::class, 'ratarata']);
Route::get('/sensor', [API_Controller::class, 'sensor']);


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('home');
    Route::get('/profil', [AdminController::class, 'profil'])->name('profil');
    Route::post('/profil', [AdminController::class, 'profil_update']);
    Route::post('/password', [AdminController::class, 'password_update']);

    Route::get('/allTable', [AdminController::class, 'allTable'])->name('allTable');
    Route::post('/sensor/{sensor:id}', [AdminController::class, 'deleteSensor']);
    Route::get('/calibrate', [AdminController::class, 'calibrate'])->name('calibrate');
    Route::post('/calibrate', [SensorController::class, 'editCalibrate']);
    Route::get('/prediction', [AdminController::class, 'prediction'])->name('prediction');
});

// new broo
Route::get('/bro', function () {
    $data = [
        'nama' => 'amirull azmi',
        'nim' => 'D1041181009'
    ];
    SensorEvent::dispatch($data);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
