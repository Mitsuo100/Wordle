import random

bd = ["python", "java", "c", "c#", "c++", "lua"]

palavra = random.choice(bd)

def interface():
    print("Adivinhe a palavra:")
    print("_" * len(palavra))
    print("\a")
    return
    
interface()

acertou = False

while acertou == False:
    resultado = ""
    palavra_temp = list(palavra)
    
    print("\a")
    
    palpite = input("Qual seu palpite? \a").lower()
    
    if palpite == palavra:
        print("Acertou!")
        acertou = True
    
    else:
      for pos, letra in enumerate(palpite):
       if len(palavra) != len(palpite):
          print(f"A palavra tem {len(palavra)} letras!")
          break
       elif letra == palavra[pos]:
          resultado += letra
          palavra_temp[pos] = None
       elif letra in palavra_temp:
           resultado += "*"
           palavra_temp[palavra_temp.index(letra)] = None
       else:
           resultado += "_"
           
    print(resultado)
