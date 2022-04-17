<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceCollection;
use App\Models\Service;
use Illuminate\Http\Request;

class ServicesController extends Controller
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
        $request->validate([
            'name' => 'required|',
            'price' => 'required|numeric',
        ]);
        $services = Service::create(
            $request->only(['name', 'price'])
        );
        return response()->json($services, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $service = new ServiceCollection(Service::get());
        return response()->json([
            'status' => '200',
            'data' => $service
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update( Request $request)
    {
        $id = $request->id;
        $request->validate([
            'name' => 'required|',
            'price' => 'required|numeric',
        ]);
        $services = Service::find($id)->update(
            $request->only(['name', 'price'])
        );
        return response ()->json([
            'status' => '200',
            'data' => $services
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    { 
        $services = Service::find($id);
        if($services){
            $services->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Service deleted successfully'
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 404,
                'message' => 'Service not found'
            ]);
        }
    }
}
