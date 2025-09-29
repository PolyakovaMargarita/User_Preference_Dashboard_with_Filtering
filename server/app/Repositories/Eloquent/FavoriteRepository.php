<?php

namespace App\Repositories\Eloquent;

use App\Models\Favorite;
use App\Repositories\Contracts\FavoriteRepositoryInterface;
use Illuminate\Support\Collection;

class FavoriteRepository implements FavoriteRepositoryInterface
{
    public function addFavorite(int $userId, int $productId): bool
    {
        $exists = Favorite::where('user_id', $userId)
            ->where('product_id', $productId)
            ->exists();

        if ($exists) {
            return false;
        }

        Favorite::create([
            'user_id' => $userId,
            'product_id' => $productId,
        ]);

        return true;
    }

    public function removeFavorite(int $userId, int $productId): bool
    {
        return (bool) Favorite::where('user_id', $userId)
            ->where('product_id', $productId)
            ->delete();
    }

    public function getFavoritesByUser(int $userId): Collection
    {
        return Favorite::with('product')
            ->where('user_id', $userId)
            ->get();
    }
}


