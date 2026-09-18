<?php

use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;

Route::prefix('clients')->group(function () {
    Route::get('/', [ClientController::class, 'index']);
    Route::post('/', [ClientController::class, 'store']);
    
    Route::get('/{client}', [ClientController::class, 'show']);
    Route::patch('/{client}', [ClientController::class, 'update']);
});