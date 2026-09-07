<?php

namespace App\Http\Controllers;

use App\Http\Requests\MediaRequest;
use App\Models\Post;
use App\Models\Media;
use App\Services\MediaService;
use Illuminate\Http\Request;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class MediaController extends Controller
{   
    protected MediaService $mediaService;
    public function __construct(MediaService $mediaService)
    {
        $this->mediaService=$mediaService;
    }
    public function index()
    {
        
    }

    public function store(MediaRequest $request,Post $post)
    {
        $mediaItems = [];
        foreach($request->file('media',[]) as $file){
            $mediaItems[] = $this->mediaService->uploadMedia(
            $file,
            Post::class,
            $post->id
        );
        }
        return response()->json([
        'message' => 'Media uploaded successfully',
        'data' => $mediaItems,
        'id' =>$post,
        'req' =>$request,
    ], 201);
    }

    public function show(string $id)
    {
        //
    }

    public function update(MediaRequest $request,Post $post,string $id)
    {  
        $media=Media::findOrFail($id);
        
    }

    public function destroy(Media $media)
    {
        Cloudinary::uploadApi()->destroy(
        $media->public_id,
        [
            'resource_type' => $media->resource_type ?? 'image',
        ]
    );
     $media->delete();
     return response()->json([
        'message' => 'Media deleted successfully',
    ],200);
    }
}
