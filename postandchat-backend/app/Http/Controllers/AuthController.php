<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\AuthService;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
    
        $user = $this->authService->registerUser($request->validated()); 

        /** @var \PHPOpenSourceSaver\JWTAuth\JWTGuard $guard */
        $guard = Auth::guard('api');

        $token = $guard->login($user);
        $guard->setUser($user);
        return $this->respondWithToken($token);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        /** @var \PHPOpenSourceSaver\JWTAuth\JWTGuard $guard */
        $guard = Auth::guard('api');

        if (! $token = $guard->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function me()
    {
        return response()->json(Auth::guard('api')->user());
    }

    public function logout()
    {
        Auth::guard('api')->logout();

        $cookie = cookie()->forget('refresh_token');

        return response()->json(['message' => 'Successfully logged out'])->withCookie($cookie);
    }

    public function refresh(Request $request)
    {
        /** @var \PHPOpenSourceSaver\JWTAuth\JWTGuard $guard */
        $guard = Auth::guard('api');

        $refreshToken = $request->cookie('refresh_token');

        if (!$refreshToken) {
            return response()->json(['error' => 'Refresh Token missing'], 401);
        }

        try {
            $newToken = $guard->setToken($refreshToken)->refresh();
            return $this->respondWithToken($newToken);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token expired or invalid'], 401);
        }
    }

    protected function respondWithToken(string $token)
{
    /** @var \PHPOpenSourceSaver\JWTAuth\JWTGuard $guard */
    $guard = Auth::guard('api');
    $accessTokenTTL = $guard->factory()->getTTL() * 60;

    $refreshTokenTTLMinutes = 60 * 24 * 7; 

    $refreshToken = $guard->claims([
        'type' => 'refresh',
        'exp'  => time() + ($refreshTokenTTLMinutes * 60) 
    ])->tokenById($guard->user()->id);

    $cookie = cookie(
        'refresh_token',
        $refreshToken,
        $refreshTokenTTLMinutes, 
        '/',
        null,
        config('app.env') === 'production',
        true, 
        false,
        'Strict'
    );

    return response()->json([
        'access_token' => $token,
        'token_type'   => 'bearer',
        'expires_in'   => $accessTokenTTL,
        'user'         => $guard->user()
    ])->cookie($cookie);
}
}