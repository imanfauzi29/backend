const { Schema, model } = require("mongoose")

const subjectSchema = new Schema(
    {
    	subject_name: {
            type: String,
            minlength: 4,
            required: true
        },
        subject_code: {
            type: String, 
            minlength: 3,
            required: true,
            unique: true
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

const Subjects = model("Subject", subjectSchema)

module.exports = Subjects

