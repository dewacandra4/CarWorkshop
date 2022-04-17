<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;
use Exception;
class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        // try {
        //     $user = auth()->userOrFail();
        // } catch (Exception $e) {
        //     if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
        //         return response()->json(['error' => 'Token is Invalid']);
        //     } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
        //         return response()->json(['error' => 'Token is Expired']);
        //     } else {
        //         return response()->json(['error' => 'Something is wrong']);
        //     }
        // }
        // return response()->json(compact('user'));
        return $request->user()->name;
    }

    public function index()
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

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $owner_car = User::where('role',2)->get();
        return $owner_car;
    }
    public function showMechanic()
    {
        $mechanic = User::where('role',1)->get();
        return $mechanic;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
