const express = require("express") //importando o express
const app = express() // executo o express
app.use(express.json()) // uso o bodyparser

const booksRoutes = require("./routes/booksRoutes") //importando os livros
app.use("/myreadify/library", booksRoutes) //criei uma rota raiz pro rotas

module.exports = app // exportando para usar o server.js