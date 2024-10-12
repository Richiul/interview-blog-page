<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommentRequest $request, $id)
    {
        $post = Post::findOrFail($id);
        $comment = Comment::create([
            'comment' => $request->comment,
            'user_id' => Auth::id(),
            'post_id' => $post->id,
        ]);

        return response()->json($comment, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        $this->authorize('delete', $comment);

        $comment->delete();

        return response()->json(null, 204);
    }
}
