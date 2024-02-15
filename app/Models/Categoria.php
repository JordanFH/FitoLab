<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class Categoria extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre', 'tipo'
    ];

    public function scopeFilter($query, array $filters)
    {
        if (isset($filters['search'])) {
            $query->when($filters['search'], function ($query, $search) {
                $query->where('nombre', 'like', '%' . $search . '%')
                    ->orWhere('tipo', 'like', '%' . $search . '%');
            });
        }
    }

    public function scopeSort($query, $sortField = 'created_at', $sortOrder = 'desc')
    {
        if (Schema::hasColumn('categorias', $sortField) && ($sortOrder === 'asc' || $sortOrder === 'desc')) {
            $query->orderBy($sortField, $sortOrder);
        }
    }
}
