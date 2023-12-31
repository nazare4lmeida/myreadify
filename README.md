# MyReadify

![MyReadify]

## Descrição

O MyReadify é uma aplicação de indicação de livros, onde você pode adicionar, atualizar e remover livros da biblioteca. Além disso, você pode pesquisar livros por autor e marcar seus favoritos.

## Como Executar

1. Instale as dependências do projeto: npm install

2. Inicie o servidor: npm start

3. Acesse a documentação Swagger: http://localhost:3000/docs


4. Use as rotas da API conforme descrito na documentação.

## Rotas da API

A API possui as seguintes rotas:

- **GET /myreadify/library**: Retorna todos os livros da biblioteca.

- **GET /myreadify/library/author**: Retorna os livros de um determinado autor.

- **POST /myreadify/library/add**: Adiciona novos livros à biblioteca.

- **PUT /myreadify/library/update/:id**: Atualiza um livro na biblioteca.

- **DELETE /myreadify/library/delete/:id**: Remove um livro da biblioteca.

- **PATCH /myreadify/library/favorited/:id**: Atualiza a classificação de um livro.

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Swagger

## Autora

Nazaré Almeida
