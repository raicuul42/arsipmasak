<?php

namespace App\Models;

use App\Models\Enums\ArticleStatus;
use Coderflex\Laravisit\Concerns\CanVisit;
use Coderflex\Laravisit\Concerns\HasVisits;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Storage;

class Article extends Model implements CanVisit
{
    use HasFactory, HasVisits;

    protected $guarded = [];

    protected $casts = [
        'status' => ArticleStatus::class,
        'published_at' => 'datetime',
        'scheduled_at' => 'datetime',
    ];

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
        return $this->thumbnail !== null ? Storage::url($this->thumbnail) : 'https://placehold.co/' . $size . '/1F2937/FFFFFF/?font=lato&text=No+Image+Available';
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function scopeTrending($query)
    {
        return $query->withCount('comments')->orderBy('comments_count', 'desc');
    }

    public function likes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function scopeSearchTerm($query, string $terms = null): void
    {
        collect(str_getcsv($terms, ' ', '"'))
            ->filter()
            ->each(function ($term) use ($query) {
                $term = '%' . $term . '%';
                $query->where('title', 'like', $term)
                    ->orWhere('excerpt', 'like', $term);
            });
    }

    public function scopeFilter($query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'REGEXP', $search)
                    ->orWhere('excerpt', 'REGEXP', $search);
            });
        })->when($filters['status'] ?? null, function ($query, $item) {
            match ($item) {
                'draft' => $query->where('status', ArticleStatus::Draft),
                'published' => $query->where('status', ArticleStatus::Published),
                'scheduled' => $query->where('status', ArticleStatus::Scheduled),
                'archived' => $query->where('status', ArticleStatus::Archived),
                default => $query,
            };
        })->when($filters['category'] ?? null, fn ($query, $item) => $query->whereRelation('category', 'slug', $item))
            ->when($filters['user'] ?? null, fn ($query, $item) => $query->where('author_id', $item));
    }
}
