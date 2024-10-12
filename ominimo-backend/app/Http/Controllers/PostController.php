<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostsResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::latest()->get();
        // dd($posts);
        return PostsResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        $post = Post::create($request->validated());
        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = Post::findOrFail($id);

        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, $id)
    {
        $post = Post::findOrFail($id);

        $this->authorize('update', $post);

        $post->update($request->validated());

        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $this->authorize('delete', $post);

        $post->delete();

        return response()->noContent();
    }
}
