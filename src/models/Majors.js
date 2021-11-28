const { Schema, model } = require("mongoose")

const majorSchema = new Schema(
    {
    	major_name: {
            type: String,
            required: true,
        },
        major_code: {
            type: String,
            required: true,
            minLength: 2,
            unique: true,
            uppercase: true
        },
        active: {
            type: Boolean, 
            default: true
        }
    },
    {
        timestamps: true
    }
)

const Majors = model("Major", majorSchema)

module.exports = Majors

