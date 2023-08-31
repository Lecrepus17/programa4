<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Jogo;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class JogosController extends Controller
{
    public function __construct(
        protected Jogo $repository,
    ) {

    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:jogos',
            'year' => 'required|integer',
            'teste' => 'string',
        ]);

        $game = Jogo::create($data);

        return response()->json([
            'message' => '(Jogo criado com sucesso',
            'game' => $game
        ]);
    }
    public function show(string $id) {
        $game = $this->repository->findOrFail($id);

        return response()->json([
            'game' => $game
        ]);
    }
    public function update(Jogo $jogo, Request $request){

        $data = $request->validate([
            'name' => 'string|max:255', Rule::unique('jogos')->ignore($jogo['id']),
            'year' => 'integer',
            'teste' => 'string',
        ]);

        $jogo->update($data);

        return response()->json([
            'message' => '(Jogo atualizado com sucesso',
            'game' => $jogo
        ]);
    }
    public function destroy (string $id){
        $jogo = $this->repository->findOrFail($id);
        $jogo->delete();

        return response()->json([
            'message' => '(Jogo deletado com sucesso',
        ]);
    }
}
