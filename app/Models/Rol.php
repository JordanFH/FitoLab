<?php

namespace App\Models;

use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Role;

class Rol extends Role
{
    public function scopeFilter($query, array $filters)
    {
        if (isset($filters['search'])) {
            $query->when($filters['search'], function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            });
        }
    }

    public function scopeSort($query, $sortField = 'created_at', $sortOrder = 'desc')
    {
        if (Schema::hasColumn('roles', $sortField) && ($sortOrder === 'asc' || $sortOrder === 'desc')) {
            $query->orderBy($sortField, $sortOrder);
        }
    }
}
