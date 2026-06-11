# Ecommerce Project

Projeto de ecommerce dividido em dois pacotes:

- `backend/` — API em Node.js com Express e PostgreSQL
- `frontend/` — Aplicação web em React com Vite

## Visão geral

O backend fornece funcionalidades de:

- cadastro e login de usuários
- autenticação JWT
- CRUD de produtos
- carrinho de compras
- criação e acompanhamento de pedidos
- dashboard administrativo com dados de vendas, pedidos e estoque
- upload de imagens de produtos

O frontend oferece:

- telas de login
- catálogo de produtos
- detalhes do produto
- carrinho de compras
- pedidos do usuário
- interface administrativa para gerenciar produtos, pedidos e estoque

## Estrutura do projeto

```
backend/
  src/
    app.js
    server.js
    controllers/
    routes/
    middlewares/
    database/
    uploads/
frontend/
  src/
    App.jsx
    pages/
    components/
    services/
```

## Requisitos

- Node.js 18+ instalado
- PostgreSQL configurado
- Navegador moderno para o frontend

## Configuração do backend

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Instale dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com as variáveis abaixo:

```env
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=seu_banco
DB_PASSWORD=sua_senha
DB_PORT=5432
JWT_SECRET=uma_chave_secreta
```

4. Garanta que o banco de dados possua as tabelas necessárias para o funcionamento do app: `users`, `products`, `cart_items`, `orders` e `order_items`.

5. Inicie o servidor:

```bash
npm run dev
```

O backend roda por padrão em `http://localhost:3000`.

## Configuração do frontend

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale dependências:

```bash
npm install
```

3. Inicie a aplicação:

```bash
npm run dev
```

O frontend será servido pelo Vite e costuma abrir em `http://localhost:5173`.

## Rotas principais da API

### Usuários

- `POST /api/users/register` — registra novo usuário
- `POST /api/users/login` — faz login e retorna token JWT

### Produtos

- `GET /api/products` — lista todos os produtos
- `GET /api/products/:id` — pega produto por ID
- `POST /api/products` — cria produto (requer token)
- `PUT /api/products/:id` — atualiza produto (requer token)
- `DELETE /api/products/:id` — deleta produto (requer token)

### Carrinho

- `GET /api/cart` — obtém itens do carrinho do usuário (requer token)
- `POST /api/cart` — adiciona item ao carrinho (requer token)
- `PUT /api/cart/:id` — atualiza quantidade de item (requer token)
- `DELETE /api/cart/:id` — remove item do carrinho (requer token)

### Pedidos

- `POST /api/orders` — cria pedido a partir do carrinho (requer token)
- `GET /api/orders` — lista pedidos do usuário (requer token)
- `GET /api/orders/:id` — detalhes de pedido (requer token)
- `GET /api/orders/admin/all` — lista todos os pedidos (requer token)
- `PUT /api/orders/admin/:id` — atualiza status de pedido (requer token)

### Dashboard

- `GET /api/dashboard` — dados para painel administrativo (requer token)

## Observações importantes

- O backend usa JWT para autenticação. O token deve ser enviado no cabeçalho `Authorization: Bearer <token>`.
- O backend serve arquivos de imagem em `/uploads`.
- Embora exista um middleware de administrador no código, ele não está aplicado diretamente nas rotas atuais.
- A interface frontend depende de rotas React para navegar entre login, produtos, carrinho, pedidos e administração.

## Como usar

1. Configure o backend e inicie o servidor.
2. Inicie o frontend.
3. Abra o navegador e acesse a página principal para efetuar login ou cadastrar um usuário.
4. Use as telas de produtos, carrinho e pedidos.
5. O painel administrativo permite criar/editar produtos e consultar pedidos.

## Possíveis melhorias

- adicionar migrações ou script de criação de banco de dados
- aplicar `adminMiddleware` nas rotas administrativas
- validar melhor os dados de entrada no backend
- adicionar testes automatizados ao projeto principal

---

> Projeto preparado para um ecommerce simples com backend em Express/Node e frontend em React/Vite.
