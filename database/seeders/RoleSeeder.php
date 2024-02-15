<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use App\Models\Rol;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear los roles
        $role0 = Rol::findOrCreate('SuperAdmin', 'web');
        $role1 = Rol::findOrCreate('Editor', 'web');
        $role2 = Rol::findOrCreate('User', 'web');

        $all = [$role0, $role1, $role2];
        $superAdminOrEditor = [$role0, $role1];
        $onlySuperAdmin = [$role0];

        // Crear el permiso para perfil
        Permission::create(['name' => 'perfil.edit', 'description' => 'Editar Perfil'])->syncRoles($all);
        Permission::create(['name' => 'perfil.destroy', 'description' => 'Eliminar Perfil'])->syncRoles($all);

        // Crear el permiso para el dashboard
        Permission::create(['name' => 'dashboard', 'description' => 'Ver Dashboard'])->syncRoles($all);

        // Crear el permiso para las rutas de roles y usuarios
        Permission::create(['name' => 'roles', 'description' => 'Ver Roles'])->syncRoles($onlySuperAdmin);
        Permission::create(['name' => 'roles.create', 'description' => 'Crear Roles'])->syncRoles($onlySuperAdmin);
        Permission::create(['name' => 'roles.edit', 'description' => 'Editar Roles'])->syncRoles($onlySuperAdmin);
        Permission::create(['name' => 'roles.destroy', 'description' => 'Eliminar Roles'])->syncRoles($onlySuperAdmin);

        Permission::create(['name' => 'usuarios', 'description' => 'Ver Usuarios'])->syncRoles($onlySuperAdmin);
        Permission::create(['name' => 'usuarios.create', 'description' => 'Crear Usuarios'])->syncRoles($onlySuperAdmin);
        Permission::create(['name' => 'usuarios.edit', 'description' => 'Editar Usuarios'])->syncRoles($onlySuperAdmin);
        Permission::create(['name' => 'usuarios.destroy', 'description' => 'Eliminar Usuarios'])->syncRoles($onlySuperAdmin);

        $routes = [
            'categorias' => 'Categorías',
        ];

        foreach ($routes as $route => $description) {
            Permission::create(['name' => $route, 'description' => "Ver $description"])->syncRoles($superAdminOrEditor);
            Permission::create(['name' => "$route.create", 'description' => "Crear $description"])->syncRoles($superAdminOrEditor);
            Permission::create(['name' => "$route.edit", 'description' => "Editar $description"])->syncRoles($superAdminOrEditor);
            Permission::create(['name' => "$route.destroy", 'description' => "Eliminar $description"])->syncRoles($superAdminOrEditor);
        }
    }
}
