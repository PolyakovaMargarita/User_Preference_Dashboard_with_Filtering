<?php

namespace App\Repositories\Contracts;

use Illuminate\Support\Collection;

interface FavoriteRepositoryInterface
{
    public function addFavorite(int $userId, int $productId): bool;

    public function removeFavorite(int $userId, int $productId): bool;

    /**
     * @return Collection<int, \App\Models\Favorite>
     */
    public function getFavoritesByUser(int $userId): Collection;
}


