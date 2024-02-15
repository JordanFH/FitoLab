<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Rol;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:usuarios')->only('index');
        $this->middleware('can:usuarios.create')->only('create', 'store');
        $this->middleware('can:usuarios.edit')->only('edit', 'update');
        $this->middleware('can:usuarios.destroy')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sortField = $request->get('sort', 'created_at');
        $sortOrder = $request->get('direction', 'desc');

        if (Auth::user()->hasRole('SuperAdmin')) {
            $users = User::where('id', '!=', Auth::user()->id)
                ->whereHas('roles', function ($query) {
                    $query->where('name', '!=', 'SuperAdmin');
                })
                ->with('roles')
                ->sort($sortField, $sortOrder)
                ->filter(request()->only('search'))
                ->paginate(10)
                ->withQueryString();
        }
        return Inertia::render('Users/Index', ['users' => $users, 'filters' => request()->all('search'),]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return redirect()->route('usuarios.index')
                ->with('error', 'El usuario no existe.');
        }
        // Si el usuario actual es SuperAdmin, mostrar todos los roles menos SuperAdmin
        if (Auth::user()->hasRole('SuperAdmin')) {
            $roles = Rol::where('name', '!=', 'SuperAdmin')->get();
        }
        return Inertia::render('Users/Edit', ['user' => $user, 'roles' => $roles]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'role' => 'required|exists:roles,name',
        ]);

        $user = User::findOrFail($id);

        // Verificar si el usuario no es el usuario actual
        if ($user->id === Auth::user()->id) {
            return redirect()->route('usuarios.index')
                ->with('error', 'No puedes cambiar tu propio rol.');
        }

        // Actualizar el rol del usuario
        $user->syncRoles([$request->role]);

        return redirect()->route('usuarios.index')
            ->with('success', 'Rol actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return redirect()->route('usuarios.index')
                ->with('error', 'El usuario no existe.');
        }

        /*// Verificar si el usuario autenticado tiene permiso para eliminar usuarios
        if (!Auth::user()->can('delete_users')) {
            return response()->json(['message' => 'No tienes permiso para eliminar usuarios'], 403);
        }*/

        // Verificar si el usuario que se va a eliminar no es el usuario autenticado
        if ($user->id === Auth::user()->id) {
            return redirect()->route('usuarios.index')
                ->with('error', 'No puedes eliminar tu propia cuenta desde aquí.');
        }

        $user->delete();

        return redirect()->route('usuarios.index')->with('success', 'Usuario eliminado correctamente.');
    }
}
