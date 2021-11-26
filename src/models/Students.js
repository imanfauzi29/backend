const { Schema, model } = require("mongoose")

const studentSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        nim: {
            type: Number,
            minlength: 6,
            default: ""
        },
        gender: {
            type: String,
            maxlength: 1,
            default: ""
        },
        grade: { type: Schema.Types.ObjectId, ref: "Grade" }
    },
    {
        timestamps: true
    }
)



const Students = model("Students", studentSchema)

module.exports = Students
