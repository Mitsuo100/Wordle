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


def mostrar_interface(tamanho):
    print("Adivinhe a palavra:")
    print("_" * tamanho)
    print("\a")


def verificar_palpite(palavra, palpite):
    global erros
    resultado = ""
    palavra_temp = list(palavra)

    if len(palavra) != len(palpite):
        return f"A palavra tem {len(palavra)} letras!"

    for pos, letra in enumerate(palpite):
        if letra == palavra[pos]:
            resultado += letra
            palavra_temp[pos] = None

        elif letra in palavra_temp:
            resultado += "*"
            palavra_temp[palavra_temp.index(letra)] = None

        else:
            resultado += "_"
            
        
    erros += 1
    return resultado


def jogo():
    global erros
    erros = 0
    palavra = escolher_palavra()

    mostrar_interface(len(palavra))

    while True:
        palpite = input("Qual seu palpite? ").lower()

        if palpite == palavra:
            print("Acertou!")
            break

        resultado = verificar_palpite(palavra, palpite)
        print(resultado)
        print(f"Erros: {erros}")

def menu():
    while True:
        print("\n=== Jogo de Palavras ===\n")
        print("1 - Jogar\n")
        print("2 - Sair\n")
        
        opcao = input("")
        
        if opcao == "1":
            jogo()
            
        elif opcao == "2":
            print("Até mais!")
            break
        
        else:
            print("Opção inválida")

menu()
