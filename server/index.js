import { fileURLToPath } from "url"
import path, { dirname } from "path"
import express from "express"
import Datastore from "nedb"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express() // create express app

//let server use static files inside build and understand json format
app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.json())

//start express server on port 5000
app.listen(5000, () => {
    console.log("server started on port 5000")
})

//create/load database
const db = new Datastore({
    filename: "./collections/data.db",
    autoload: true,
})

//send data
app.get("/getData", (request, response) => {
    db.find({}, (err, data) => {
        response.json(data)
    })
})

//save new data
app.post("/postData", (request, response) => {
    let newData = request.body
    db.insert(newData)
    response.json("OK")
})

//delete data
app.delete("/deleteData", (request, response) => {
    let dataId = request.body.id
    db.remove({ _id: dataId }, {}, (err, numRemoved) => {
        response.json(dataId)
        db.persistence.compactDatafile()
    })
})
