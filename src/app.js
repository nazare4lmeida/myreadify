require('dotenv').config()
const express = require("express")
const app = express()
app.use(express.json())

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
};

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

module.exports = app
