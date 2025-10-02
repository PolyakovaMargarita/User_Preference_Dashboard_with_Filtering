<?php

namespace App\Services;

use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Models\Category;
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

    public function createCategory(string $name): Category
    {
        $slug = str($name)->slug('-')->toString();
        $base = $slug;
        $i = 1;
        while ($this->categories->findBySlug($slug)) {
            $slug = $base.'-'.$i++;
        }

        return Category::create(['name' => $name, 'slug' => $slug]);
    }
}


