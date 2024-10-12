<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApiFeatureTest extends TestCase
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
    public function it_can_create_a_comment()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();

        $this->actingAs($user);

        $response = $this->post("/api/posts/{$post->id}/comments", [
            'comment' => 'This is a comment',
            'user_id' => $user->id,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('comments', [
            'comment' => 'This is a comment',
            'post_id' => $post->id,
            'user_id' => $user->id,
        ]);
    }

    /** @test */
    public function it_can_create_a_post()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $response = $this->post('/api/posts', [
            'title' => 'New Post',
            'content' => 'This is the body of the post',
            'user_id' => $user->id,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('posts', [
            'title' => 'New Post',
            'content' => 'This is the body of the post',
            'user_id' => $user->id,
        ]);
    }

    /** @test */
    public function it_can_update_a_post()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->put("/api/posts/{$post->id}", [
            'title' => 'Updated Post',
            'content' => 'This is the updated body of the post',
            'user_id' => $user->id,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'title' => 'Updated Post',
            'content' => 'This is the updated body of the post',
            'user_id' => $user->id,
        ]);
    }

    /** @test */
    public function it_fails_to_update_a_post_without_permission()
    {
        $user = User::factory()->create();
        $anotherUser = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $anotherUser->id]);

        $this->actingAs($user);

        $response = $this->put("/api/posts/{$post->id}", [
            'title' => 'Updated Post',
            'content' => 'This is the updated body of the post',
            'user_id' => $user->id,
        ]);

        $response->assertStatus(403);
    }

    /** @test */
    public function it_can_delete_a_post()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->delete("/api/posts/{$post->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('posts', [
            'id' => $post->id,
        ]);
    }

    /** @test */
    public function it_fails_to_delete_a_post_without_permission()
    {
        $user = User::factory()->create();
        $anotherUser = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $anotherUser->id]);

        $this->actingAs($user);

        $response = $this->delete("/api/posts/{$post->id}");

        $response->assertStatus(403);
    }

    /** @test */
    public function it_can_delete_a_comment()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id]);
        $comment = Comment::factory()->create(['post_id' => $post->id, 'user_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->delete("/api/comments/{$comment->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('comments', [
            'id' => $comment->id,
        ]);
    }

    /** @test */
    public function it_fails_to_delete_a_comment_without_permission()
    {
        $user = User::factory()->create();
        $anotherUser = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $anotherUser->id]);
        $comment = Comment::factory()->create(['post_id' => $post->id, 'user_id' => $anotherUser->id]);

        $this->actingAs($user);

        $response = $this->delete("/api/comments/{$comment->id}");

        $response->assertStatus(403);
    }
}
