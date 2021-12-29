const mongoose = require("mongoose")

const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : "mongodb://127.0.0.1:27017/cbt_online"

mongoose
    .connect(URI, { useNewUrlParser: true })
    .catch((e) => console.log(`Connection Error: ${e.message}`))

const db = mongoose.connection

module.exports = db
