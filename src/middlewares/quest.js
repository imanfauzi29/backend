const response = require("../utils/response")
const Validator = require("../config/validator")

const quest = async (req, res, next) => {
    try {
        const validated = await Validator.questSchema.validateAsync(req.body.quest)
        req.body.quest = validated
        next()
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

module.exports = quest