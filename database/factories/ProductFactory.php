<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['downloadable', 'non_downloadable'];
        $type = $this->faker->randomElement($types);
        
        $products = [
            'downloadable' => [
                'PDF Business Templates Pack',
                'WordPress Theme Bundle',
                'Stock Photo Collection',
                'Digital Marketing Course',
                'UI/UX Design Kit',
                'Programming Ebook Series',
                'Video Editing Templates',
                'Logo Design Pack',
            ],
            'non_downloadable' => [
                'Netflix Premium Account',
                'Spotify Premium Subscription',
                'VPN Service Access',
                'Cloud Storage Account',
                'Gaming Account Boost',
                'Social Media Management Tool',
                'SEO Tool Access',
                'Email Marketing Credits',
            ]
        ];

        $title = $this->faker->randomElement($products[$type]);

        return [
            'title' => $title,
            'description' => $this->faker->paragraph(3),
            'image' => null,
            'price' => $this->faker->randomFloat(2, 5, 500),
            'stock_quantity' => $type === 'downloadable' ? $this->faker->numberBetween(50, 1000) : 0,
            'warranty_days' => $type === 'non_downloadable' ? $this->faker->numberBetween(7, 90) : 0,
            'type' => $type,
            'download_file' => $type === 'downloadable' ? $this->faker->uuid . '.zip' : null,
            'is_active' => true,
        ];
    }
}