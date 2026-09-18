from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from jogo import verificar_palpite
from partidas import criar_partida, buscar_partida

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def home():
    return {
        "message": "Wordle API funcionando"
    }


@app.post("/game")
def new_game():
    game_id = criar_partida()

    return {
        "game_id": game_id
    }


@app.get("/game/{game_id}")
def get_game(game_id: str):
    partida = buscar_partida(game_id)

    if partida is None:
        raise HTTPException(
            status_code=404,
            detail="Partida não encontrada"
        )

    return {
        "tentativas": partida["tentativas"],
        "finalizado": partida["finalizado"]
    }


@app.post("/game/{game_id}/guess")
def guess(game_id: str, palpite: str):
    partida = buscar_partida(game_id)

    if partida is None:
        raise HTTPException(
            status_code=404,
            detail="Partida não encontrada"
        )

    if partida["finalizado"]:
        raise HTTPException(
            status_code=400,
            detail="Partida já finalizada"
        )

    resultado = verificar_palpite(
        partida["palavra"],
        palpite
    )

    if resultado is None:
        raise HTTPException(
            status_code=400,
            detail="O palpite deve ter 5 letras"
        )

    partida["tentativas"] += 1

    acertou = palpite.lower() == partida["palavra"].lower()

    if acertou:
        partida["finalizado"] = True

    return {
        "resultado": resultado,
        "acertou": acertou,
        "tentativas": partida["tentativas"],
        "finalizado": partida["finalizado"]
    }