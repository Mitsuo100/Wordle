import random


BANCO_PALAVRAS = ["python", "java", "c", "c#", "c++", "lua"]


def escolher_palavra():
    return random.choice(BANCO_PALAVRAS)


def mostrar_interface(tamanho):
    print("Adivinhe a palavra:")
    print("_" * tamanho)
    print("\a")


def verificar_palpite(palavra, palpite):
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

    return resultado


def jogo():
    palavra = escolher_palavra()

    mostrar_interface(len(palavra))

    while True:
        palpite = input("Qual seu palpite? ").lower()

        if palpite == palavra:
            print("Acertou!")
            break

        resultado = verificar_palpite(palavra, palpite)
        print(resultado)

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
            "Opção inválida"

menu()
