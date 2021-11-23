const express = require("express")
// const bodyParser = require("body-parser")
const cors = require("cors")
const { authRoutes, roleRoutes } = require("./routes")
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

app.use(authRoutes)
app.use(roleRoutes)

module.exports = app