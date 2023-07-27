const Book = require("../model/myreadifyModel")

const getAllBooks = async (request, response) => {
  try {
    const books = await Book.find({})
    response.status(200).json(books)
  } catch (error) {
    response.status(500).send({
      message: "Erro no servidor, tente novamente.",
    })
  }
}

const getBooksByAuthor = async (request, response) => {
  try {
    const authorRequest = request.query.author.toLowerCase()
    const authorsFilter = await Book.find({ authors: { $in: [authorRequest] } })
    if (authorsFilter.length > 0) {
      response.status(200).json(authorsFilter)
    } else {
      response.status(404).send([{
        message: "Autor não encontrado.",
      }])
    }
  } catch (error) {
    response.status(500).send({
      message: "Erro no servidor, tente novamente.",
    })
  }
}

const addBooks = async (request, response) => {
  try {
    const booksData = request.body

    if (!Array.isArray(booksData)) {
      return response.status(400).send({ message: "O corpo da requisição deve conter um array de livros." })
    }

    const newBooks = await Book.create(booksData)

    response.status(201).json({
      message: "Novos Livros cadastrados com Sucesso. Boa leitura!",
      newBooks,
    })
  } catch (error) {
    console.log(error);
    response.status(500).send({
      message: "Erro interno ao cadastrar os livros. Tente novamente.",
    })
  }
}

const updateBook = async (request, response) => {
  const idRequest = request.params.id
  const bookRequest = request.body
  try {
    const updatedBook = await Book.findByIdAndUpdate(idRequest, bookRequest, { new: true })
    if (updatedBook) {
      response.status(200).json({
        message: "Livro atualizado com sucesso.",
        updatedBook,
      })
    } else {
      response.status(404).send([{
        message: "Livro não encontrado, portanto, não atualizado."
      }])
    }
  } catch (error) {
    response.status(500).send({
      message: "Erro no servidor, tente novamente.",
    })
  }
}

const deleteBook = async (request, response) => {
  const idRequest = request.params.id
  try {
    const deletedBook = await Book.findByIdAndDelete(idRequest);
    if (deletedBook) {
      response.status(200).json({
        message: "O livro selecionado foi excluído.",
        deletedBook,
      })
    } else {
      response.status(404).send([{
        message: "O livro não foi deletado. Tente novamente."
      }])
    }
  } catch (error) {
    response.status(500).send({
      message: "Erro no servidor, tente novamente.",
    })
  }
}

const updateFavBooks = async (request, response) => {
  const idRequest = request.params.id
  const favoritedBookRequest = request.body.favorited
  try {
    const updatedBook = await Book.findByIdAndUpdate(idRequest, { favorited: favoritedBookRequest }, { new: true })
    if (updatedBook) {
      response.status(200).json({
        message: "Classificação do livro atualizada com Sucesso.",
      })
    } else {
      response.status(404).json([{
        message: "A Classificação do livro não foi atualizada, tente novamente."
      }])
    }
  } catch (error) {
    response.status(500).send({
      message: "Erro no servidor, tente novamente.",
    })
  }
}

module.exports = {
  getAllBooks,
  getBooksByAuthor,
  addBooks,
  updateBook,
  deleteBook,
  updateFavBooks,
}
