<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleRequest;
use App\Http\Resources\ArticleBlockResource;
use App\Http\Resources\ArticleListResource;
use App\Http\Resources\ArticleSingleResource;
use App\Models\Article;
use App\Models\Category;
use App\Models\Enums\ArticleStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    /**
     * Define the middleware.
     */
    public function __construct()
    {
        $this->middleware('can:create article')->except(['index', 'show', 'filter', 'search']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::query()
            ->select('id', 'title', 'slug', 'excerpt', 'thumbnail', 'published_at', 'author_id', 'category_id', 'status')
            ->with('author', 'category')
            ->whereStatus(ArticleStatus::Published)
            ->latest()
            ->paginate(9);

        return inertia('articles/index', [
            'articles' => ArticleBlockResource::collection($articles)->additional([
                'meta' => [
                    'has_pages' => $articles->hasPages(),
                ],
            ]),

            'params' => [
                'title' => 'Latest Articles',
                'subtitle' => 'The latest articles from our blog.',
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('articles/form', [
            'article' => new Article,
            'statuses' => collect(ArticleStatus::cases())->map(fn ($status) => [
                'value' => $status->value,
                'label' => $status->label($status),
            ]),
            'categories' => Category::select('id', 'name')->get()->map(fn ($c) => [
                'value' => $c->id,
                'label' => $c->name,
            ]),
            'page_settings' => [
                'method' => 'post',
                'url' => route('articles.store'),
                'submit_text' => 'Create',
                'title' => 'Create new Article',
                'subtitle' => 'Grow your audience by creating the best articles.',
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticleRequest $request)
    {
        $article = $request->user()->articles()->create([
            'thumbnail' => $request->hasFile('thumbnail') ? $request->file('thumbnail')->store('articles') : null,
            'title' => $title = $request->string('title'),
            'slug' => str($title . '-' . str()->random()),
            'excerpt' => $request->string('excerpt'),
            'body' => $request->string('body'),
            'status' => $status = $request->enum('status', ArticleStatus::class) ?? ArticleStatus::Draft,
            'category_id' => $request->integer('category'),
            'published_at' => $status === ArticleStatus::Published ? now() : null,
            'scheduled_at' => $status === ArticleStatus::Scheduled ? $request->scheduled_at : null,
        ]);

        flashMessage('Created!', 'Successfully created article!');

        return to_route('articles.show', $article);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        $this->authorize('view', $article);
        $article->visit()->hourlyIntervals()->withIp()->withSession()->withUser();

        return inertia('articles/show', [
            'article' => new ArticleSingleResource($article->load('author', 'category')),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        $this->authorize('update', $article);

        return inertia('articles/form', [
            'article' => $article,
            'statuses' => collect(ArticleStatus::cases())->map(fn ($status) => [
                'value' => $status->value,
                'label' => $status->label($status),
            ]),
            'categories' => Category::select('id', 'name')->get()->map(fn ($c) => [
                'value' => $c->id,
                'label' => $c->name,
            ]),
            'page_settings' => [
                'method' => 'put',
                'url' => route('articles.update', $article),
                'submit_text' => 'Update',
                'title' => $article->title,
                'subtitle' => 'Grow your audience by creating the best articles.',
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleRequest $request, Article $article)
    {
        $this->authorize('update', $article);
        $article->update([
            'title' => $title = $request->string('title'),
            'slug' => str($title . '-' . str()->random())->slug(),
            'excerpt' => $request->string('excerpt'),
            'body' => $request->string('body'),
            'status' => $status = $request->enum('status', ArticleStatus::class) ?? ArticleStatus::Draft,
            'category_id' => $request->integer('category'),
            'published_at' => $status === ArticleStatus::Published ? now() : null,
            'scheduled_at' => $status === ArticleStatus::Scheduled ? $request->scheduled_at : null,
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($article->thumbnail) {
                Storage::delete($article->thumbnail);
            }

            $thumbnail = $request->file('thumbnail')->store('articles');
        } else {
            $thumbnail = $article->thumbnail;
        }

        $article->update(['thumbnail' => $thumbnail]);

        return to_route('articles.show', $article);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $this->authorize('delete', $article);
        if ($article->thumbnail) {
            Storage::delete($article->thumbnail);
        }
        $article->delete();

        return back();
    }

    /**
     * Publish the specified resource.
     */
    public function publish(Article $article)
    {
        $this->authorize('publish', $article);

        $article->update([
            'status' => ArticleStatus::Published,
            'published_at' => now(),
        ]);

        return back();
    }

    public function search(Request $request)
    {
        $articles = Article::query()
            ->select('id', 'title', 'slug', 'excerpt', 'thumbnail', 'published_at', 'author_id', 'category_id', 'status')
            ->searchTerm($request->search)
            ->with('author', 'category')
            ->whereStatus(ArticleStatus::Published)
            ->latest()
            ->paginate(9);

        return inertia('articles/index', [
            'articles' => fn () => ArticleBlockResource::collection($articles)->additional([
                'meta' => [
                    'has_pages' => $articles->hasPages(),
                ],
            ]),

            'params' => [
                'title' => 'Search results',
                'subtitle' => 'You are searching for: "' . $request->search . '" return ' . $articles->count() . ' ' . str()->plural('result', $articles->count()) . '.',
            ],
        ]);
    }

    /*
     * Display a listing of the resource.
     */
    public function list(Request $request)
    {
        $only = ['search', 'status', 'category'];
        $articles = Article::query()
            ->with('author', 'category')
            ->when(!$request->user()->hasRole('admin'), fn ($query) => $query->whereBelongsTo($request->user(), 'author'))
            ->filter($request->only([...$only, 'user']))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return inertia('articles/list', [
            'filters' => [
                'categories' => fn () => Category::select(['slug', 'name'])->get()->map(fn ($i) => [
                    'value' => $i->slug,
                    'label' => $i->name,
                ]),

                'statuses' => fn () => collect(ArticleStatus::cases())->map(fn ($i) => [
                    'value' => strtolower($i->name),
                    'label' => $i->name,
                ]),

                'users' => fn () => User::select(['id', 'name'])->whereHas('articles')->get()->map(fn ($i) => [
                    'value' => $i->id,
                    'label' => $i->name,
                ]),

                'state' => $request->only([...$only, 'page']),
            ],

            'articles' => fn () => ArticleListResource::collection($articles)->additional([
                'meta' => [
                    'has_pages' => $articles->hasPages(),
                ],
            ]),
        ]);
    }

    /**
     * Display a listing of the popular resource.
     */
    public function filter($key)
    {
        match ($key) {
            'week' => $articles = Article::query()->with('author', 'category')->popularThisWeek()->paginate(9),
            'month' => $articles = Article::query()->with('author', 'category')->popularThisMonth()->paginate(9),
            'year' => $articles = Article::query()->with('author', 'category')->popularThisYear()->paginate(9),
            'all-time' => $articles = Article::query()->with('author', 'category')->popularAllTime()->paginate(9),
            default => abort(404),
        };

        $params = match ($key) {
            'week' => [
                'title' => 'Popular This Week',
                'subtitle' => 'The most popular articles this week.',
            ],
            'month' => [
                'title' => 'Popular This Month',
                'subtitle' => 'The most popular articles this month.',
            ],
            'year' => [
                'title' => 'Popular This Year',
                'subtitle' => 'The most popular articles this year.',
            ],
            'all-time' => [
                'title' => 'Popular All Time',
                'subtitle' => 'The most popular articles of all time.',
            ],
        };

        return inertia('articles/index', [
            'articles' => ArticleBlockResource::collection($articles),
            'params' => $params,
        ]);
    }
}
