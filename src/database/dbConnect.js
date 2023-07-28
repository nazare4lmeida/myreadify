const MONGODB_URI = process.env.MONGODB_URI;

// Estabelece a conexão com o MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Erro de conexão ao MongoDB:"));
db.once("open", function () {
  console.log("Conexão bem-sucedida com o MongoDB!");
});

module.exports = db;