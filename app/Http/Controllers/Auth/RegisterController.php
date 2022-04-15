<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registerCarOwners(RegisterRequest $request)
    {
        $user = User::create([
            'name' => request('name'),
            'email' => request('email'),
            'role' => 'car_owner',
            'password' => Hash::make(request('password')),
        ]);
        return response()->json($user, 201);
    }
    public function registerMechanic(RegisterRequest $request)
    {
        $user = User::create([
            'name' => request('name'),
            'email' => request('email'),
            'role' => 'mechanic',
            'password' => Hash::make(request('password')),
        ]);
        return response()->json($user, 201);
    }

}
