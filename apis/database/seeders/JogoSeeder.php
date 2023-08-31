<?php

namespace Database\Seeders;

use App\Models\Jogo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JogoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Jogo::create([
            'name' => 'ele mesmo',
            'year' => '2007',
            'teste' => 'teste'
        ]);
    }
}
