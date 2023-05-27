<?php

namespace App\Models\Enums;

enum ArticleStatus: int
{
    case Draft = 1;
    case Published = 2;
    case Archived = 3;
}
