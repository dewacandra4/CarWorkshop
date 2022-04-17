<?php

namespace App\Http\Controllers;

use App\Http\Resources\CarResource;
use App\Models\Car;
use Illuminate\Http\Request;

class MechanicController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showCar($id)
    {
        // Show car the mecahnic handle
        $car = Car::where('mechanic_id', $id)->get();
        return $car;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function markJobDone($id)
    {
        $car = Car::where('id', $id)->update(['status' => 'completed']);
        $owner_email = Car::find($id)->owner->email;
        if ($car) {
            \Mail::to($owner_email)->send(new \App\Mail\EmailNotif([
                'title' => 'Your car has been completed',
                'body' => 'Your car has been completed, you can now go to the workshop to get your car',
            ]));
            return response()->json([
                'status' => '200',
                'data' => $car
            ]);
        } else {
            return response()->json([
                'status' => '404',
                'data' => 'Car not found'
            ]);
        }
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
