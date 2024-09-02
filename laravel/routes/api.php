<?php

use App\Http\Controllers\DatasetsController;
use App\Http\Controllers\SocialMediaController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//récuperer les jeux de données
Route::get('/datasets/{id}', [DatasetsController::class, 'datasets']);

// Route::get('/datasets/{datasets}/records', [DatasetsController::class, 'datasetsRecords']);

Route::get('/providerController', [SocialMediaController::class, "values"]);

//Liste des évenements global
Route::get('/evenements', [DatasetsController::class, 'evenements']);

//list des status de chacun des evenements
Route::get('/evenements_model', [DatasetsController::class, 'evenementStatus']);

Route::post('/evenements', [DatasetsController::class, 'insertEvenement']);
//Liste des utilisteurs 
Route::get('/users', [UserController::class, 'users']);
Route::get('/users/{uuid}', [UserController::class, 'getUserByUuid']);

Route::get('/evenement_proche/{lat}/{long}', [DatasetsController::class, 'evenementStatus2']);

