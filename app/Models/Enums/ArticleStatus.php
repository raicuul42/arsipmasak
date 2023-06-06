<?php

namespace App\Models\Enums;

enum ArticleStatus: int
{
    case Draft = 1;
    case Published = 2;
    case Scheduled = 3;
    case Archived = 4;

    public function label($status): string
    {
        return match ($status) {
            self::Draft => 'Draft',
            self::Published => 'Published',
            self::Scheduled => 'Scheduled',
            self::Archived => 'Archived',
            default => 'Unknown',
        };
    }
}
