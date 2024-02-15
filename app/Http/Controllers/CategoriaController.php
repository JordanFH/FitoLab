<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use App\Models\Categoria;
use Illuminate\Support\Facades\Validator;


class CategoriaController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:categorias')->only('index');
        $this->middleware('can:categorias.create')->only('create', 'store');
        $this->middleware('can:categorias.edit')->only('edit', 'update');
        $this->middleware('can:categorias.destroy')->only('destroy');
    }

    // Listar Categorías

    public function index(Request $request)
    {
        $sortField = $request->get('sort', 'created_at');
        $sortOrder = $request->get('direction', 'desc');

        $categorias = Categoria::sort($sortField, $sortOrder)
            ->filter(request()->only('search'))
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Categorias/Index',
            [
                'categorias' => $categorias,
                'filters' => request()->all('search'),
            ]);
    }

    // Crear Categoría

    public function create()
    {
        return Inertia::render('Categorias/Create');
    }

    // Guardar Categoría

    /**
     * @throws ValidationException
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|unique:' . Categoria::class,
            'tipo' => 'required',
        ]);

        Categoria::create($validatedData);

        return redirect()->route('categorias.index')->with('success', 'Categoría creada correctamente.');
    }

    // Editar Categoría

    public function edit(string $id)
    {
        $categoria = Categoria::find($id);

        if (!$categoria) {
            return redirect()->route('categorias.index')->with('error', 'Categoría no encontrada.');
        }

        return Inertia::render('Categorias/Edit', [
            'categoria' => $categoria
        ]);
    }

    // Actualizar Categoría

    /**
     * @throws ValidationException
     */
    public function update($id, Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|unique:categorias,nombre,' . $id,
            'tipo' => 'required',
        ]);

        $categoria = Categoria::find($id);

        if (!$categoria) {
            return redirect()->route('categorias.index')->with('error', 'Categoría no encontrada.');
        }

        $categoria->update($data);
        // return $categoria;

        return redirect()->route('categorias.index')->with('success', 'Categoría actualizada correctamente.');
    }

    public function destroy($id)
    {
        $categoria = Categoria::find($id);

        if (!$categoria) {
            return redirect()->route('categorias.index')->with('error', 'Categoría no encontrada.');
        }

        $categoria->delete();

        return redirect()->route('categorias.index')->with('success', 'Categoría eliminada correctamente.');
    }

}
