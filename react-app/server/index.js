import { fileURLToPath } from "url"
import path, { dirname } from "path"
import express from "express"
import Datastore from "nedb"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express() // create express app

// Funazionalità del server
app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static("public")) // Host static files
app.use(express.json()) // Understand json

// start express server on port 5000
app.listen(5000, () => {
    console.log("server started on port 5000")
})

//crea/carica database
const db = new Datastore({
    filename: "data.db",
    autoload: true,
})

let data = []

//invia dati
app.get("/api", (request, response) => {
    db.find({}, (err, data) => {
        response.json(data)
    })
})

//accetta richieste per salvare dati
app.post("/api", (request, response) => {
    let newData = request.body
    db.insert(newData)
    response.json("Data inserted!")
})
