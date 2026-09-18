# Wordle

Jogo de palavras inspirado no Wordle, com uma aplicação web em React e uma API em FastAPI. A cada partida, o backend escolhe aleatoriamente uma palavra de cinco letras e o jogador tem até seis tentativas para descobri-la.

## Funcionalidades

- Criação de uma nova partida com palavra aleatória.
- Entrada de palpites pelo teclado físico ou pelo teclado exibido na tela.
- Validação de letras corretas, presentes e ausentes.
- Até seis tentativas no fluxo da interface.
- Indicação de vitória, fim de jogo e erros de comunicação com a API.
- Execução completa com Docker Compose.

## Tecnologias

### Frontend

- React 19
- TypeScript
- Vite
- Nginx, na imagem de produção

### Backend

- Python 3.14
- FastAPI
- Uvicorn

## Pré-requisitos

Para executar com Docker:

- Docker instalado
- Docker Compose disponível pelo comando `docker compose`

Para executar sem Docker:

- Python 3.14 ou compatível
- Node.js 22 ou compatível
- npm

## Executando com Docker

Na raiz do projeto, execute:

```bash
docker compose up --build
```

Depois, acesse:

- Frontend: http://localhost:5173
- API: http://localhost:8000
- Documentação interativa da API: http://localhost:8000/docs

Para executar os serviços em segundo plano:

```bash
docker compose up --build -d
```

Para parar e remover os containers:

```bash
docker compose down
```

## Executando localmente

### Backend

Abra um terminal na pasta `backend` e crie um ambiente virtual:

```bash
cd backend
python -m venv .venv
```

Ative o ambiente virtual:

No Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

No macOS ou Linux:

```bash
source .venv/bin/activate
```

Instale as dependências e inicie a API:

```bash
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

A API ficará disponível em http://localhost:8000.

### Frontend

Em outro terminal, abra a pasta `frontend`:

```bash
cd frontend
npm install
npm run dev
```

A aplicação ficará disponível, normalmente, em http://localhost:5173.

Com o backend e o frontend rodando localmente, o frontend utiliza a API em `http://localhost:8000`.

## Comandos do frontend

Execute os comandos dentro de `frontend`:

```bash
npm run dev      # inicia o servidor de desenvolvimento
npm run build    # verifica os tipos e gera a build de produção
npm run lint     # executa o ESLint
npm run preview  # serve localmente a build gerada
```

## API

### Verificar disponibilidade

```http
GET /
```

Resposta:

```json
{
  "message": "Wordle API funcionando"
}
```

### Criar partida

```http
POST /game
```

Resposta:

```json
{
  "game_id": "uuid-da-partida"
}
```

### Consultar partida

```http
GET /game/{game_id}
```

Resposta:

```json
{
  "tentativas": 2,
  "finalizado": false
}
```

Se a partida não existir, a API retorna `404`.

### Enviar palpite

```http
POST /game/{game_id}/guess?palpite=palavra
```

Resposta:

```json
{
  "resultado": [
    {"letra": "p", "status": "correct"},
    {"letra": "a", "status": "present"},
    {"letra": "t", "status": "absent"},
    {"letra": "o", "status": "absent"},
    {"letra": "s", "status": "absent"}
  ],
  "acertou": false,
  "tentativas": 1,
  "finalizado": false
}
```

Os status possíveis são:

- `correct`: a letra está na posição correta.
- `present`: a letra existe na palavra, mas está em outra posição.
- `absent`: a letra não aparece na palavra, considerando as ocorrências disponíveis.

Erros possíveis:

- `404`: partida não encontrada.
- `400`: partida já finalizada ou palpite com quantidade de letras diferente de cinco.

## Banco de palavras

As palavras estão definidas em `backend/palavras.py`. A palavra da partida é escolhida aleatoriamente a partir dessa lista quando a partida é criada.

Para adicionar ou remover palavras, edite `BANCO_PALAVRAS`. As palavras devem ter cinco letras para manter o comportamento esperado pelo jogo.

## Estrutura do projeto

```text
.
├── backend/
│   ├── dockerfile       # imagem da API
│   ├── jogo.py          # validação dos palpites
│   ├── main.py          # aplicação FastAPI e endpoints
│   ├── palavras.py      # banco e escolha de palavras
│   ├── partidas.py      # criação e armazenamento das partidas
│   └── requirements.txt
├── frontend/
│   ├── dockerfile       # build React e servidor Nginx
│   ├── src/
│   │   ├── api/         # chamadas para a API
│   │   ├── components/  # tabuleiro, teclado e mensagens
│   │   ├── App.tsx      # fluxo principal do jogo
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
└── docker-compose.yml
```

## Observações

- As partidas são armazenadas em um dicionário na memória do backend. Elas são perdidas quando o processo é reiniciado e não há banco de dados persistente.
- O endereço da API está definido no frontend como `http://localhost:8000` em `frontend/src/api/requests.ts`.
- A configuração atual de CORS permite o frontend em `http://localhost:5173`.
- O limite de seis tentativas é controlado pelo frontend. O backend mantém a contagem e encerra a partida quando o palpite correto é enviado; para impor o limite também no servidor, essa regra pode ser adicionada ao endpoint de palpite.
