<?php

Route::get('fetch_todos', 'TodoController@fetchTodos');
Route::post('push_todo', 'TodoController@pushTodo');
Route::post('change_status', 'TodoController@changeStatus');
Route::post('delete_todo', 'TodoController@deleteTodo');
