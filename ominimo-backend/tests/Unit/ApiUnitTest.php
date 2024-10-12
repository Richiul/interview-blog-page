<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApiUnitTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_fetch_all_posts()
    {
        User::factory()->create();
        Post::factory()->count(3)->create();

        $response = $this->get('/api/posts');

        $response->assertStatus(200);
        $this->assertCount(3, $response->json());
    }

    /** @test */
    public function it_can_fetch_a_single_post()
    {
        User::factory()->create();
        $post = Post::factory()->create();

        $response = $this->get("/api/posts/{$post->id}");

        $response->assertStatus(200);
        $response->assertJson(['id' => $post->id]);
    }

    /** @test */
    public function it_fails_to_fetch_a_non_existent_post()
    {

        $response = $this->get("/api/posts/999");

        $response->assertStatus(404); // Expecting not found status
    }

    /** @test */
    public function it_can_create_a_comment()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();

        $this->actingAs($user);

        $response = $this->post("/api/posts/{$post->id}/comments", [
            'user_id' => $user->id,
            'post_id' => $post->id,
            'comment' => 'This is a comment',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('comments', [
            'comment' => 'This is a comment',
            'post_id' => $post->id,
            'user_id' => $user->id,
        ]);
    }

    /** @test */
    public function it_fails_to_create_a_comment_with_invalid_data()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();

        $this->actingAs($user);

        $response = $this->postJson("/api/posts/{$post->id}/comments", [
            'comment' => '',
            'user_id' => $user->id,
        ]);

        $response->assertStatus(422);
    }
}
