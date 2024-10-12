<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::addRoute('GET', '/posts', 'App\Http\Controllers\PostController@index');

Route::addRoute('GET', '/posts/{id}', 'App\Http\Controllers\PostController@show');

Route::addRoute('POST', 'posts/{id}/comments', 'App\Http\Controllers\CommentController@store');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::addRoute('POST', '/posts', 'App\Http\Controllers\PostController@store');

    Route::addRoute('PUT', '/posts/{id}', 'App\Http\Controllers\PostController@update');

    Route::addRoute('DELETE', '/posts/{id}', 'App\Http\Controllers\PostController@destroy');

    Route::addRoute('DELETE', '/comments/{id}', 'App\Http\Controllers\CommentController@destroy');
});
