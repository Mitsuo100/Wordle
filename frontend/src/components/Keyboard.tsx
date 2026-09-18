type Letra = {
    letra: string
    status: "correct" | "present" | "absent"
}

type KeyboardProps = {
    tentativas: Letra[][]
    carregando: boolean
    pressionarTecla: (letra: string) => void
    apagarLetra: () => void
    jogar: () => void
}

function Keyboard({
    tentativas,
    carregando,
    pressionarTecla,
    apagarLetra,
    jogar
}: KeyboardProps) {
    function obterStatusTecla(letra: string) {
        let status: "correct" | "present" | "absent" | "" = ""

        for (const tentativa of tentativas) {
            for (const item of tentativa) {
                if (item.letra.toLowerCase() !== letra.toLowerCase()) {
                    continue
                }

                if (item.status === "correct") {
                    return "correct"
                }

                if (item.status === "present") {
                    status = "present"
                }

                if (item.status === "absent" && status === "") {
                    status = "absent"
                }
            }
        }

        return status
    }

    const teclado = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"]
    ]

    return (
        <div className="teclado">
            {teclado.map((linha, index) => (
                <div className="linha-teclado" key={index}>
                    {linha.map((tecla) => {
                        const status = obterStatusTecla(tecla)

                        if (tecla === "enter") {
                            return (
                                <button
                                    type="button"
                                    className="tecla especial"
                                    onClick={jogar}
                                    disabled={carregando}
                                    key={tecla}
                                >
                                    Enter
                                </button>
                            )
                        }

                        if (tecla === "backspace") {
                            return (
                                <button
                                    type="button"
                                    className="tecla especial"
                                    onClick={apagarLetra}
                                    disabled={carregando}
                                    key={tecla}
                                >
                                    ←
                                </button>
                            )
                        }

                        return (
                            <button
                                type="button"
                                className={`tecla ${status}`}
                                onClick={() => pressionarTecla(tecla)}
                                disabled={carregando}
                                key={tecla}
                            >
                                {tecla.toUpperCase()}
                            </button>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

export default Keyboard