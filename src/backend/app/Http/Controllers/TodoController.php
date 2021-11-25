<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TodoController extends Controller
{

    public function fetchTodos() {
      header("Access-Control-Allow-Origin: *");
      $todos = DB::table('todos')
        ->select('id' ,'name', 'status')
        ->get();
      return json_decode($todos);
    }

    public function pushTodo(Request $request) {
      header("Access-Control-Allow-Origin: *");
      $todo = new Todo();
      $todo->name = $request->input('name');
      $todo->status = $request->input('status');
      $todo->save();
    }

    public function changeStatus(Request $request) {
      header("Access-Control-Allow-Origin: *");
      $id = (int) $request->input('id');
      $todo = Todo::find($id);
      $todo->status = $request->input('status');
      $todo->save();
    }


    public function deleteTodo(Request $request) {
      header("Access-Control-Allow-Origin: *");
      $id = (int) $request->input('id');
      $todo = Todo::find($id);
      $todo->delete();
    }
}