<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\FeedbackFormController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\SettingController;
use App\Http\Controllers\API\TransactionController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->name('login'); // Added route name

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/feedback/form/{transaction}', [FeedbackFormController::class, 'show']);
    Route::post('/feedback/form/{transaction}', [FeedbackFormController::class, 'submit']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/reports/feedback-summary', [ReportController::class, 'feedbackSummary']);
    Route::get('/farewell-message', [SettingController::class, 'getFarewellMessage']);
    Route::post('/farewell-message', [SettingController::class, 'updateFarewellMessage'])->middleware('auth:sanctum');
});

// Admin-only access
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/reports/sales-trends', [ReportController::class, 'salesTrends']);
});
