<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\Enums\ArticleStatus;
use Illuminate\Console\Command;

class PublishArticleCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:publish-article';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Published the article.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        Article::query()
            ->where('status', ArticleStatus::Scheduled)
            ->where('scheduled_at', '>=', now())
            ->update([
                'status' => ArticleStatus::Published,
                'published_at' => now(),
            ]);
    }
}
