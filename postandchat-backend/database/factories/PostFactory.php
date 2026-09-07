<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'body' =>$this->faker->paragraph,
            'user_id' => $this->faker->numberBetween(1,4),
             'type'  =>$this->faker->randomElement(['text', 'media',]),
        ];
    }
}
