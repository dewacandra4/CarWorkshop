<?php

namespace App\Http\Controllers;

use App\Http\Resources\CarCollection;
use App\Http\Resources\CarResource;
use App\Models\Car;
use App\Models\User;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // show list car
        $cars = Car::get();

        return new CarCollection($cars);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|',
            'model' => 'required|string',
            'license_plate' => 'required|string|unique:cars,license_plate',
            'owner_id' => 'required|integer',
            'service_id' => 'required|integer',
            // 'mechanic_id' => 'required',
            // 'status' => 'required|string'
        ]);
        $cars = Car::create(
            $request->only(['name', 'model', 'license_plate', 'owner_id', 'service_id'])
        );

        $details_email = [
            'title' => 'Your car has been registered',
            'body' => 'Your car has been registered, please wait for the mechanic to accept your car',
        ];
        \Mail::to($cars->owner->email)->send(new \App\Mail\EmailNotif($details_email));
        return response()->json($cars, 200);
    }

    public function submitComplaint(Request $request)
    {
        $id = $request->id_car;
        $request->validate([
            'id_car' => 'required|integer',
            'complaint' => 'required|string',
        ]);
        $car = Car::find($id);
        $car->complaint = $request->input('complaint');
        $car->status = 'revision';
        $car->save();

        $details_email = [
            'title' => 'Complaint for car <'. Car::find($id)->name .'>',
            'body' => Car::find($id)->complaint,
        ];
        // Send email to mechanic for complaint
        \Mail::to(Car::find($id)->mechanic->email)->send(new \App\Mail\EmailNotif($details_email));
        return response()->json($car, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Car $car)
    {
        return new CarResource($car);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function showCarOwner(Car $car, $id)
    {
        $id = Car::where('owner_id',$id)->get();
       
        return new CarCollection($id);;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateMechanic(Request $request)
    {
        $id = $request->id;
        // update mechanic
        $request->validate([
            'mechanic_id' => 'required|integer',
        ]);
        $mechanic_id = $request->mechanic_id;
        $mechanic_email = User::find($mechanic_id)->email;
        $cars = Car::find($id)->update(
            $request->only(['mechanic_id'])
        );
        $details_email = [
            'title' => 'You have new job to do',
            'body' => 'You have new car to service, please login to your account to accept the car services',
        ];
        // Send email to mechanic for job assignt
        \Mail::to($mechanic_email)->send(new \App\Mail\EmailNotif($details_email));
        return response()->json($cars, 200);
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
