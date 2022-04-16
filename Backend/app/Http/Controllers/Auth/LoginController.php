<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        $credentials = $request->only(['email', 'password']);

        if(!$token = auth()->attempt( $credentials )) {
            return response()->json([
                'errors' => [
                    'email' => ['Invalid credentials']
                ]
            ], 401);
        }
        $user = auth()->user();
        // Set Login
        auth()->login ($user);
        // return response()->json(compact('token'));
        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in(hours)' => auth()->factory()->getTTL() / 60,
            'user' => auth()->user()
        ]);
    }
}
