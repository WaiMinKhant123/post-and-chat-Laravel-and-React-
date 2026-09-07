<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'body',
        'user_id',
        'type',
    ];
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function media():MorphMany
    {
        return $this->morphMany(Media::class,'mediaable');
    }
}
