<?php

namespace App\Repositories\Eloquent;

use App\Models\Favorite;
use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProductRepository implements ProductRepositoryInterface
{
    public function paginateWithFilters(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        $query = Product::query()->with('category');

        $categoryId = $filters['category_id'] ?? $filters['category'] ?? null;
        $userId = isset($filters['user_id']) ? (int) $filters['user_id'] : 1; // default single user

        if (!empty($categoryId)) {
            $query->where('category_id', (int) $categoryId);
        }

        if (!empty($filters['min_price'])) {
            $query->where('price', '>=', (float) $filters['min_price']);
        }

        if (!empty($filters['max_price'])) {
            $query->where('price', '<=', (float) $filters['max_price']);
        }

        if (!empty($filters['min_rating'])) {
            $query->where('rating', '>=', (float) $filters['min_rating']);
        }

        $searchValue = $filters['search'] ?? $filters['q'] ?? null;
        if (!empty($searchValue)) {
            $search = trim((string) $searchValue);
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%'.$search.'%')
                  ->orWhere('description', 'like', '%'.$search.'%');
            });
        }

        // Attach is_favorited flag and favorites_only filter
        $query->withExists(['favorites as is_favorited' => function ($q) use ($userId) {
            $q->where('user_id', $userId);
        }]);

        if (!empty($filters['favorites_only'])) {
            $favoritesOnly = filter_var($filters['favorites_only'], FILTER_VALIDATE_BOOLEAN);
            if ($favoritesOnly) {
                $query->whereHas('favorites', function ($q) use ($userId) {
                    $q->where('user_id', $userId);
                });
            }
        }

        // Sorting
        $sort = (string) ($filters['sort'] ?? '');
        switch ($sort) {
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'rating_asc':
                $query->orderBy('rating', 'asc');
                break;
            case 'rating_desc':
                $query->orderBy('rating', 'desc');
                break;
            case 'name_asc':
                $query->orderBy('name', 'asc');
                break;
            case 'name_desc':
                $query->orderBy('name', 'desc');
                break;
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            default:
                $query->orderBy('id', 'desc');
                break;
        }

        return $query->paginate($perPage);
    }

    public function find(int $id): ?Product
    {
        return Product::with(['category', 'favorites'])->find($id);
    }

    public function create(array $data): Product
    {
        return Product::create($data);
    }

    public function update(int $id, array $data): ?Product
    {
        $product = Product::find($id);
        if (!$product) {
            return null;
        }
        $product->update($data);
        return $product->fresh(['category', 'favorites']);
    }

    public function delete(int $id): bool
    {
        $product = Product::find($id);
        return $product ? (bool) $product->delete() : false;
    }

    public function toggleFavorite(int $productId, int $userId): bool
    {
        $existing = Favorite::where('product_id', $productId)
            ->where('user_id', $userId)
            ->first();

        if ($existing) {
            $existing->delete();
            return false;
        }

        Favorite::create([
            'product_id' => $productId,
            'user_id' => $userId,
        ]);

        return true;
    }
}


