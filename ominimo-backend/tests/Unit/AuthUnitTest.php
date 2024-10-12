<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthUnitTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_validates_registration_data()
    {
        $data = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ];

        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $this->assertFalse($validator->fails());
    }

    /** @test */
    public function it_fails_registration_with_invalid_data()
    {
        $data = [
            'name' => '',
            'email' => 'invalid-email',
            'password' => 'password',
            'password_confirmation' => 'different_password',
        ];

        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $this->assertTrue($validator->fails());
    }

    /** @test */
    public function it_hashes_password_on_registration()
    {
        $user = User::factory()->create([
            'password' => 'password',
        ]);

        $this->assertTrue(Hash::check('password', $user->password));
    }

    /** @test */
    public function it_authenticates_user_with_correct_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $credentials = ['email' => 'test@example.com', 'password' => 'password'];

        $this->assertTrue(auth()->attempt($credentials));
    }

    /** @test */
    public function it_fails_authentication_with_incorrect_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $credentials = ['email' => 'test@example.com', 'password' => 'wrong_password'];

        $this->assertFalse(auth()->attempt($credentials));
    }
}
