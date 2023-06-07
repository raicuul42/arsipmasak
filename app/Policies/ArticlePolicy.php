<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\Enums\ArticleStatus;
use App\Models\User;

class ArticlePolicy
{
    public function view(?User $user, Article $article): bool
    {
        return $article->status === ArticleStatus::Published || $user?->id === $article->author_id;
    }

    public function update(User $user, Article $article): bool
    {
        return $user->can('update article') && $user->id === $article->author_id;
    }

    public function delete(User $user, Article $article): bool
    {
        return $user->can('delete article');
    }

    public function publish(User $user, Article $article): bool
    {
        return $user->can('publish article');
    }
}
