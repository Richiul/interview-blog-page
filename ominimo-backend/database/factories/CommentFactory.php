<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition()
    {

        $postId = Post::all()->random()->id;
        $userId = User::all()->random()->id;
        return [
            'comment' => $this->faker->sentence,
            'post_id' => $postId,
            'user_id' => $userId,
        ];
    }
}
