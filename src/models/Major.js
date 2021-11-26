const { Schema, model } = require("mongoose")

const majorSchema = new Schema(
    {
    	major_name: {
            type: String,
            required: true,
        },
        major_type: {
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

const Major = model("Major", majorSchema)

module.exports = Major

