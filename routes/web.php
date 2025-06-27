<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\GpaController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ChatController;

// Home route
Route::get('/', function () {
    return view('welcome');
})->name('home');

// Authentication routes
Auth::routes();

// Protected routes
Route::middleware(['auth'])->group(function () {
    
    // Dashboard routes
    Route::get('/student/dashboard', [DashboardController::class, 'studentDashboard'])
        ->name('student.dashboard')
        ->middleware('role:student');
    
    Route::get('/admin/dashboard', [DashboardController::class, 'adminDashboard'])
        ->name('admin.dashboard')
        ->middleware('role:admin');
    
    // Digital Library routes
    Route::prefix('library')->name('library.')->group(function () {
        Route::get('/', [ResourceController::class, 'index'])->name('index');
        Route::get('/create', [ResourceController::class, 'create'])->name('create');
        Route::post('/store', [ResourceController::class, 'store'])->name('store');
        Route::get('/{resource}', [ResourceController::class, 'show'])->name('show');
        Route::get('/{resource}/download', [ResourceController::class, 'download'])->name('download');
    });
    
    // GPA Calculator routes
    Route::prefix('gpa')->name('gpa.')->group(function () {
        Route::get('/calculator', [GpaController::class, 'calculator'])->name('calculator');
        Route::post('/calculate', [GpaController::class, 'calculate'])->name('calculate');
        Route::post('/save', [GpaController::class, 'save'])->name('save');
    });
    
    // Blog routes
    Route::prefix('blogs')->name('blogs.')->group(function () {
        Route::get('/', [BlogController::class, 'index'])->name('index');
        Route::get('/{blog}', [BlogController::class, 'show'])->name('show');
        Route::post('/{blog}/comment', [BlogController::class, 'comment'])->name('comment');
    });
    
    // Chat routes
    Route::prefix('chat')->name('chat.')->group(function () {
        Route::get('/', [ChatController::class, 'index'])->name('index');
        Route::get('/conversation/{user}', [ChatController::class, 'conversation'])->name('conversation');
        Route::post('/send', [ChatController::class, 'send'])->name('send');
        Route::get('/messages/{user}', [ChatController::class, 'getMessages'])->name('messages');
    });
});
