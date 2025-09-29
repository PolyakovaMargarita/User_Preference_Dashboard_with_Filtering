<?php

namespace App\Repositories\Contracts;

use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ProductRepositoryInterface
{
    public function paginateWithFilters(array $filters, int $perPage = 15): LengthAwarePaginator;

    public function find(int $id): ?Product;

    public function create(array $data): Product;

    public function update(int $id, array $data): ?Product;

    public function delete(int $id): bool;

    public function toggleFavorite(int $productId, int $userId): bool;
}


