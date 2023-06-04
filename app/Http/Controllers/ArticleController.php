<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleBlockResource;
use App\Http\Resources\ArticleSingleResource;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::query()
            ->select('id', 'title', 'slug', 'excerpt', 'created_at', 'author_id', 'category_id')
            ->with('author', 'category')
            ->latest()
            ->paginate(9);

        return inertia('Home', [
            'articles' => ArticleBlockResource::collection($articles),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        $article->visit()->hourlyIntervals()->withIp()->withSession()->withUser();

        return inertia('Articles/Show', [
            'article' => new ArticleSingleResource($article->load('author', 'category')),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }

    public function popular($key)
    {
        match ($key) {
            'week' => $articles = Article::query()->with('author', 'category')->popularThisWeek()->paginate(9),
            'month' => $articles = Article::query()->with('author', 'category')->popularThisMonth()->paginate(9),
            'year' => $articles = Article::query()->with('author', 'category')->popularThisYear()->paginate(9),
            'all-time' => $articles = Article::query()->with('author', 'category')->popularAllTime()->paginate(9),
        };

        return inertia('Articles/Index', [
            'articles' => ArticleBlockResource::collection($articles),
        ]);
    }
}
