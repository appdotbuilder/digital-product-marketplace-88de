<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductInventory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MarketplaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'is_admin' => true,
            'email_verified_at' => now(),
        ]);

        // Create regular test users
        $users = User::factory(10)->create([
            'email_verified_at' => now(),
        ]);

        // Create downloadable products
        $downloadableProducts = Product::factory(15)->create([
            'type' => 'downloadable',
            'stock_quantity' => fake()->numberBetween(50, 500),
        ]);

        // Create non-downloadable products with inventory
        $nonDownloadableProducts = Product::factory(10)->create([
            'type' => 'non_downloadable',
            'stock_quantity' => 0, // Will be determined by inventory count
        ]);

        // Create inventory for non-downloadable products
        foreach ($nonDownloadableProducts as $product) {
            $inventoryCount = fake()->numberBetween(5, 25);
            ProductInventory::factory($inventoryCount)->create([
                'product_id' => $product->id,
            ]);
        }

        // Create some orders for demo purposes
        foreach ($users as $user) {
            $orderCount = fake()->numberBetween(0, 5);
            for ($i = 0; $i < $orderCount; $i++) {
                $product = Product::inRandomOrder()->first();
                $quantity = fake()->numberBetween(1, 2);
                
                \App\Models\Order::create([
                    'order_number' => \App\Models\Order::generateOrderNumber(),
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $product->price,
                    'total_price' => $product->price * $quantity,
                    'status' => fake()->randomElement(['delivered', 'processing', 'pending']),
                    'delivered_at' => fake()->optional(0.7)->dateTimeBetween('-1 month', 'now'),
                ]);
            }
        }

        $this->command->info('Marketplace data seeded successfully!');
    }
}