<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthFeatureTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_register_a_user()
    {
        $response = $this->postJson('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
        ]);
    }

    /** @test */
    public function it_fails_to_register_a_user_with_invalid_data()
    {
        $response = $this->postJson('/register', [
            'name' => '',
            'email' => 'invalid-email',
            'password' => 'password',
            'password_confirmation' => 'different_password',
        ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function it_can_login_a_user()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson('/login', [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        $this->assertAuthenticatedAs($user);
    }

    /** @test */
    public function it_fails_to_login_with_invalid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson('/login', [
            'email' => 'test@example.com',
            'password' => 'wrong_password',
        ]);

        $response->assertStatus(422);
        $this->assertGuest();
    }

    /** @test */
    public function it_can_logout_a_user()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $response = $this->postJson('/logout');

        $response->assertStatus(200);
        $this->assertGuest();
    }

    /** @test */
    public function it_fails_to_logout_when_not_authenticated()
    {
        $response = $this->postJson('/logout');

        $response->assertStatus(401);
    }
}
