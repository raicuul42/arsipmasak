<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleBlockResource;
use App\Models\Article;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $articles = Article::query()
            ->with('author', 'category')
            ->latest()
            ->paginate(9);

        return inertia('Home', [
            'articles' => ArticleBlockResource::collection($articles),
        ]);
    }
}
