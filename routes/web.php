<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('dashboard', DashboardController::class)->name('dashboard');

Route::resource('categories', CategoryController::class)->scoped(['category' => 'slug']);

Route::get('articles/in', [ArticleController::class, 'search'])->name('articles.search');
Route::put('articles/{article}/publish', [ArticleController::class, 'publish'])->name('articles.publish');
Route::get('articles/list', [ArticleController::class, 'list'])->name('articles.list');
Route::get('articles/filter/{key}', [ArticleController::class, 'filter'])->name('articles.filter');
Route::resource('articles', ArticleController::class)->scoped(['article' => 'slug']);

Route::middleware('auth')->group(function () {
    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
