<?php

namespace App\Repositories\Contracts;

use App\Models\Category;

interface CategoryRepositoryInterface
{
    /**
     * @return \Illuminate\Support\Collection<int, Category>
     */
    public function all();

    public function find(int $id): ?Category;

    public function findBySlug(string $slug): ?Category;
}


