const app = require("./myreadify/src/app")

const PORT = 4444

//iniciando o servidor
app.listen(PORT, () => {
    console.log(`Seu servidor está na porta: ${PORT}`)
})