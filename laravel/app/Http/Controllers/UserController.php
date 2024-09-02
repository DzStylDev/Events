<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function users(){
        $utilisateurs = DB::table('users')->get('*');
        

        // dd($utilisateurs);
        return response()->json($utilisateurs);
    }
    public function getUserByUuid(Request $request){
        $uuid = explode('/', $request->path())[2];

        $getUser = DB::table('users')->where('uuid' , '=', "$uuid")->get('*');

        return response()->json($getUser);
    }
}
