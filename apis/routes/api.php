<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\JogosController;
use Illuminate\Support\Facades\Route;


    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/teste',  [AuthController::class, 'teste']);

    Route::prefix('/games')->group(function (){
    Route::post('/store', [JogosController::class, 'store']);
    Route::get('/show/{id}', [JogosController::class, 'show']);
    Route::put('/update/{jogo}', [JogosController::class, 'update']);
    Route::delete('/destroy/{id}', [JogosController::class, 'destroy']);
});
