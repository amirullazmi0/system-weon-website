<?php

use App\Events\SensorEvent;
use App\Http\Controllers\API_Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/sensor', function () {
    return response()->json(
        [
            "message" => "get method success",
            "token" => "ini token"
        ]
    );
});
Route::post('/login', [API_Controller::class, 'login']);
Route::post('/register', [API_Controller::class, 'register']);

Route::middleware('auth:sanctum')->get('/auth', [API_Controller::class, 'auth']);
Route::middleware('auth:sanctum')->get('/latest', [API_Controller::class, 'latestSensor']);
Route::middleware('auth:sanctum')->get('/ratarata', [API_Controller::class, 'ratarata']);
Route::middleware('auth:sanctum')->get('/sensor', [API_Controller::class, 'sensor']);

Route::middleware('auth:sanctum')->get('/postSensor', [SensorController::class, 'store']);
Route::middleware('auth:sanctum')->get('/getCalibrate', [SensorController::class, 'getCalibrate']);

Route::middleware('auth:sanctum')->get('/allData', [API_Controller::class, 'allData']);
Route::middleware('auth:sanctum')->post('/updateUser', [API_Controller::class, 'updateUser']);
Route::middleware('auth:sanctum')->post('/deleteSensor', [API_Controller::class, 'deleteSensor']);
Route::middleware('auth:sanctum')->post('/updatePasswordUser', [API_Controller::class, 'updatePasswordUser']);
Route::middleware('auth:sanctum')->post('/updateCalibrate', [API_Controller::class, 'updateCalibrate']);
Route::middleware('auth:sanctum')->post('/logout', [API_Controller::class, 'logout']);