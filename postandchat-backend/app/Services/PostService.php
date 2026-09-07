<?php

namespace App\Services;
use App\Models\Post;
class PostService
{
public function uploadPost(array $data): Post
{
    return Post::create([
        'body'     => $data['body'],
        'user_id' => $data['user_id'],
        'type'    =>  $data['type'],
    ]);
}
public function updatePost(Post $posts, array $data): Post
    {
        $posts->update([
            'body' => $data['body'],
            'type' => $data['type'],
        ]);

        return $posts->fresh();
    }
}

