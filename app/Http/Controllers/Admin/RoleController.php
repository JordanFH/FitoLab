<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use App\Models\Rol;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:roles')->only('index');
        $this->middleware('can:roles.create')->only('create', 'store');
        $this->middleware('can:roles.edit')->only('edit', 'update');
        $this->middleware('can:roles.destroy')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sortField = $request->get('sort', 'created_at');
        $sortOrder = $request->get('direction', 'desc');

        $roles = Rol::where('name', '!=', 'SuperAdmin')
            ->with('permissions')
            ->sort($sortField, $sortOrder)
            ->filter(request()->only('search'))
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Roles/Index', [
            'roles' => $roles,
            'filters' => request()->all('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(
            'Roles/Create',
            [
                'permissions' => Permission::where('name', '!=', 'dashboard')
                    ->where('name', '!=', 'perfil.edit')
                    ->where('name', '!=', 'perfil.destroy')
                    ->where('name', '!=', 'roles')
                    ->where('name', '!=', 'roles.create')
                    ->where('name', '!=', 'roles.edit')
                    ->where('name', '!=', 'roles.destroy')
                    ->where('name', '!=', 'usuarios')
                    ->where('name', '!=', 'usuarios.create')
                    ->where('name', '!=', 'usuarios.edit')
                    ->where('name', '!=', 'usuarios.destroy')
                    ->get()
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'max:255', 'unique:roles'],
            'permissions' => 'required|array',
        ]);

        $role = Rol::create(['name' => $request->name]);

        // Definir los permisos por defecto
        $defaultPermissions = [
            'dashboard',
            'perfil.edit',
            'perfil.destroy',
        ];

        // Obtener permisos del request y agregar los permisos de perfil
        $requestedPermissions = array_merge($request->permissions, $defaultPermissions);

        // Filtrar permisos duplicados
        $uniquePermissions = array_unique($requestedPermissions);

        // Asignar permisos al nuevo rol
        $role->syncPermissions($uniquePermissions);

        return redirect()->route('roles.index')->with('success', 'Rol creado correctamente.');
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

        $role = Rol::where('id', $id)->with('permissions')->first();

        if (!$role) {
            return redirect()->route('roles.index')->with('error', 'El rol no existe.');
        }

        if ($role && in_array($role->name, ['SuperAdmin', 'Editor', 'User'])) {
            return redirect()->route('roles.index')->with('error', 'Este rol no puede ser editado.');
        }

        return Inertia::render(
            'Roles/Edit',
            [
                'role' => $role,
                'permissions' => Permission::where('name', '!=', 'dashboard')
                    ->where('name', '!=', 'perfil.edit')
                    ->where('name', '!=', 'perfil.destroy')
                    ->where('name', '!=', 'roles')
                    ->where('name', '!=', 'roles.create')
                    ->where('name', '!=', 'roles.edit')
                    ->where('name', '!=', 'roles.destroy')
                    ->where('name', '!=', 'usuarios')
                    ->where('name', '!=', 'usuarios.create')
                    ->where('name', '!=', 'usuarios.edit')
                    ->where('name', '!=', 'usuarios.destroy')
                    ->get(),
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rol $role)
    {
        if (!$role) {
            return redirect()->route('roles.index')->with('error', 'El rol no existe.');
        }

        if ($role && in_array($role->name, ['SuperAdmin', 'Editor', 'User'])) {
            return redirect()->route('roles.index')->with('error', 'Este rol no puede ser editado.');
        }

        $request->validate([
            'name' => ['required', 'max:255', Rule::unique('roles')->ignore($role)],
            'permissions' => 'required|array',
        ]);

        $role->update(['name' => $request->name]);

        // Obtener permisos del request
        $requestedPermissions = $request->permissions;

        // Filtrar permisos duplicados
        $uniquePermissions = array_unique($requestedPermissions);

        // Asignar permisos actualizados al rol
        $role->syncPermissions($uniquePermissions);

        return redirect()->route('roles.index')->with('success', 'Rol actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $role = Rol::find($id);

        if (!$role) {
            return redirect()->route('roles.index')->with('error', 'El rol no existe.');
        }

        // Verificar el rol y/o no permitir su eliminación
        if ($role && in_array($role->name, ['SuperAdmin', 'Editor', 'User'])) {
            return redirect()->route('roles.index')->with('error', 'Este rol no puede ser eliminado.');
        }

        if ($role) {
            // Antes de eliminar el rol, asignarle el rol "User" a los usuarios que lo tengan
            $users = $role->users;
            foreach ($users as $user) {
                $user->assignRole('User');
            }

            $role->delete();
            return redirect()->route('roles.index')->with('success', 'Rol eliminado correctamente.');
        } else {
            return redirect()->route('roles.index')->with('error', 'El rol no existe.');
        }
    }
}
