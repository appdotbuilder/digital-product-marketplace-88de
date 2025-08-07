<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantity = $this->faker->numberBetween(1, 3);
        $unitPrice = $this->faker->randomFloat(2, 10, 200);
        
        return [
            'order_number' => 'ORD-' . date('Y') . '-' . $this->faker->unique()->numberBetween(100000, 999999),
            'user_id' => User::factory(),
            'product_id' => Product::factory(),
            'quantity' => $quantity,
            'unit_price' => $unitPrice,
            'total_price' => $unitPrice * $quantity,
            'status' => $this->faker->randomElement(['pending', 'processing', 'delivered', 'refunded']),
            'delivered_at' => $this->faker->optional(0.7)->dateTimeBetween('-1 month', 'now'),
            'warranty_expires_at' => $this->faker->optional(0.5)->dateTimeBetween('now', '+3 months'),
            'delivery_notes' => $this->faker->optional(0.3)->sentence(),
        ];
    }
}