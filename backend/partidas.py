import uuid

from palavras import escolher_palavra


partidas = {}


def criar_partida():
    game_id = str(uuid.uuid4())

    partidas[game_id] = {
        "palavra": escolher_palavra(),
        "tentativas": 0,
        "finalizado": False
    }

    return game_id


def buscar_partida(game_id):
    return partidas.get(game_id)