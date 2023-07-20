const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  launchYear: {
    type: String,
    required: true,
  },
  favorited: {
    type: Boolean,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema)

module.exports = Book
