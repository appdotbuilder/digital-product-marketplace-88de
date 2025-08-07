<?php

use App\Http\Controllers\DownloadController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public product routes
Route::resource('products', ProductController::class)->only(['index', 'show']);

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Order routes
    Route::resource('orders', OrderController::class)->except(['create', 'edit', 'update', 'destroy']);
    Route::get('orders/{order}/download', [DownloadController::class, 'show'])->name('orders.download');
    
    // Wallet routes
    Route::controller(WalletController::class)->group(function () {
        Route::get('/wallet', 'index')->name('wallet.index');
        Route::get('/wallet/deposit', 'create')->name('wallet.create');
        Route::post('/wallet/deposit', 'store')->name('wallet.store');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
