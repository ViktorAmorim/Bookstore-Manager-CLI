# Bookstore Manager CLI

Aplicação de linha de comando (CLI) para gerenciamento completo de uma livraria, com persistência em banco de dados **PostgreSQL** e desenvolvida em **Node.js** com **TypeScript**.

##  Descrição do Projeto
O **Bookstore Manager CLI** é um sistema interativo via terminal projetado para informatizar o controle operacional de uma pequena livraria. A aplicação substitui registros manuais por um fluxo digital seguro e estruturado, permitindo o gerenciamento de autores, livros, clientes e empréstimos de forma robusta.

##  Objetivo
Facilitar a administração de uma livraria através de uma interface de terminal amigável, garantindo a integridade referencial dos dados no banco de dados, aplicando regras de negócio restritivas e fornecendo relatórios gerenciais consolidados em tempo real.

##  Tecnologias Utilizadas
- **Runtime**: Node.js
- **Linguagem**: TypeScript (com tipagem estática forte, interfaces e classes)
- **Banco de Dados**: PostgreSQL
- **Driver de Conexão**: `pg` (driver nativo do PostgreSQL para Node.js)
- **Variáveis de Ambiente**: `dotenv`
- **Interface de Terminal**: `readline/promises` para fluxos assíncronos de entrada/saída

---

##  Requisitos para Execução
Para executar este projeto localmente, você precisará de:
1. **Node.js** (v18.0.0 ou superior recomendado)
2. **NPM** (instalado automaticamente com o Node)
3. **PostgreSQL** (instância local ou remota rodando)

---

##  Configuração do Banco de Dados

1. Acesse o seu terminal PostgreSQL ou utilize um cliente (como DBeaver/pgAdmin) e crie o banco de dados da aplicação:
   ```sql
   CREATE DATABASE bookstore;
   ```

2. Crie a estrutura de tabelas executando o script SQL contido em [schema.sql](file:///Users/rahiansantos/Documents/Github-Projects/Bookstore-Manager-CLI/src/database/schema.sql):
   ```bash
   # Alternativa via terminal (CLI do psql)
   psql -U postgres -d bookstore -f src/database/schema.sql
   ```

### Estrutura das Entidades e Relacionamentos
O banco de dados contempla as seguintes entidades:
- **Autores (`autores`)**: Armazena o ID e o Nome do autor.
- **Livros (`livros`)**: Armazena o título, gênero, quantidade disponível e chave estrangeira `autor_id` referenciando `autores(id)` com `ON DELETE CASCADE`.
- **Clientes (`clientes`)**: Armazena informações dos clientes como nome, e-mail (único) e telefone.
- **Empréstimos (`emprestimos`)**: Tabela pivot relacionando `livro_id` e `cliente_id` com chaves estrangeiras, registrando a data de empréstimo, data de devolução e status (`ATIVO` ou `DEVOLVIDO`).

---

##  Instalação e Execução

### 1. Clonar e Instalar Dependências
```bash
git clone <url-do-repositorio>
cd Bookstore-Manager-CLI
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto (copiando do modelo `.env` existente):
```bash
cp .env .env.local
```
Configure as credenciais de acesso ao seu banco PostgreSQL:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
```

### 3. Scripts de Execução
No arquivo `package.json`, estão configurados os seguintes scripts:
```bash
# Executar em ambiente de desenvolvimento (compilação rápida JIT com ts-node)
npm run dev

# Compilar o código TypeScript para JavaScript (gerado na pasta /dist)
npm run build

# Executar a aplicação compilada em modo de produção
npm start
```

---

##  Arquitetura do Projeto

O projeto adota uma **arquitetura em camadas** bem definida para garantir a separação de responsabilidades, facilitar a manutenção e promover o reaproveitamento de código:

```
Bookstore-Manager-CLI/
├── src/
│   ├── main.ts                  # Ponto de entrada (conecta ao DB e inicia o menu principal)
│   ├── controllers/             # Camada CLI (exibe menus específicos, captura entradas e chama os serviços)
│   ├── services/                # Regras de negócio (validações, fluxos lógicos e decisões)
│   ├── repositories/            # Acesso a dados (comunica com o PostgreSQL usando SQL nativo)
│   ├── models/                  # Representação das entidades (classes, interfaces e tipos)
│   ├── database/                # Configuração da conexão com o banco e schema SQL
│   ├── utils/                   # Funções auxiliares reutilizáveis (validações de CPF, datas, etc.)
│   └── menus/                   # Módulos de interface de navegação
```

### Fluxo de Execução Recomendado:
`Usuário` ➔ `Menu` ➔ `Controller` ➔ `Service` ➔ `Repository` ➔ `PostgreSQL (Banco de Dados)`

---

##  Funcionalidades Implementadas

- **Gerenciamento de Autores**: Cadastrar, listar, consultar por ID e atualizar.
- **Gerenciamento de Livros**: Cadastrar (com vínculo obrigatório a um autor), listar, consultar, atualizar e remover.
- **Gerenciamento de Clientes**: Cadastrar, listar, consultar, atualizar e remover.
- **Sistema de Empréstimos e Devoluções**:
  - Empréstimo de livros com validação de estoque e existência de livro/cliente.
  - Registro de devolução com atualização imediata de estoque do livro no banco.
  - Consulta detalhada de empréstimos com informações sobre o livro, cliente e datas correspondentes.
- **Relatórios Gerenciais Avançados**:
  - Livros disponíveis.
  - Livros atualmente emprestados.
  - Lista de livros cadastrados agrupados por autor.
  - Quantidade de empréstimos realizados por livro.
  - Clientes com empréstimos ativos.
- **Tratamento de Erros e Robustez**:
  - Validações preventivas contra entidades inexistentes (autor, livro, cliente, empréstimo).
  - Controle de indisponibilidade de livros (estoque zero).
  - Tratamento global de exceções utilizando blocos `try/catch` para impedir crashs na aplicação durante falhas no banco ou inputs inválidos.

---

##  Exemplos de Utilização

Ao iniciar o sistema com `npm run dev`, o menu principal será exibido no terminal:

```text
=== Bookstore Manager CLI ===
1. Gerenciar Autores
2. Gerenciar Livros
3. Gerenciar Clientes
4. Gerenciar Empréstimos
5. Relatórios Gerenciais
6. Sair
Escolha uma opção:
```

### Exemplo de Fluxo de Empréstimo:
1. Acesse a opção `4. Gerenciar Empréstimos`.
2. Selecione `1. Realizar Empréstimo`.
3. Insira o ID do Livro e o ID do Cliente.
4. O sistema valida se o cliente existe, se o livro existe e se há estoque disponível.
5. Caso tudo esteja correto, confirma a transação e atualiza a quantidade em estoque no PostgreSQL.

---

##  Integrantes da Equipe
- **[Rahian Santos]** - Desenvolvedor Full Stack
- **[João Victor]** - Desenvolvedor Back-End 

---

##  Quadro Kanban
- **Link do Kanban**: [Acesse o Quadro Kanban do Projeto](https://github.com/users/TheRazorbill/projects/4)
