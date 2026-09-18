type Letra = {
    letra: string
    status: "correct" | "present" | "absent"
}

type BoardProps = {
    tentativas: Letra[][]
}

function Board({ tentativas }: BoardProps) {
    return (
        <div className="tabuleiro">
            {Array.from({ length: 6 }).map((_, linha) => (
                <div className="linha" key={linha}>
                    {Array.from({ length: 5 }).map((_, coluna) => {
                        const letra = tentativas[linha]?.[coluna]

                        return (
                            <div
                                className={`casa ${letra?.status ?? ""}`}
                                key={coluna}
                            >
                                {letra?.letra ?? ""}
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

export default Board