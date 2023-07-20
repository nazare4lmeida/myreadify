const controllerBooks = require("../controller/myreadifyController")
const express = require("express")
const router = express.Router()

 
router.get("/library", controllerBooks.getAllBooks)
router.get("/author",controllerBooks.getBooksByAuthor)
router.post("/add", controllerBooks.addBooks)
router.put("/update/:id",controllerBooks.updateBook)
router.delete("/delete/:id",controllerBooks.deleteBook)
router.patch("/favorited/:id",controllerBooks.updateFavBooks)

module.exports = router