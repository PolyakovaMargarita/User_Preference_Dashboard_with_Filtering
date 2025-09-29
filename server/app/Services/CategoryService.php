<?php

namespace App\Services;

use App\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Support\Collection;

class CategoryService
{
    public function __construct(private readonly CategoryRepositoryInterface $categories) {}

    /**
     * @return Collection<int, \App\Models\Category>
     */
    public function listCategories(): Collection
    {
        return $this->categories->all();
    }
}


