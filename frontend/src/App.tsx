import { useEffect, useRef, useState } from "react"
import { criarPartida, enviarPalpite } from "./api/requests"
import Board from "./components/Board"
import Keyboard from "./components/Keyboard"
import GameMessage from "./components/GameMessage"

type Letra = {
    letra: string
    status: "correct" | "present" | "absent"
}

function App() {
    const [, setGameId] = useState("")
    const [palpite, setPalpite] = useState("")
    const [tentativas, setTentativas] = useState<Letra[][]>([])
    const [, setFinalizado] = useState(false)
    const [mensagem, setMensagem] = useState("")
    const [carregando, setCarregando] = useState(true)

    const gameIdRef = useRef("")
    const palpiteRef = useRef("")
    const tentativasRef = useRef<Letra[][]>([])
    const finalizadoRef = useRef(false)
    const criandoPartidaRef = useRef(false)

    useEffect(() => {
        iniciarPartida()
    }, [])

    useEffect(() => {
        function lidarComTeclado(event: KeyboardEvent) {
            if (carregando || finalizadoRef.current) {
                return
            }

            const tecla = event.key.toLowerCase()

            if (/^[a-z]$/.test(tecla)) {
                event.preventDefault()
                pressionarTecla(tecla)
                return
            }

            if (event.key === "Backspace") {
                event.preventDefault()
                apagarLetra()
                return
            }

            if (event.key === "Enter") {
                event.preventDefault()
                jogar()
            }
        }

        window.addEventListener("keydown", lidarComTeclado)

        return () => {
            window.removeEventListener("keydown", lidarComTeclado)
        }
    }, [carregando])

    async function iniciarPartida() {
        if (criandoPartidaRef.current) {
            return
        }

        criandoPartidaRef.current = true
        setCarregando(true)

        gameIdRef.current = ""
        palpiteRef.current = ""
        tentativasRef.current = []
        finalizadoRef.current = false

        setGameId("")
        setPalpite("")
        setTentativas([])
        setFinalizado(false)
        setMensagem("Criando nova partida...")

        try {
            const data = await criarPartida()

            gameIdRef.current = data.game_id
            setGameId(data.game_id)
            setMensagem("")
        } catch {
            setMensagem("Não foi possível criar a partida.")
        } finally {
            criandoPartidaRef.current = false
            setCarregando(false)
        }
    }

    async function jogar() {
        if (carregando || criandoPartidaRef.current) {
            return
        }

        const gameIdAtual = gameIdRef.current
        const palpiteAtual = palpiteRef.current
        const tentativasAtuais = tentativasRef.current

        if (!gameIdAtual || finalizadoRef.current) {
            return
        }

        if (palpiteAtual.length !== 5) {
            setMensagem("Digite uma palavra com 5 letras.")
            return
        }

        if (tentativasAtuais.length >= 6) {
            return
        }

        try {
            const data = await enviarPalpite(
                gameIdAtual,
                palpiteAtual
            )

            const novasTentativas = [
                ...tentativasAtuais,
                data.resultado
            ]

            tentativasRef.current = novasTentativas
            palpiteRef.current = ""

            setTentativas(novasTentativas)
            setPalpite("")
            setMensagem("")

            if (data.acertou) {
                finalizadoRef.current = true
                setFinalizado(true)
                setMensagem("Você acertou!")
            } else if (data.tentativas >= 6) {
                finalizadoRef.current = true
                setFinalizado(true)
                setMensagem("Fim de jogo.")
            }
        } catch {
            setMensagem("Não foi possível enviar o palpite.")
        }
    }

    function pressionarTecla(letra: string) {
        if (carregando || finalizadoRef.current) {
            return
        }

        if (palpiteRef.current.length >= 5) {
            return
        }

        const novoPalpite = palpiteRef.current + letra

        palpiteRef.current = novoPalpite
        setPalpite(novoPalpite)
    }

    function apagarLetra() {
        if (carregando || finalizadoRef.current) {
            return
        }

        const novoPalpite = palpiteRef.current.slice(0, -1)

        palpiteRef.current = novoPalpite
        setPalpite(novoPalpite)
    }

    return (
        <div className="app">
            <h1>Wordle</h1>

            <Board tentativas={tentativas} />

            <GameMessage mensagem={mensagem} />

            <div className="palpite">
                {palpite.toUpperCase()}
            </div>

            <Keyboard
                tentativas={tentativas}
                carregando={carregando}
                pressionarTecla={pressionarTecla}
                apagarLetra={apagarLetra}
                jogar={jogar}
            />

            <button
                type="button"
                className="novo-jogo"
                onClick={iniciarPartida}
                disabled={carregando}
            >
                {carregando ? "Carregando..." : "Novo jogo"}
            </button>
        </div>
    )
}

export default App