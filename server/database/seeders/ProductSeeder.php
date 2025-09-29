<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            // Electronics
            ['iPhone 15 Pro', 'Latest smartphone from Apple with titanium body', 999.99, 4.8, 'Electronics'],
            ['Samsung Galaxy S24', 'Flagship Android smartphone with AI features', 899.99, 4.7, 'Electronics'],
            ['MacBook Pro M3', 'Professional laptop for creative tasks', 1999.99, 4.9, 'Electronics'],
            ['Sony WH-1000XM5', 'Premium wireless headphones with noise cancellation', 399.99, 4.6, 'Electronics'],
            ['iPad Air', 'Tablet for work and entertainment', 599.99, 4.5, 'Electronics'],

            // Clothing & Shoes
            ['Levi\'s 501 Jeans', 'Classic denim jeans', 89.99, 4.3, 'Clothing & Shoes'],
            ['Nike Air Max Sneakers', 'Comfortable athletic sneakers', 129.99, 4.4, 'Clothing & Shoes'],
            ['The North Face Jacket', 'Warm winter jacket', 199.99, 4.5, 'Clothing & Shoes'],
            ['Zara Dress', 'Elegant evening dress', 79.99, 4.2, 'Clothing & Shoes'],
            ['Hugo Boss Shirt', 'Classic business shirt', 149.99, 4.6, 'Clothing & Shoes'],

            // Home & Garden
            ['De\'Longhi Coffee Machine', 'Automatic coffee machine', 299.99, 4.4, 'Home & Garden'],
            ['Dyson V15 Vacuum', 'Cordless vacuum with laser', 599.99, 4.7, 'Home & Garden'],
            ['Bosch Washing Machine', 'Energy-efficient washing machine', 799.99, 4.5, 'Home & Garden'],
            ['Tefal Cookware Set', 'Professional cookware set', 199.99, 4.3, 'Home & Garden'],
            ['Nest Smart Thermostat', 'Smart home thermostat', 249.99, 4.6, 'Home & Garden'],

            // Sports & Recreation
            ['Trek Domane Bike', 'Road bike for training', 1299.99, 4.8, 'Sports & Recreation'],
            ['Bowflex Dumbbells', 'Adjustable dumbbell set', 299.99, 4.4, 'Sports & Recreation'],
            ['Lululemon Yoga Mat', 'Professional yoga mat', 89.99, 4.5, 'Sports & Recreation'],
            ['NordicTrack Treadmill', 'Electric treadmill', 999.99, 4.3, 'Sports & Recreation'],
            ['Burton Snowboard', 'Professional snowboard', 599.99, 4.7, 'Sports & Recreation'],

            // Beauty & Health
            ['La Mer Face Cream', 'Premium moisturizing cream', 199.99, 4.6, 'Beauty & Health'],
            ['Oral-B Toothbrush', 'Electric toothbrush', 79.99, 4.4, 'Beauty & Health'],
            ['Theragun Massager', 'Professional massager', 399.99, 4.5, 'Beauty & Health'],
            ['Olaplex Shampoo', 'Repairing shampoo', 29.99, 4.3, 'Beauty & Health'],
            ['SPF 50 Sunscreen', 'UV protection cream', 19.99, 4.2, 'Beauty & Health'],

            // Books & Media
            ['1984 by George Orwell', 'Classic dystopian novel', 12.99, 4.8, 'Books & Media'],
            ['Sony WH-1000XM4 Headphones', 'Wireless headphones with noise cancellation', 349.99, 4.6, 'Books & Media'],
            ['PlayStation 5 Console', 'Next-generation gaming console', 499.99, 4.9, 'Books & Media'],
            ['Harry Potter Book Series', 'Complete Harry Potter book collection', 89.99, 4.7, 'Books & Media'],
            ['Netflix Subscription', 'Annual streaming subscription', 119.99, 4.4, 'Books & Media'],

            // Automotive
            ['Tesla Model 3', 'Premium electric vehicle', 39999.99, 4.8, 'Automotive'],
            ['Honda CBR600RR Motorcycle', 'Sport motorcycle', 8999.99, 4.6, 'Automotive'],
            ['BMW X5 SUV', 'Premium crossover', 59999.99, 4.7, 'Automotive'],
            ['Vespa Scooter', 'Classic Italian scooter', 3999.99, 4.5, 'Automotive'],
            ['Toyota Camry Sedan', 'Reliable sedan', 24999.99, 4.4, 'Automotive']
        ];

        foreach ($products as $productData) {
            $category = Category::where('name', $productData[4])->first();

            if ($category) {
                Product::create([
                    'category_id' => $category->id,
                    'name' => $productData[0],
                    'description' => $productData[1],
                    'price' => $productData[2],
                    'rating' => $productData[3],
                ]);
            }
        }
    }
}
