const express = require("express");
// const bodyParser = require("body-parser")
const cors = require("cors");
const {
    authRoutes,
    roleRoutes,
    studentRoutes,
    gradeRoutes,
    majorRoutes,
    subjectRoutes,
    teacherRoutes,
    questRoutes
} = require("./routes/v1");
const app = express();
const port = 3001;

app.set("port", process.env.PORT || port);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/v1")
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

app.get("/ping", (req, res) => res.send("PONG"));

if (process.env.NODE_ENV === "development") {
    app.post("/delete-db/", async (req, res) => {
        try {
            const { db } = req.body;
            for (const b of db) {
                const collection = await require("mongoose")
                    .connection.collection(b)
                    .drop();
            }

            res.status(200).send({ message: `Success delete database` });
        } catch (error) {
            res.status(400).send({ message: `Error: ${error.message}` });
        }
    });
}

app.use(
    "/api/v1",
    authRoutes,
    roleRoutes,
    studentRoutes,
    gradeRoutes,
    majorRoutes,
    subjectRoutes,
    teacherRoutes,
    questRoutes
);

module.exports = app;
