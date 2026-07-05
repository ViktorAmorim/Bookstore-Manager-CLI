# Bookstore Manager CLI

Aplicação de linha de comando para gerenciar uma livraria, construída com **TypeScript** e **PostgreSQL**.

## Tecnologias

- Node.js + TypeScript
- PostgreSQL (driver nativo `pg`)
- `readline/promises` para interação CLI
- `dotenv` para configuração de ambiente

## Estrutura

```
src/
├── main.ts                  # Ponto de entrada
├── controllers/             # Camada CLI (menus e inputs)
├── services/                # Regras de negócio
├── repositories/            # Acesso ao banco (SQL nativo)
├── models/                  # Interfaces e types
├── database/                # Conexão e schema SQL
├── utils/                   # Helpers (formatação, validações)
└── menus/                   # Navegação principal
```

## Configuração

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Copie e preencha as variáveis de ambiente:
   ```bash
   cp .env .env.local
   ```
   Edite `.env` com suas credenciais do PostgreSQL:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=bookstore
   DB_USER=postgres
   DB_PASSWORD=sua_senha
   ```
4. Crie o banco de dados no PostgreSQL:
   ```sql
   CREATE DATABASE bookstore;
   ```

## Executando

```bash
# Desenvolvimento (com ts-node)
npm run dev

# Build de produção
npm run build

# Executar build
npm start
```

## Entidades

| Entidade    | Descrição                              |
|-------------|----------------------------------------|
| Autor       | Cadastro de autores de livros          |
| Livro       | Catálogo de livros vinculados a autores|
| Cliente     | Clientes da livraria (CPF + e-mail)    |
| Emprestimo  | Controle de empréstimos e devoluções   |
