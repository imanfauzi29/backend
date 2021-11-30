const mongoose = require("mongoose")
const path = require("path")
const { getIp } = require("./src/utils/utils")
const bcrypt = require("bcryptjs")

const db = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : "mongodb://127.0.0.1:27017/cbt_online"

const data = [
    {
        _model: "Roles",
        document: {
            _id: "619c8cd737bf5cb7771caacb",
            role_name: "Administrator",
            active: true
        }
    },
    {
        _model: "Users",
        document: {
            first_name: "Iman",
            ip_address: getIp(),
            last_name: "Fauzi",
            username: "admin",
            password: "$2a$08$ju15nUbTshdsE3P2Ogwf5uZHo3Z8K9dEEVzI2N82yimDxQ8A1IsVW",
            role: "619c8cd737bf5cb7771caacb",
            email: "admin@gmail.com",
            active: true
        }
    }
]

const seed = () => {
    mongoose.connect(db, { useNewUrlParser: true }, (err) => {
        if (err) console.log(err.message)

        data.forEach((d) => {
            const Model = require(path.resolve(`./src/models/${d._model}`))
            mongoose.connection.db
                .listCollections({ name: d._model.toLocaleLowerCase() })
                .next((err, info) => {
                    if (info !== null) {
                        mongoose.connection.db.dropCollection(
                            d._model.toLocaleLowerCase(),
                            (err, result) => {
                                if (err)
                                    throw new Error(
                                        `failed to drop collection: ${err}`
                                    )
                            }
                        )
                    }

                    const newModel = new Model(d.document)
                    newModel.save((err) => {
                        if (err) throw new Error(err.message)
                        console.log(`${d._model} success seed!`)
                        mongoose.connection.close()
                    })
                })
        })

        return
    })
}

seed()