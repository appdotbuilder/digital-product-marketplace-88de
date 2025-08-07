<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductInventory>
 */
class ProductInventoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $credentials = [
            "Email: {$this->faker->email}\nPassword: {$this->faker->password(12)}",
            "Username: {$this->faker->userName}\nPassword: {$this->faker->password(12)}\nAccess Code: {$this->faker->numerify('######')}",
            "Account ID: {$this->faker->uuid}\nLogin: {$this->faker->userName}\nPassword: {$this->faker->password(12)}",
            "API Key: {$this->faker->sha256}\nSecret: {$this->faker->sha1}",
        ];

        return [
            'product_id' => Product::factory(),
            'credentials' => $this->faker->randomElement($credentials),
            'is_used' => false,
            'order_id' => null,
            'assigned_at' => null,
        ];
    }

    /**
     * Indicate that the inventory item is used.
     */
    public function used(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_used' => true,
            'assigned_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ]);
    }
}