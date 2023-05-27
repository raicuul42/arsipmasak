<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            [
                'title' => $title = 'Cara menggunakan seeder Laravel',
                'slug' => str($title)->slug(),
                'excerpt' => 'Laravel menyertakan kemampuan untuk menyemai basis data Anda dengan data menggunakan kelas benih.',
                'body' => 'Laravel menyertakan kemampuan untuk menyemai basis data Anda dengan data menggunakan kelas benih.',
                'status' => 2,
                'category_id' => 2,
            ],
            [
                'title' => $title = 'Apakah Lorem Ipsum itu?',
                'slug' => str($title)->slug(),
                'excerpt' => 'Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting',
                'body' => 'Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting',
                'status' => 2,
                'category_id' => 1,
            ],
        ])->each(fn ($article) => \App\Models\Article::query()->create($article));
    }
}
