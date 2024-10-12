<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    protected $withoutWrapping = true;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'comment' => $this->comment,
            'user_id' => $this->user_id,
            'post_id' => $this->post_id,
            'user_name' => isset($this->user) ? $this->user->name : null,
        ];
    }
}
