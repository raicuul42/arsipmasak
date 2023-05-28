<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Article extends Model
{
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getPicture($size = 400): string
    {
        return $this->thumbnail !== null ? Storage::url($this->thumbnail) : 'https://placehold.co/' . $size . '/1F2937/FFFFFF/?font=lato&text=1800 x 945';
    }
}
