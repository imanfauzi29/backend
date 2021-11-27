const express = require("express")
// const bodyParser = require("body-parser")
const cors = require("cors")
const { authRoutes, roleRoutes, studentRoutes, gradeRoutes, majorRoutes, subjectRoutes } = require("./routes")
const app = express()
const port = 3001


app.set("port", process.env.PORT || port)

// middlewares 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use("/api/v1")
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

app.get("/ping", (req, res) => res.send("PONG"))

if (process.env.NODE_ENV === "development") {
    app.post("/delete-db/:dbName", async (req, res) => {
        try {
            const {dbName} = req.params
            const collection = await require("mongoose").connection.collection(dbName).drop()
            if (collection) {
                res.status(200).send({message: `Success delete database "${dbName}"`})
            }
        } catch (error) {
            res.status(400).send({message: `Error: ${error.message}`})
        }
    })
}

app.use(authRoutes)
app.use(roleRoutes)
app.use(studentRoutes)
app.use(gradeRoutes)
app.use(majorRoutes)
app.use(subjectRoutes)

module.exports = app