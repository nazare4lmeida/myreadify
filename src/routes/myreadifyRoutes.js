const controllerBooks = require("../controller/myreadifyController")
const express = require("express")
const router = express.Router()

 
router.get("/library", controllerBooks.getAllBooks)

/* GET /myreadify/library:
Descrição: Retorna todos os livros da biblioteca.
Parâmetros: Nenhum.
Respostas:
200: Sucesso. Retorna a lista de livros.
500: Erro interno do servidor. */

router.get("/author", controllerBooks.getBooksByAuthor)

/* GET /myreadify/library/author:

Descrição: Retorna os livros de um determinado autor.
Parâmetros: author (query string) - O nome do autor para filtrar os livros.
Respostas:
200: Sucesso. Retorna a lista de livros do autor.
404: Autor não encontrado.
500: Erro interno do servidor. */

router.post("/add", controllerBooks.addBooks)

/* POST /myreadify/library/add:

Descrição: Adiciona novos livros à biblioteca.
Corpo da requisição: Array de objetos representando os livros a serem adicionados.
Respostas:
201: Sucesso. Retorna a mensagem de sucesso e os novos livros adicionados.
400: Requisição inválida. O corpo da requisição deve conter um array de livros.
500: Erro interno do servidor. */

router.put("/update/:id", controllerBooks.updateBook)

/* PUT /myreadify/library/update/:id:

Descrição: Atualiza um livro na biblioteca.
Parâmetros: id (parâmetro na URL) - O ID do livro a ser atualizado.
Corpo da requisição: Objeto contendo as informações atualizadas do livro.
Respostas:
200: Sucesso. O livro foi atualizado com sucesso.
404: Livro não encontrado.
500: Erro interno do servidor. */

router.delete("/delete/:id", controllerBooks.deleteBook)

/* DELETE /myreadify/library/delete/:id:

Descrição: Remove um livro da biblioteca.
Parâmetros: id (parâmetro na URL) - O ID do livro a ser removido.
Respostas:
200: Sucesso. O livro foi removido com sucesso.
404: Livro não encontrado.
500: Erro interno do servidor. */

router.patch("/favorited/:id", controllerBooks.updateFavBooks)

/* PATCH /myreadify/library/favorited/:id:

Descrição: Atualiza a classificação de um livro.
Parâmetros: id (parâmetro na URL) - O ID do livro a ser atualizado.
Corpo da requisição: Objeto contendo a nova classificação do livro.
Respostas:
200: Sucesso. A classificação do livro foi atualizada com sucesso.
404: Livro não encontrado.
500: Erro interno do servidor. */

module.exports = router