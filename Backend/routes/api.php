<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
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
    Route::post('register_cowner', [RegisterController::class, 'registerCarOwners']);
    Route::post('register_mechanic', [RegisterController::class, 'registerMechanic']);
    Route::post('logout', [LogoutController::class, 'logout']);
});

Route::middleware('auth:api')->group(function () {
    Route::get('user', [UserController::class, '__invoke']);
  
});
