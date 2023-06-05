<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('spam_comments', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('comment_id')->constrained()->cascadeOnDelete();
            $table->string('reason');
            $table->timestamps();
            $table->primary(['user_id', 'comment_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('spam_comments');
    }
};
