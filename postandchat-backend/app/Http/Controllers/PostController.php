<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Models\Media;
use App\Services\PostService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;


class PostController extends Controller
{
    protected PostService $postService;
    public function __construct(PostService $postService)
    {
        $this->postService=$postService;
    }
    public function index(Request $request)
    {
        $perPage =min($request->integer('per_page',20),50);
        $posts=Post::with(['user','media'])
                  ->orderByDesc('id')
                  ->cursorPaginate($perPage);
        return $posts;
    
    }

   
    public function store(PostRequest $request)
    {
       Gate::authorize('create', Post::class);
       $posts=$this->postService->uploadPost($request->validated());

       return response()->json([
        'message'=>'Post created successfully',
        'data'=>$posts,
       ],201);
    }

    public function show(string $id)
    {
        $posts=Post::with(['user','media'])
        ->findOrFail($id);
        return $posts;
    }

    public function update(PostRequest $request, Post $post)
    {    
         Gate::authorize('update',Post::class);
         $posts=$this->postService->updatePost($post,$request->validated());

       return response()->json([
        'message'=>'Post edited successfully',
        'data'=>$posts,
       ],200);

    }

    
    public function destroy(Post $post)
    {
        Gate::authorize('delete',$post);
         
         $post->delete();
        return response()->json([
       'message'=>'Post deleted successfully'
       ],200);
    }
}
