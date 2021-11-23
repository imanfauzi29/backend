const jwt = require("jsonwebtoken")
const User = require("../models/Users")

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decode = jwt.verify(token, process.env.AUTHTOKENSTRING)

        const user = await User.findOne({
            _id: decode._id,
            "tokens.token": token,
        })

        if (user) {
            req.token = token
            req.user = user
            next()
        } else {
            throw new Error()
        }
    } catch (error) {
        res.status(401).send({error: "Please Authenticate."})
    }
}

module.exports = auth