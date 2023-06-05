<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'created_at' => $this->created_at->diffForHumans(),
            'author' => [
                'name' => $this->author->name,
                'gravatar' => $this->author->gravatar(100),
            ],
            'children' => CommentResource::collection($this->children),
        ];
    }
}
