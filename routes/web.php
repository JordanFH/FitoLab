<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* Home */
Route::get('/', function () {
    if (Auth::check()) {
        return Inertia::render('Dashboard/Dashboard');
    }
    return Inertia::render('Home/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('registro'),
    ]);
})->name('home');

/* Dashboard */
Route::get('/dashboard', function () {
    if (Auth::check()) {
        return Inertia::render('Dashboard/Dashboard');
    }
})->name('dashboard')->middleware(['auth', 'can:dashboard']);

/* Perfil */
Route::middleware('auth')->group(function () {
    Route::get('/perfil', [ProfileController::class, 'edit'])->name('perfil.edit');
    Route::patch('/perfil', [ProfileController::class, 'update'])->name('perfil.update');
    Route::delete('/perfil', [ProfileController::class, 'destroy'])->name('perfil.destroy');
});

/* Admin Routes */
Route::middleware(['auth', 'role:SuperAdmin|Editor'])->group(function () {
    // Super Admin
    Route::resource('roles', RoleController::class)->names('roles');
    Route::resource('usuarios', UserController::class)->names('usuarios');

    // Editor
    Route::resource('categorias', CategoriaController::class)->names('categorias');
});

/* User Routes */
Route::middleware(['auth', 'role:User'])->group(function () {
    // User
});


require __DIR__ . '/auth.php';
