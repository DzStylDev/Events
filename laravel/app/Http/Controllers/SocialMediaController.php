<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Str;

class SocialMediaController extends Controller
{
    
    public function values(){
        return response()->json(['github', 'twitter', 'google']);
    }
    public function redirect($reseau){
        return Socialite::driver($reseau)->redirect(); 
    }
    public function authenticate($reseau){
        $githubUser = Socialite::driver($reseau)->user();

        try {

            $user = User::firstOrCreate(
                ['email' => $githubUser->getEmail()],
                [
                    'name' => $githubUser->getNickname()  ? $githubUser->getNickname() : $githubUser->getName(),
                    'password' => Hash::make(time()),
                    'avatar' => $githubUser->getAvatar() ? $githubUser->getAvatar() : 'photo-1611345405264-d9f9629c2f3c.webp',
                    'uuid' => Str::uuid()->toString()
                ]
            );
            Auth::loginUsingId($user);
            Auth::login($user);
            
            return redirect('http://localhost:3000/home');

        } catch (\Throwable $th) {
            dd($th);
        }
    }
}
