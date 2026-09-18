type GameMessageProps = {
    mensagem: string
}

function GameMessage({ mensagem }: GameMessageProps) {
    return <p>{mensagem}</p>
}

export default GameMessage