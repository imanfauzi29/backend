const Joi = require("joi")

const questSchema = Joi.array().items(
    Joi.object({
        weight: Joi.number().max(10).required(),
        quest: Joi.string().required(),
        options: Joi.object({
            option_a: Joi.string().required(),
            option_b: Joi.string().required(),
            option_c: Joi.string(),
            option_d: Joi.string(),
            option_e: Joi.string()
        }).required(),
        files: Joi.object({
            file_a: Joi.string(),
            file_b: Joi.string(),
            file_c: Joi.string(),
            file_d: Joi.string(),
            file_e: Joi.string(),
        }),
        answer: Joi.string().max(1).uppercase().required()
    }).required()
).label("quest").required()

module.exports = {questSchema}