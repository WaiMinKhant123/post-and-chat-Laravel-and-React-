<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Media extends Model
{
    protected $fillable = [
        'file_path',
        'file_type',
        'public_id',
        'mediaable_id',
        'mediaable_type',
    ];
    public function mediaable():MorphTo
    {
        return $this->morphTo();
    }
}
