const API_URL = "http://localhost:8000"

export async function criarPartida() {
    const response = await fetch(`${API_URL}/game`, {
        method: "POST"
    })

    if (!response.ok) {
        throw new Error("Erro ao criar partida")
    }

    return response.json()
}

export async function buscarPartida(gameId: string) {
    const response = await fetch(
        `${API_URL}/game/${gameId}`
    )

    if (!response.ok) {
        throw new Error("Erro ao buscar partida")
    }

    return response.json()
}

export async function enviarPalpite(
    gameId: string,
    palpite: string
) {
    const response = await fetch(
        `${API_URL}/game/${gameId}/guess?palpite=${encodeURIComponent(palpite)}`,
        {
            method: "POST"
        }
    )

    if (!response.ok) {
        throw new Error("Erro ao enviar palpite")
    }

    return response.json()
}