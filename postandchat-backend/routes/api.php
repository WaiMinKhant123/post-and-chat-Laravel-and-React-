<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


    Route::post('register',[AuthController::class,'register']);
    Route::post('login',[AuthController::class,'login']);
    Route::apiResource('/post/{post}/media', MediaController::class)
    ->only(['index', 'show']);
    Route::apiResource('post', PostController::class)
    ->only(['index', 'show']);


Route::middleware('auth:api')->group(function(){
    Route::get('me',[AuthController::class,'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::apiResource('post', PostController::class)
        ->only(['store', 'update', 'destroy']);
    Route::post('/post/{post}/media', [MediaController::class,'store']);
    Route::put('/media/{media}', [MediaController::class, 'update']);
    Route::delete('/media/{media}', [MediaController::class, 'destory']);
});

