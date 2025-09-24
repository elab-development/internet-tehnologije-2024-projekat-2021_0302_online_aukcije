<?php

use App\Http\Controllers\AuctionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BidController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

Route::get('/auctions', [AuctionController::class, 'index']);
Route::get('/auctions/filter', [AuctionController::class, 'filter']);
Route::get('/auctions/page/{page}', [AuctionController::class, 'pagination']);
Route::get('/auctions/{id}', [AuctionController::class, 'show']);

Route::get('/bids', [BidController::class, 'index']);
Route::get('/bids/{id}', [BidController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::resource('categories', CategoryController::class)
        ->only(['store', 'update', 'destroy']);
    Route::resource('auctions', AuctionController::class)
        ->only(['store', 'update', 'destroy']);
    Route::resource('bids', BidController::class)
        ->only(['store', 'update', 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
