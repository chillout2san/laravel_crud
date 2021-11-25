<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class TodosTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('todos')->insert(
            [
                [
                    'name' => '買い物',
                    'status' => '作業中'
                ],
                [
                    'name' => '料理',
                    'status' => '作業中'
                ],
                [
                    'name' => '洗濯',
                    'status' => '作業中'
                ]
            ]
        );
    }
}