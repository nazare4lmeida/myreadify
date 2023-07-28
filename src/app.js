require('dotenv').config()
const express = require("express")
const app = express()
const controllerBooks = require('./controller/myreadifyController')
app.use(express.json())

const swaggerDocument = require('./swagger/swagger.js')
const swaggerFile = require('./swagger/swagger_output.json')

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const options = {
  swaggerDefinition: {
    info: {
      title: "MyReadify API",
      version: "1.0.0",
      description: "API de indicações de livros",
    },
    basePath: "/",
  },
  apis: ["./src/routes/myreadifyRoutes"],
}

const specs = swaggerJsdoc(options)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs))

const mongoose = require("mongoose")
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão ao MongoDB:"))
db.once("open", function () {
  console.log("Conexão bem-sucedida com o MongoDB Atlas!")
});

const booksRoutes = require("./routes/myreadifyRoutes")
app.use("/myreadify/library", booksRoutes)


/**
 * @swagger
 * /myreadify/library:
 *   get:
 *     summary: Obtém todos os livros da biblioteca.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna todos os livros.
 *       500:
 *         description: Erro interno do servidor.
 */
app.get('/myreadify/library', controllerBooks.getAllBooks)


/**
 * @swagger
 * /myreadify/author:
 *   get:
 *     summary: Obtém todos os livros de um determinado autor.
 *     parameters:
 *       - in: query
 *         name: author
 *         required: true
 *         description: Nome do autor.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso. Retorna todos os livros do autor especificado.
 *       500:
 *         description: Erro interno do servidor.
 */
app.get('/myreadify/author', controllerBooks.getBooksByAuthor)


/**
 * @swagger
 * /myreadify/add:
 *   post:
 *     summary: Adiciona um novo livro à biblioteca.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               year:
 *                 type: number
 *     responses:
 *       200:
 *         description: Sucesso. Livro adicionado à biblioteca.
 *       400:
 *         description: Requisição inválida. Verifique os dados enviados.
 *       500:
 *         description: Erro interno do servidor.
 */
app.post('/myreadify/add', controllerBooks.addBooks)

/**
 * @swagger
 * /myreadify/update/{id}:
 *   put:
 *     summary: Atualiza os dados de um livro existente na biblioteca.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do livro a ser atualizado.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               year:
 *                 type: number
 *     responses:
 *       200:
 *         description: Sucesso. Livro atualizado na biblioteca.
 *       400:
 *         description: Requisição inválida. Verifique os dados enviados.
 *       500:
 *         description: Erro interno do servidor.
 */
app.put('/myreadify/update/:id', controllerBooks.updateBook)

/**
 * @swagger
 * /myreadify/delete/{id}:
 *   delete:
 *     summary: Exclui um livro da biblioteca.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do livro a ser excluído.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso. Livro excluído da biblioteca.
 *       400:
 *         description: Requisição inválida. Verifique os dados enviados.
 *       500:
 *         description: Erro interno do servidor.
 */
app.delete('/myreadify/delete/:id', controllerBooks.deleteBook)

/**
 * @swagger
 * /myreadify/favorited/{id}:
 *   patch:
 *     summary: Atualiza o status de "favorito" de um livro na biblioteca.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do livro a ser atualizado.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               favorited:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Sucesso. Status de "favorito" do livro atualizado.
 *       400:
 *         description: Requisição inválida. Verifique os dados enviados.
 *       500:
 *         description: Erro interno do servidor.
 */
app.patch('/myreadify/favorited/:id', controllerBooks.updateFavBooks)


module.exports = app
