def verificar_palpite(palavra, palpite):
    palavra = palavra.lower()
    palpite = palpite.lower()

    if len(palpite) != len(palavra):
        return None

    resultado = [
        {
            "letra": letra,
            "status": "absent"
        }
        for letra in palpite
    ]

    palavra_temp = list(palavra)

    for pos, letra in enumerate(palpite):
        if letra == palavra[pos]:
            resultado[pos]["status"] = "correct"
            palavra_temp[pos] = None

    for pos, letra in enumerate(palpite):
        if resultado[pos]["status"] == "correct":
            continue

        if letra in palavra_temp:
            resultado[pos]["status"] = "present"
            palavra_temp[palavra_temp.index(letra)] = None

    return resultado