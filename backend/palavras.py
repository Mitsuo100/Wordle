import random

BANCO_PALAVRAS = [
    "cobra",
    "pizza",
    "fatia",
    "arroz",
    "zanni",
    "manga",
    "livro",
    "folha",
    "pedra",
    "nuvem",
    "praia",
    "areia",
    "carta",
    "sonho",
    "verde",
    "preto",
    "bravo",
    "amigo",
    "veloz",
    "feliz",
    "clube",
    "caixa",
    "porta",
    "vinho",
    "fruta",
    "limao",
    "festa",
    "vento",
    "barco",
    "trigo",
    "campo",
    "radio",
    "tenis",
    "piano",
    "metro",
    "mundo",
    "cacto",
    "pente",
    "tigre",
    "zebra"
]


def escolher_palavra():
    return random.choice(BANCO_PALAVRAS)