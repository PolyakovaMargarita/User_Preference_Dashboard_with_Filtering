<?php

namespace App\Services;

use App\Repositories\Contracts\ProductRepositoryInterface;
use App\Repositories\Contracts\FavoriteRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Product;

class ProductService
{
    public function __construct(
        private readonly ProductRepositoryInterface $products,
        private readonly FavoriteRepositoryInterface $favorites,
    ) {}

    public function listProducts(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        return $this->products->paginateWithFilters($filters, $perPage);
    }

    public function getProduct(int $id): ?Product
    {
        return $this->products->find($id);
    }

    public function createProduct(array $data): Product
    {
        return $this->products->create($data);
    }

    public function updateProduct(int $id, array $data): ?Product
    {
        return $this->products->update($id, $data);
    }

    public function deleteProduct(int $id): bool
    {
        return $this->products->delete($id);
    }

    public function favoriteProduct(int $productId, int $userId): bool
    {
        return $this->favorites->addFavorite($userId, $productId);
    }

    public function unfavoriteProduct(int $productId, int $userId): bool
    {
        return $this->favorites->removeFavorite($userId, $productId);
    }
}


