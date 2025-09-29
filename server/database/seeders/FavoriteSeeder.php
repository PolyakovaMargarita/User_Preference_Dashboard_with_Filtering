<?php

namespace Database\Seeders;

use App\Models\Favorite;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FavoriteSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::take(8)->get();

        foreach ($products as $product) {
            Favorite::create([
                'user_id' => 1,
                'product_id' => $product->id,
            ]);
        }
    }
}
