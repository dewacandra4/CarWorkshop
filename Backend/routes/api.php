<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\UserController;
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

// Auth routes
Route::namespace('Auth')->group(function () {
    Route::post('login', [LoginController::class, 'login']);
    Route::post('logout', [LogoutController::class, 'logout']);
});


Route::middleware('auth:api')->group(function () {
    Route::get('user', [UserController::class, '__invoke']);
});


Route::get('list_services', [ServicesController::class, 'show']);

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('add_car', [CarController::class, 'store']);
    Route::post('register_cowner', [RegisterController::class, 'registerCarOwners']);
    Route::post('register_mechanic', [RegisterController::class, 'registerMechanic']);

    Route::post('add_service', [ServicesController::class, 'store']);
    Route::put('edit_service', [ServicesController::class, 'update']);
    Route::delete('delete_service/{id}', [ServicesController::class, 'destroy']);

    Route::get('list_cowners', [UserController::class, 'show']);

    Route::get('list_cars', [CarController::class, 'index']);


    Route::get('cars/{car}', [CarController::class, 'show']);
    // Route::get('cars/{id}', [CarController::class, 'show']);
    // Route::get('cars/{id}/services/{service_id}', [CarController::class, 'getService']);


    
});